import Chat, { ChatRef } from "./components/Chat";

export type { ChatRef };

export default Chat;

export type {
  MessageOptionProps,
  MessagePosition,
  MessageProps,
  MessageStatus,
  MessageType,
  User
} from "./components/Message/types";

export type {
  MessageFileExtra,
  MessageImageExtra
} from "./components/Bubble/type";

export type { ToolPopoverProps, ToolPopoverToolType, ToolPopoverToolsType } from './components/ToolPopover/type';

export type { FileType } from "./types";

export { default as Bubble } from "./components/Bubble";
export { default as useMessages } from "./hooks/useMessages";

