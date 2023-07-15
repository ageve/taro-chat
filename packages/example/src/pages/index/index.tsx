import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import Chat, { MessageOptionProps, useMessages } from "taro-chat";
import "taro-chat/dist/style.css";
import "./index.scss";

const sleep = (s = 1000) => new Promise((r) => setTimeout(r, s));

const initMessage: MessageOptionProps[] = [
  {
    content: "短语3",
    type: "Text",
    position: "left",
    user: {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202105%2F11%2F20210511193549_08e64.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691305516&t=b6bf45cbf8dcb064102c4f94727cc1e6",
      name: "test1",
    },
  },
  {
    content:
      "https://images.unsplash.com/photo-1689172044594-88eaec1c70fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    type: "Image",
    position: "right",
    user: {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F26%2F20200226204448_sZSun.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691305659&t=3ad7672da248655e7ae5ad9a7d4f2499",
      name: "test2",
    },
  },
  {
    content: "https://www.leomay.com/upload/file/mmo-20170707165001.pdf",
    type: "File",
    position: "left",
    extra: {
      name: "myFile.zip",
      size: "12.06 KB",
      fileType: "pdf",
    },
    user: {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F26%2F20200226204448_sZSun.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691305659&t=3ad7672da248655e7ae5ad9a7d4f2499",
      name: "test3",
    },
  },
];

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const { messages, appendMsg } = useMessages(initMessage);

  return (
    <View className="chat-room">
      <Chat
        messages={messages}
        onSend={async (type, content) => {
          console.log(
            "%c bug",
            "background: #69c0ff; color: white; padding: 4px",
            type,
            content
          );

          appendMsg({
            type,
            content,
            position: "left",
          });
        }}
        onRefresherRefresh={async () => {
          await sleep(15000);
        }}
      />
    </View>
  );
}
