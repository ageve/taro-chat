import { FileType } from "../../types";

export interface MessageFileExtra {
  fileType: FileType;
  name: string;
  src: string;
  size?: string;
}

export interface MessageImageExtra {
  width: string;
  height: string;
  name?: string;
}
