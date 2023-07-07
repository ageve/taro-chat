import { Image, Text, View } from "@tarojs/components";
import React, { PropsWithChildren } from "react";
import { MessageProps } from "../Message/types";
import styles from "./index.module.scss";

interface Props {
  message: MessageProps;
}

export default function Bubble({
  message,
  children,
}: PropsWithChildren<Props>) {
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
        />
      )}
      {children}
    </View>
  );
}
