import { FileType } from "../../types";

export interface MessageFileExtra {
  fileType: FileType;
  fileName: string;
  fileUrl: string;
  size?: string;
}

export interface MessageImageExtra {
  width: string;
  height: string;
  name?: string;
}
