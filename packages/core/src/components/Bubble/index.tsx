import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { PropsWithChildren, useCallback } from "react";
import FileFillSvg from "../../assets/svg/file-fill.svg";
import { downloadFileForOpen } from "../../util/downloadFileUtil";
import { MessageProps } from "../Message/types";
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
    // TODO: 具体实现
    downloadFileForOpen({
      url: message.content,
      fileName: (message.extra as MessageFileExtra).name,
      fileType: (message.extra as MessageFileExtra).fileType,
    });
  }, [message.content, message.extra]);

  return (
    <View className={styles["chat-bubble"]}>
      {message.type === "Text" && (
        <Text className={styles["chat-bubble-text"]}>{message.content}</Text>
      )}
      {message.type === "Image" && (
        <Image
          className={styles["chat-bubble-image"]}
          mode="aspectFit"
          src={message.content}
          onClick={handleImageClick}
        />
      )}
      {message.type === "File" && (
        <View className={styles["chat-bubble-file"]} onClick={handleFileClick}>
          <Image
            className={styles["chat-bubble-file-icon"]}
            src={FileFillSvg}
            mode="aspectFill"
          />
          <View className={styles["chat-bubble-file-content"]}>
            <Text className={styles["chat-bubble-file-content-name"]}>
              {(message.extra as MessageFileExtra)?.name}
            </Text>
            <Text className={styles["chat-bubble-file-content-size"]}>
              {(message.extra as MessageFileExtra)?.size}
            </Text>
          </View>
        </View>
      )}
      {children}
    </View>
  );
}
