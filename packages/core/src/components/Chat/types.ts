import { CommonEventFunction } from "@tarojs/components";
import { MessageProps, MessageType } from "../Message/types";

export interface User {
  avatar?: string;
  name?: string;
  [k: string]: any;
}

export interface InputProps {
  placeholder?: string;
}

export interface Message {
  type: MessageType;
  content: string;
  /**
   * 补充额外的信息，用于丰富消息格式
   */
  extra?: unknown;
}

type FloatActionPropsPosition =
  | {
      top: string;
      left: string;
    }
  | {
      top: string;
      right: string;
    }
  | {
      left: string;
      bottom: string;
    }
  | {
      right: string;
      bottom: string;
    };

/* 聊天组件 */
export type ComposerProps = {
  inputOptions?: InputProps;
  onSend: (
    type: MessageType,
    content: string,
    /**
     * 补充额外的信息，用于丰富消息格式
     */
    extra?: unknown
  ) => Promise<void>;
  toolbar?: any;
  showRightAction?: boolean;
  rightAction?: JSX.Element;
  floatAction?: JSX.Element;
  floatActionProps?: { position: FloatActionPropsPosition };
  footer?: JSX.Element;
  customMessageContent?: (data: MessageProps) => JSX.Element;
  onRefresherRefresh?: CommonEventFunction;
};
