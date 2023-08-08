import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, {
  Children,
  PropsWithChildren,
  ReactNode,
  isValidElement,
  useCallback,
  useMemo,
} from "react";
import IconFileDoc from "../../assets/images/icon-file-doc.png";
import IconFileUnknown from "../../assets/images/icon-file-edit.png";
import IconFilePdf from "../../assets/images/icon-file-pdf.png";
import IconFilePpt from "../../assets/images/icon-file-ppt.png";
import IconFileVideo from "../../assets/images/icon-file-video.png";
import IconFileXls from "../../assets/images/icon-file-xls.png";
import { downloadFileForOpen } from "../../util/downloadFileUtil";
import { MessageProps } from "../Message/types";
import Status from "../Status";
import styles from "./index.module.scss";
import { MessageFileExtra } from "./type";

interface Props {
  message: MessageProps;
}

/**
 * 富文本消息
 */

export default function Bubble({
  message,
  children,
}: PropsWithChildren<Props>) {
  const handleImageClick = useCallback(() => {
    Taro.previewImage({
      urls: [message.content],
    });
  }, [message.content]);

  /**
   * @description 点击文件预览
   */
  const handleFileClick = useCallback(async () => {
    try {
      downloadFileForOpen({
        url: message.content,
        fileName: (message.extra as MessageFileExtra).fileName,
        // 返回，或者判断文件后缀
        fileType: (message.extra as MessageFileExtra).fileType,
      });
    } catch (error) {
      console.log(
        "%c preview failed",
        "background: #69c0ff; color: white; padding: 4px",
        error
      );
      // TODO: 预览失败时提供
      Taro.showToast({ title: "文件暂不支持预览", icon: "none" });
    }
  }, [message.content, message.extra]);

  const bindProps = useCallback(
    (child: ReactNode) => {
      if (!isValidElement(child)) {
        return null;
      }
      return React.cloneElement(child, message);
    },
    [message]
  );

  const fileIcon = useMemo(() => {
    switch ((message?.extra as MessageFileExtra)?.fileType) {
      case "doc":
      case "docx":
        return IconFileDoc;
      case "pdf":
        return IconFilePdf;
      case "xls":
      case "xlsx":
        return IconFileXls;
      case "ppt":
      case "pptx":
        return IconFilePpt;
      default:
        {
          if (
            ["video", "flv", "avi", "mov", "mp4", "wmv"].includes(
              (message?.extra as MessageFileExtra)?.fileType
            )
          ) {
            return IconFileVideo;
          }
        }
        return IconFileUnknown;
    }
  }, [message.extra]);

  return (
    <View
      className={`${styles["chat-bubble-box"]} ${
        message.position === "right" ? styles["chat-bubble-box-right"] : ""
      }`}
    >
      <View
        className={`${styles["chat-bubble"]} ${
          message.type === "Image" && styles["chat-bubble-no-padding"]
        }`}
      >
        {message.type === "Text" && (
          <Text className={styles["chat-bubble-text"]}>{message.content}</Text>
        )}
        {message.type === "Image" && (
          <Image
            className={styles["chat-bubble-image"]}
            mode="widthFix"
            src={message.content}
            onClick={handleImageClick}
          />
        )}
        {message.type === "File" && (
          <View
            className={styles["chat-bubble-file"]}
            onClick={handleFileClick}
          >
            <Image
              className={styles["chat-bubble-file-icon"]}
              src={fileIcon}
              mode="aspectFit"
            />
            <View className={styles["chat-bubble-file-content"]}>
              <Text className={styles["chat-bubble-file-content-name"]}>
                {(message.extra as MessageFileExtra)?.fileName}
              </Text>
              {/* <Text className={styles["chat-bubble-file-content-size"]}>
                {(message.extra as MessageFileExtra)?.size}
              </Text> */}
            </View>
          </View>
        )}
        {Children.map(children, bindProps)}
      </View>
      <Status message={message} />
    </View>
  );
}
