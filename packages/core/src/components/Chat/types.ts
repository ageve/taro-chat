import { MessageType } from "../Message/types";

export interface User {
  avatar?: string;
  name?: string;
  [k: string]: any;
}

export interface InputProps {
  placeholder?: string;
}

/* 聊天组件 */
export type ComposerProps = {
  inputOptions?: InputProps;
  onSend: (
    type: MessageType,
    content: string,
    /** 发送文件，图片 */
    file?: File
  ) => Promise<void>;
  toolbar?: any;
  rightAction?: JSX.Element;
};
