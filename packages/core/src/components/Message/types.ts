export type MessageType = "Text" | "Image" | "File";
export type MessagePosition = "left" | "right" | "center" | "pop";

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

export type MessageStatus = "pending" | "sent" | "fail";
export type MessageId = string;
export interface MessageProps {
  id: MessageId; // 消息唯一 ID，nanoid
  // 消息内容
  content: string;
  // 发送消息者
  user?: User;
  // 消息状态
  status?: MessageStatus;
  // 消息创建时间
  createdAt?: number;
  // 消息显示位置
  position?: MessagePosition;
  // 消息类型：支持文字，图片，文件
  type?: MessageType;
  // 是否最新消息
  isNew?: boolean;
  // 是否高亮显示
  isHighlight?: boolean;
  // 是否显示时间
  hasTime?: boolean;
  /**
   * 消息内容渲染函数
   */
  renderMessageContent?: (message: MessageProps) => React.ReactNode;
}
