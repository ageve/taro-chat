import {
  CommonEventFunction,
  Input,
  InputProps,
  View,
} from "@tarojs/components";
import React, { useCallback, useState } from "react";
import { produce } from "immer";
import styles from "./index.module.scss";
import { MessageProps } from "./types";
import Bubble from "../Bubble";
import { createId } from "../../util";

export default function Message() {
  const [messages, setMessages] = useState<MessageProps[]>([
    { content: "短语3", id: "12123", type: "Text", position: "left" },
    {
      content:
        "问一个和你常常很长含含糊糊和的问题，看看显示出来是什么样的效果来来来",
      id: "1212312123",
      type: "Text",
      position: "right",
    },
    {
      content: "https://t7.baidu.com/it/u=1358795231,3900411654&fm=193&f=GIF",
      id: "3452345",
      type: "Image",
      position: "left",
    },
  ]);

  const [value, setValue] = useState<string>("");

  const [inputMoveTopOffset, setInputMoveTopOffset] = useState<number>(0);

  const handleFocus: CommonEventFunction<InputProps.inputForceEventDetail> =
    useCallback((event) => {
      console.log("键盘高度", event.detail.height);
      // input 上移
      setInputMoveTopOffset(event.detail.height + 180);
    }, []);

  const handleBlur = useCallback(() => {
    setInputMoveTopOffset(0);
  }, []);

  const handleInput: CommonEventFunction<InputProps.inputValueEventDetail> =
    useCallback((event) => {
      setValue(event.detail.value);
    }, []);

  const handleConfirm: CommonEventFunction<InputProps.inputValueEventDetail> =
    useCallback((event) => {
      if (event.detail.value) {
        setMessages((list) => {
          return produce(list, (draft) => {
            draft.push({
              content: event.detail.value,
              id: createId(),
              position: "left",
              type: "Text",
            });
          });
        });
        setValue("");
      }
    }, []);

  return (
    <View className={styles["chat-widget"]}>
      <View className={styles["chat-message"]}>
        {messages.map((item) => {
          return (
            <View
              key={item.id}
              className={`${styles["chat-message-item"]} ${
                item.position === "right" && styles["chat-message-item-right"]
              }`}
            >
              <Bubble message={item} />
            </View>
          );
        })}
      </View>
      <View className={styles["chat-footer"]}>
        <Input
          type="text"
          value={value ?? ""}
          className={styles["chat-input"]}
          onInput={handleInput}
          onConfirm={handleConfirm}
          onFocus={handleFocus}
          onBlur={handleBlur}
          adjustPosition={false}
          style={{ top: `${inputMoveTopOffset}px` }}
        />
      </View>
    </View>
  );
}
