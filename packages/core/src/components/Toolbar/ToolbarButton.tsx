import { ITouchEvent, Image, Text, View } from "@tarojs/components";
import React, { useCallback } from "react";
import styles from "./style.module.scss";

export interface ToolbarItemProps {
  title: string;
  img: string;
  type: string;
}

export interface ToolbarButtonProps {
  item: ToolbarItemProps;
  onClick: (item: ToolbarItemProps, event: ITouchEvent) => void;
}

export const ToolbarButton = (props: ToolbarButtonProps) => {
  const { item, onClick } = props;
  const { img, title } = item;

  const handleClick = useCallback(
    (event: ITouchEvent) => {
      onClick(item, event);
    },
    [item, onClick]
  );

  return (
    <View className={styles["chat-toolbar-item"]} onClick={handleClick}>
      <View className={styles["chat-toolbar-item-icon-wrap"]}>
        <Image className={styles["chat-toolbar-item-icon"]} src={img} />
      </View>
      <Text className={styles["chat-toolbar-item-text"]}>{title}</Text>
    </View>
  );
};
