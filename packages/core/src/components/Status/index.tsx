import { Text, View } from "@tarojs/components";
import React from "react";
import { MessageProps } from "../Message/types";
import styles from "./index.module.scss";

export default function Status({ message }: { message: MessageProps }) {
  return (
    <View>
      {message.status === "pending" && (
        <View className={styles["chat-circle-border"]}>
          <View className={styles["chat-circle-core"]}></View>
        </View>
      )}
      {message.status === "fail" && (
        <Text className={styles["chat-fail-text"]}>发送失败</Text>
      )}
    </View>
  );
}
