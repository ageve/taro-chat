import Chat from "./components/Chat";

export default Chat;

export type {
  MessageOptionProps,
  MessagePosition,
  MessageStatus,
  MessageType,
  User,
} from "./components/Message/types";

export type {
  MessageFileExtra,
  MessageImageExtra,
} from "./components/Bubble/type";

export type { FileType } from "./types";

export { default as useMessages } from "./hooks/useMessages";
