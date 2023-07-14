import { useCallback, useMemo, useState } from "react";
import { MessageId, MessageOptionProps } from "../components/Message/types";
import { createId } from "../util";

type Messages = MessageOptionProps[];

const TIME_GAP = 5 * 60 * 1000;
let lastTs = 0;

const makeMsg = (msg: MessageOptionProps) => {
  const ts = msg.createdAt || Date.now();
  const hasTime = msg.hasTime || ts - lastTs > TIME_GAP;

  if (hasTime) {
    lastTs = ts;
  }

  return {
    ...msg,
    id: msg.id || createId(), // 自动补充 id
    createdAt: ts,
    position: msg.position || "left", // 默认显示在左侧
    hasTime,
  };
};

export default function useMessages(initialState: MessageOptionProps[] = []) {
  const initialMsgs: Messages = useMemo(
    () => initialState.map((t) => makeMsg(t)),
    [initialState]
  );
  const [messages, setMessages] = useState(initialMsgs);

  // 在头部添加消息，配合上拉刷新实现显示历史消息
  const prependMsgs = useCallback((msgs: Messages) => {
    setMessages((prev: Messages) => [...msgs, ...prev]);
  }, []);

  const updateMsg = useCallback((id: MessageId, msg: MessageOptionProps) => {
    setMessages((prev) => prev.map((t) => (t.id === id ? makeMsg(msg) : t)));
  }, []);

  const appendMsg = useCallback((msg: MessageOptionProps) => {
    const newMsg = makeMsg(msg);
    setMessages((prev) => [...prev, newMsg]);
  }, []);

  const deleteMsg = useCallback((id: MessageId) => {
    setMessages((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 刷新聊天窗口
  const resetList = useCallback((list = []) => {
    setMessages(list);
  }, []);

  return {
    messages,
    prependMsgs,
    appendMsg,
    updateMsg,
    deleteMsg,
    resetList,
  };
}
