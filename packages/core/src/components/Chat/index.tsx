import {
  Button,
  CommonEventFunction,
  Image,
  InputProps,
  ScrollView,
  View,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import IconFileSvg from "../../assets/svg/file.svg";
import IconPlusSvg from "../../assets/svg/icon-plus.svg";
import IconImageSvg from "../../assets/svg/image.svg";
import { Messages } from "../../types";
import Bubble from "../Bubble";
import { ConfigContextType, ConfigProvider } from "../ConfigProvider";
import Message from "../Message";
import { MessageProps, MessageType } from "../Message/types";
import TextInput from "../TextInput";
import ToolPopover from "../ToolPopover";
import { PopoverInfoType, ToolPopoverToolsType } from "../ToolPopover/type";
import { Toolbar, ToolbarClick } from "../Toolbar";
import styles from "./index.module.scss";
import { ComposerProps } from "./types";

const windowWidth = Taro.getSystemInfoSync().windowWidth;

const windowHeight = Taro.getSystemInfoSync().windowHeight;

const pixelRatio = 750 / windowWidth;

export type ChatProps = ComposerProps &
  ConfigContextType & {
    messages: Messages;
    disabled?: boolean;
    toolPopoverTools?: ToolPopoverToolsType;
    toolPopover?: JSX.Element;
    excludePopoverTool?: (MessageType | undefined)[];
  };

export interface ChatRef {
  scrollToBottom: () => void;
  scrollTo: (id: string) => void;
  closeToolPopover: () => void;
}

const scrollToBottomAnchorId = "scrollBottomAnchor";

const Chat = React.forwardRef<ChatRef, ChatProps>((props, ref) => {
  const {
    messages,
    rightAction,
    showRightAction = true,
    floatActionProps = { position: { right: "30px", bottom: "60px" } },
    floatAction,
    footer,
    onSend,
    locale = "zh-CN",
    locales,
    customMessageContent,
    renderAfterMessageContent,
    onRefresherRefresh,
    disabled = false,
    toolPopoverTools,
    toolPopover,
    excludePopoverTool,
  } = props;

  const [hasToolbar, setHasToolbar] = useState(false);
  const [refresherTriggered, setRefresherTriggered] = useState(false);

  const handleRefresherRefresh: CommonEventFunction = useCallback(
    async (event) => {
      setRefresherTriggered(true);
      await onRefresherRefresh?.(event);
      setRefresherTriggered(false);
    },
    [onRefresherRefresh]
  );

  // TODO: 点击 toolbar 以外的区域都要能够关闭
  const handleHideToolbar = useCallback(() => {
    setHasToolbar(false);
  }, []);

  const messageIntoBottom = useCallback(() => {
    requestAnimationFrame(() => {
      console.log("scrollToBottomAnchorId:", scrollToBottomAnchorId);
      setScrollToView(scrollToBottomAnchorId);
    });
  }, []);

  const messageIntoView = useCallback((id: string = scrollToBottomAnchorId) => {
    requestAnimationFrame(() => {
      console.log("scrollToId:", id);
      setScrollToView(id);
    });
  }, []);

  const handleClickRightAction = useCallback(() => {
    setHasToolbar((it) => !it);
    messageIntoBottom();
  }, [messageIntoBottom]);

  const [scrollToView, setScrollToView] = useState("");

  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    scrollToBottom: messageIntoBottom,
    scrollTo: messageIntoView,
    closeToolPopover: handleCloseToolPopover,
  }));

  useEffect(() => {
    if (scrollToView) {
      requestAnimationFrame(() => {
        setScrollToView("");
      });
    }
  }, [scrollToView]);

  const handleFocus: CommonEventFunction<InputProps.inputForceEventDetail> =
    useCallback(
      (event) => {
        handleHideToolbar();
        // input 上移：计算出对应的 rpx
        setKeyboardHeight(event.detail.height * pixelRatio);
        // 消息内容滚动到底部
        messageIntoBottom();
      },
      [handleHideToolbar, messageIntoBottom]
    );

  const handleBlur = useCallback(() => {
    setKeyboardHeight(0);
  }, []);

  const handleConfirm: CommonEventFunction<InputProps.inputValueEventDetail> =
    useCallback(
      async (event) => {
        if (event.detail.value) {
          await onSend("Text", event.detail.value);
          setScrollToView(scrollToBottomAnchorId);
        }
      },
      [onSend]
    );

  const textInputRef = useRef<{
    resetValue: (callback: (value: string) => void) => void;
  }>();

  const onSubmit = useCallback(() => {
    textInputRef.current?.resetValue(async (value) => {
      console.log("value", value);
      if (!value.trim()) return;
      await onSend("Text", value);
    });
  }, [onSend]);

  const handleImageInput = useCallback(async () => {
    try {
      const result = await Taro.chooseMedia({
        count: 1, // 选择图片数量， 最多 9 张
        sizeType: ["original", "compressed"], //可选择原图或压缩后的图片
        sourceType: ["album", "camera"], //可选择性开放访问相册、相机
      });
      const imageInfo = await Taro.getImageInfo({
        src: result.tempFiles[0].tempFilePath,
      });
      console.log(
        "%c [imageInfo]",
        "background: #69c0ff; color: white; padding: 4px",
        imageInfo
      );

      onSend("Image", result.tempFiles[0].tempFilePath, imageInfo);
    } catch (error) {
      // FIXME: toast 提示错误
      Taro.showToast({ title: "暂时无法上传图片，请稍候重试" });
    }
  }, [onSend]);

  // TODO: 选择文件
  const handleFileInput = useCallback(async () => {}, []);

  // TODO: 抽象到 useAction 里面
  const handleToolbarClick: ToolbarClick = useCallback(
    (item) => {
      switch (item.type) {
        case "image":
          handleImageInput();
          break;
        case "file":
          handleFileInput();
          break;
        default:
          break;
      }
    },
    [handleFileInput, handleImageInput]
  );

  const renderMessageContent = useCallback(
    (message: MessageProps) => {
      const result = customMessageContent?.(message);
      if (result) {
        return result;
      }
      return <Bubble message={message} />;
    },
    [customMessageContent]
  );
  const [popoverInfo, setPopoverInfo] = useState<PopoverInfoType>();
  // 长按消息打开工具气泡弹窗
  const handleLongPressMessage = useCallback(
    (message: MessageProps) => {
      //根据消息类型判断是否有权打开弹窗
      if (!excludePopoverTool || excludePopoverTool.includes(message.type))
        return;
        
      Taro.createSelectorQuery()
        .select("#" + message.id)
        .boundingClientRect(function (
          rect: Taro.NodesRef.BoundingClientRectCallbackResult
        ) {
          setPopoverInfo({ visible: true, rect, message });
          console.log("rect", rect);
        })
        .exec();
    },
    [excludePopoverTool]
  );

  const handleCloseToolPopover = useCallback(() => {
    setPopoverInfo(undefined);
  }, []);

  return (
    <ConfigProvider locale={locale} locales={locales}>
      <View
        className={styles["chat-widget"]}
        style={{ paddingBottom: `${keyboardHeight}rpx` }}
        onClick={() => {
          setPopoverInfo(undefined);
        }}
      >
        <View className={styles["chat-message-box"]}>
          <ScrollView
            // scrollWithAnimation
            scrollY
            scrollIntoView={scrollToView}
            className={styles["chat-message"]}
            refresherEnabled
            refresherBackground="#eeeeee"
            refresherTriggered={refresherTriggered}
            onRefresherRefresh={handleRefresherRefresh}
          >
            <View className={styles["chat-message-container"]}>
              {messages.map((item) => {
                return (
                  <View
                    key={item.id}
                    className={`${styles["chat-message-wrap"]} ${
                      item.position === "right" &&
                      styles["chat-message-wrap-right"]
                    }`}
                    onLongPress={() => handleLongPressMessage(item)}
                  >
                    <Message
                      renderAfterMessageContent={renderAfterMessageContent}
                      {...item}
                      renderMessageContent={renderMessageContent}
                    />
                  </View>
                );
              })}
              <View id={scrollToBottomAnchorId}></View>
            </View>
          </ScrollView>
          <View
            className={styles["chat-message-float"]}
            style={{ ...floatActionProps.position }}
          >
            {floatAction}
          </View>
        </View>
        <View className={styles["chat-footer"]}>
          <View className={styles["chat-input-wrap"]}>
            <TextInput
              ref={textInputRef}
              onConfirm={handleConfirm}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
            />
            <Button
              type="primary"
              className={styles["chat-footer_send-btn"]}
              onClick={onSubmit}
              disabled={disabled}
            >
              发送
            </Button>
            {showRightAction &&
              (rightAction || (
                <Image
                  src={IconPlusSvg}
                  onClick={handleClickRightAction}
                  className={`${styles["chat-right-action"]} ${
                    hasToolbar && styles["chat-right-action-close"]
                  }`}
                ></Image>
              ))}
          </View>
          {/* bottom toolbar */}
          <View
            className={`${styles["chat-toolbar"]} ${
              hasToolbar && styles["chat-toolbar-show"]
            }`}
          >
            <Toolbar
              items={[
                { img: IconImageSvg, title: "图片", type: "image" },
                { img: IconFileSvg, title: "文件", type: "file" },
              ]}
              onClick={handleToolbarClick}
            />
          </View>
          {footer}
        </View>
        <ToolPopover
          popoverInfo={popoverInfo}
          onClose={handleCloseToolPopover}
          toolPopoverTools={toolPopoverTools}
          toolPopover={toolPopover}
        />
      </View>
    </ConfigProvider>
  );
});

export default Chat;
