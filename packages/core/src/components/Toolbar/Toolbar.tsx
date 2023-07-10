import { ITouchEvent, View } from "@tarojs/components";
import React from "react";
import { ToolbarButton, ToolbarItemProps } from "./ToolbarButton";
import styles from "./style.module.scss";

export type ToolbarClick = (item: ToolbarItemProps, event: ITouchEvent) => void;

export interface ToolbarProps {
  items: ToolbarItemProps[];
  onClick: ToolbarClick;
}

export const Toolbar = (props: ToolbarProps) => {
  const { items, onClick } = props;

  return (
    <View className={styles["chat-toolbar-box"]}>
      {items.map((item, index) => (
        <ToolbarButton item={item} onClick={onClick} key={index} />
      ))}
    </View>
  );
};
