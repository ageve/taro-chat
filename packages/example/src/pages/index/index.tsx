import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import Chat, { MessageProps, useMessages } from "taro-chat";
import "taro-chat/dist/style.css";
import "./index.scss";

const initMessage: MessageProps[] = [
  {
    content: "短语3",
    id: "12123",
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
      "问一个和你常常很长含含糊糊和的问题，看看显示出来是什么样的效果来来来",
    id: "1212312123",
    type: "Text",
    position: "right",
    user: {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F26%2F20200226204448_sZSun.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691305659&t=3ad7672da248655e7ae5ad9a7d4f2499",
      name: "test2",
    },
  },
  {
    content: "https://t7.baidu.com/it/u=1358795231,3900411654&fm=193&f=GIF",
    id: "3452345",
    type: "Image",
    position: "left",
  },
  {
    content: "https://t7.baidu.com/it/u=1358795231,3900411654&fm=193&f=GIF",
    id: "3452345",
    type: "Image",
    position: "right",
  },
  {
    content: "https://t7.baidu.com/it/u=1358795231,3900411654&fm=193&f=GIF",
    id: "3452345",
    type: "Image",
    position: "left",
  },
  {
    content: "https://t7.baidu.com/it/u=1358795231,3900411654&fm=193&f=GIF",
    id: "3452345",
    type: "Image",
    position: "right",
  },
  {
    content: "https://t7.baidu.com/it/u=1358795231,3900411654&fm=193&f=GIF",
    id: "3452345",
    type: "Image",
    position: "left",
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
            id: Date.now().toString(36),
            position: "left",
          });
        }}
      />
    </View>
  );
}
