import { MessageProps, MessageType } from "../Message/types";

export type ToolPopoverToolType = {
    includeMessageType: MessageType[];
    icon: string;
    name: string;
    onClick: (message: MessageProps) => void;
  };
  
  export type ToolPopoverToolsType = Array<ToolPopoverToolType>;
  
  export interface PopoverInfoType {
    visible: boolean;
    rect: Taro.NodesRef.BoundingClientRectCallbackResult;
    message: MessageProps
  }
  
  export interface ToolPopoverProps {
    popoverInfo?: PopoverInfoType;
    onClose?: () => void;
    toolPopover?: JSX.Element;
    toolPopoverTools?: ToolPopoverToolsType;
  }