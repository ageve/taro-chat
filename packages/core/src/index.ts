import Chat from "./components/Chat";

export default Chat;

export type {
  MessagePosition,
  MessageProps,
  MessageStatus,
  User,
} from "./components/Message/types";

export { default as useMessages } from "./hooks/useMessages";
