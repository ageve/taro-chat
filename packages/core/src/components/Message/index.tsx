import { Text, View } from "@tarojs/components";
import React from "react";
import { Avatar } from "../Avatar";
import { Time } from "../Time";
import styles from "./index.module.scss";
import { MessageProps } from "./types";

export default function Message(props: MessageProps) {
  const {
    renderMessageContent = () => null,
    renderAfterMessageContent = () => null,
    ...msg
  } = props;
  const { user = {}, position = "left", hasTime = true, createdAt } = msg;
  const { avatar, name } = user;

  // TODO: SystemMessage 系统消息
  // if (type === 'system') {
  //   return <SystemMessage content={content.text} action={content.action} />;
  // }

  return (
    <View className={styles["chat-message"]}>
      {/* 显示消息时间 */}
      {hasTime && createdAt && (
        <View className={styles["chat-message-time"]}>
          <Time date={createdAt} />
        </View>
      )}
      <View
        className={`${styles["chat-message-content"]} ${
          position === "right" ? styles["chat-message-content-right"] : ""
        }`}
      >
        <View className={styles["chat-message-avatar"]}>
          {avatar && <Avatar src={avatar} url={user.url} />}
        </View>
        <View className={styles["chat-message-space"]} />
        <View className={styles["chat-message-bubble-wrap"]}>
          {name && (
            <Text
              className={`${styles["chat-message-name"]}  ${
                position === "right" ? styles["chat-message-name-right"] : ""
              }`}
            >
              {name}
            </Text>
          )}
          <View>{renderMessageContent(msg)}</View>
          <>{renderAfterMessageContent(msg)}</>
        </View>
      </View>
    </View>
  );
}
