import {
  CommonEventFunction,
  Image,
  InputProps,
  ScrollView,
  View,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useCallback, useEffect, useState } from "react";
import IconFileSvg from "../../assets/svg/file.svg";
import IconPlusSvg from "../../assets/svg/icon-plus.svg";
import IconImageSvg from "../../assets/svg/image.svg";
import Bubble from "../Bubble";
import { ConfigContextType, ConfigProvider } from "../ConfigProvider";
import Message from "../Message";
import { MessageProps } from "../Message/types";
import TextInput from "../TextInput";
import { Toolbar, ToolbarClick } from "../Toolbar";
import styles from "./index.module.scss";
import { ComposerProps } from "./types";

const pixelRatio = 750 / Taro.getSystemInfoSync().windowWidth;

export type ChatProps = ComposerProps &
  ConfigContextType & {
    messages: MessageProps[];
  };

const scrollToBottomAnchorId = "scrollBottomAnchor";

export default function Chat(props: ChatProps) {
  const { messages, rightAction, onSend, locale = "zh-CN", locales } = props;

  const [hasToolbar, setHasToolbar] = useState(false);

  // TODO: 点击 toolbar 以外的区域都要能够关闭
  const handleHideToolbar = useCallback(() => {
    setHasToolbar(false);
  }, []);

  const messageIntoBottom = useCallback(() => {
    requestAnimationFrame(() => {
      setScrollToView(scrollToBottomAnchorId);
    });
  }, []);

  const handleClickRightAction = useCallback(() => {
    setHasToolbar((it) => !it);
    messageIntoBottom();
  }, [messageIntoBottom]);

  const [scrollToView, setScrollToView] = useState("");

  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

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
        console.log(
          "键盘高度",
          event.detail.height,
          event.detail.height * pixelRatio
        );
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

      onSend("Image", result.tempFiles[0].tempFilePath);
    } catch (error) {
      // FIXME: toast 提示错误
      Taro.showToast({ title: "暂时无法上传图片，请稍候重试" });
    }
  }, [onSend]);

  const handleFileInput = useCallback(async () => {}, []);

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

  return (
    <ConfigProvider locale={locale} locales={locales}>
      <View
        className={styles["chat-widget"]}
        style={{ paddingBottom: `${keyboardHeight}rpx` }}
      >
        <ScrollView
          scrollWithAnimation
          scrollY
          scrollIntoView={scrollToView}
          className={styles["chat-message"]}
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
                >
                  <Message
                    {...item}
                    renderMessageContent={(message) => (
                      <Bubble message={message} />
                    )}
                  />
                </View>
              );
            })}
            <View id={scrollToBottomAnchorId}></View>
          </View>
        </ScrollView>
        <View className={styles["chat-footer"]}>
          <View className={styles["chat-input-wrap"]}>
            <TextInput
              onConfirm={handleConfirm}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {rightAction || (
              <Image
                src={IconPlusSvg}
                onClick={handleClickRightAction}
                className={`${styles["chat-right-action"]} ${
                  hasToolbar && styles["chat-right-action-close"]
                }`}
              ></Image>
            )}
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
        </View>
      </View>
    </ConfigProvider>
  );
}
