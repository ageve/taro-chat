import React from "react";
import { View, Image } from "@tarojs/components";
import styles from "./index.module.scss";

export interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  url?: string;
  children?: React.ReactNode;
}

export const Avatar = (props: AvatarProps) => {
  const { src, children } = props;

  return (
    <View className={styles["chat-avatar"]}>
      {src ? (
        <Image
          className={styles["chat-avatar-image"]}
          mode="aspectFill"
          src={src}
        />
      ) : (
        children
      )}
    </View>
  );
};
