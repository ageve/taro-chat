import Taro from "@tarojs/taro";
import { DownloadFileSuccess, Params } from "../types";

/**
 * @description 从网络端下载文件的基础函数，解决文件名和文件类型问题；不要直接使用此函数，应该根据需求进一步封装，比如：downloadFileForShare, downloadFileForOpen
 * @param param0
 *
 * @returns
 */
async function downloadFileUtil({
  url,
  fileName,
  fileType,
}: Params): Promise<DownloadFileSuccess> {
  const result = await Taro.downloadFile({
    url,
    filePath: `${Taro.env.USER_DATA_PATH}/${fileName}`,
  });

  if (result.statusCode === 200) {
    return result;
  }
  throw new Error(result.errMsg);
}

/**
 * 下载文件并打开预览
 * @param data
 * @returns
 */
export async function downloadFileForOpen(data: Params) {
  const result = await downloadFileUtil(data);

  return Taro.openDocument({
    filePath: result.filePath,
    fileType: data.fileType,
  });
}
