import { useCallback, useMemo, useState } from "react";
import { MessageId, MessageOptionProps } from "../components/Message/types";
import { Messages, MessagesOption } from "../types";
import { createId } from "../util";

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

  /**
   * @description 在头部添加消息，配合上拉刷新实现显示历史消息
   *
   * */
  const prependMsgs = useCallback((msgs: MessagesOption) => {
    const list = msgs.map((it) => makeMsg(it));
    setMessages((prev: Messages) => [...list, ...prev]);
  }, []);

  /**
   * @description 在尾部添加多条消息，用于补充多条消息
   *
   * */
  const appendMsgs = useCallback((msgs: MessagesOption) => {
    const list = msgs.map((it) => makeMsg(it));
    setMessages((prev: Messages) => [...prev, ...list]);
  }, []);

  /**
   * @description 动态更新某一条消息
   */
  const updateMsg = useCallback((id: MessageId, msg: MessageOptionProps) => {
    setMessages((prev) => prev.map((t) => (t.id === id ? makeMsg(msg) : t)));
  }, []);

  /**
   * @description 添加一条消息
   */
  const appendMsg = useCallback((msg: MessageOptionProps) => {
    const newMsg = makeMsg(msg);
    setMessages((prev) => [...prev, newMsg]);
  }, []);

  /**
   * @description 删除一条消息
   */
  const deleteMsg = useCallback((id: MessageId) => {
    setMessages((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /**
   * @description 使用新的消息列表刷新聊天窗口
   */
  const resetList = useCallback((msgs: MessagesOption = []) => {
    const list = msgs.map((it) => makeMsg(it));
    setMessages(list);
  }, []);

  const clearList = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    prependMsgs,
    appendMsgs,
    appendMsg,
    updateMsg,
    deleteMsg,
    resetList,
    clearList,
  };
}
