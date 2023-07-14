import Chat from "./components/Chat";

export default Chat;

export type {
  MessagePosition,
  MessageOptionProps as MessageProps,
  MessageStatus,
  MessageType,
  User,
} from "./components/Message/types";

export type {
  MessageFileExtra,
  MessageImageExtra,
} from "./components/Bubble/type";

export { default as useMessages } from "./hooks/useMessages";
