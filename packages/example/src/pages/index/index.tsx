import { Text, View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useCallback, useEffect, useRef, useState } from "react";
import Chat, {
  Bubble,
  ChatRef,
  MessageOptionProps,
  ToolPopoverToolsType,
  useMessages,
} from "taro-chat";
import "taro-chat/dist/style.css";
import "./index.scss";

const sleep = (s = 1000) => new Promise((r) => setTimeout(r, s));

const initMessage: MessageOptionProps[] = [
  {
    content:
      "短语-4s是力度看风景是力度看风景是力度看风景是力度看风景是力度看风景是力度看风景是力度看风景是力度看风景是力度看风景是力度看风景是力度看风景是力度看风景是力度看上来看的风景是力度看风景",
    type: "Text",
    position: "left",
    status: "sent",
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
    status: "sent",
    user: {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F26%2F20200226204448_sZSun.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691305659&t=3ad7672da248655e7ae5ad9a7d4f2499",
      name: "",
    },
  },
  {
    content: "短语-5",
    type: "Text",
    position: "left",
    status: "fail",
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
    status: "fail",
    user: {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F26%2F20200226204448_sZSun.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691305659&t=3ad7672da248655e7ae5ad9a7d4f2499",
      name: "",
    },
  },
  {
    content: "短语-6",
    type: "Text",
    position: "left",
    status: "pending",
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
    status: "pending",
    user: {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F26%2F20200226204448_sZSun.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691305659&t=3ad7672da248655e7ae5ad9a7d4f2499",
      name: "",
    },
  },
];

const newMessage: MessageOptionProps[] = [
  {
    content: "短语-1",
    type: "Text",
    position: "left",
    status: "sent",
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
    status: "sent",
    user: {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F26%2F20200226204448_sZSun.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691305659&t=3ad7672da248655e7ae5ad9a7d4f2499",
      name: "",
    },
  },
  {
    content: "短语-2",
    type: "Text",
    position: "left",
    status: "sent",
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
    status: "sent",
    user: {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F26%2F20200226204448_sZSun.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691305659&t=3ad7672da248655e7ae5ad9a7d4f2499",
      name: "",
    },
  },
  {
    content: "短语-3",
    type: "Text",
    position: "left",
    status: "sent",
    user: {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202105%2F11%2F20210511193549_08e64.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691305516&t=b6bf45cbf8dcb064102c4f94727cc1e6",
      name: "",
    },
  },
  {
    content:
      "https://images.unsplash.com/photo-1689172044594-88eaec1c70fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    type: "Image",
    position: "right",
    status: "sent",
    user: {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F26%2F20200226204448_sZSun.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691305659&t=3ad7672da248655e7ae5ad9a7d4f2499",
      name: "",
    },
  },
  {
    content:
      "https://hugofsa.yocdev.com/hugo/9318ce75-026a-4c9b-b586-b766c5ec67be.pdf",
    type: "File",
    position: "left",
    status: "sent",
    extra: {
      fileName: "高赖氨酸牛奶.pdf",
      fileUrl:
        "https://hugofsa.yocdev.com/hugo/9318ce75-026a-4c9b-b586-b766c5ec67be.pdf",
      fileType: "pdf",
    },
    user: {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F26%2F20200226204448_sZSun.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691305659&t=3ad7672da248655e7ae5ad9a7d4f2499",
      name: "",
    },
  },
];

const initToolPopoverTools: ToolPopoverToolsType = [
  // {
  //   includeMessageType: ["Text"],
  //   icon: icon1,
  //   name: "测试",
  //   onClick: (message: MessageOptionProps) => {
  //     console.log("message-click", message);
  //   },
  // },
  // {
  //   includeMessageType: ["Text"],
  //   icon: icon1,
  //   name: "测试",
  //   onClick: (message: MessageOptionProps) => {
  //     console.log("message-click", message);
  //   },
  // },
  // {
  //   includeMessageType: ["Text"],
  //   icon: icon1,
  //   name: "测试下",
  //   onClick: (message: MessageOptionProps) => {
  //     console.log("message-click", message);
  //   },
  // },
  // {
  //   includeMessageType: ["Text"],
  //   icon: icon1,
  //   name: "测试",
  //   onClick: (message: MessageOptionProps) => {
  //     console.log("message-click", message);
  //   },
  // },
  // {
  //   includeMessageType: ["Text"],
  //   icon: icon1,
  //   name: "测试",
  //   onClick: (message: MessageOptionProps) => {
  //     console.log("message-click", message);
  //   },
  // },
  // {
  //   includeMessageType: ["Text"],
  //   icon: icon1,
  //   name: "测试",
  //   onClick: (message: MessageOptionProps) => {
  //     console.log("message-click", message);
  //   },
  // },
  // {
  //   includeMessageType: ["Text"],
  //   icon: icon1,
  //   name: "测试",
  //   onClick: (message: MessageOptionProps) => {
  //     console.log("message-click", message);
  //   },
  // },
];

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const { messages, appendMsg, appendMsgs, prependMsgs } = useMessages();
  const chatRef = useRef<ChatRef>(null);
  const startId = useRef("");
  const newPage = useCallback(async () => {
    await sleep();
    const message = await prependMsgs(newMessage);
    startId.current = message[newMessage.length].id;
    Taro.nextTick(() => {
      chatRef?.current?.scrollTo(message[newMessage.length - 2].id);
    });
    return message;
  }, []);

  useEffect(() => {
    appendMsgs(initMessage).then(() => {
      chatRef.current?.scrollToBottom();
    });
  }, []);
  const [disabled, setDisabled] = useState(false);
  const [toolPopoverTools] = useState(initToolPopoverTools);
  const [excludePopoverTool] = useState(["File", "Link", "Image"]);
  return (
    <View className="chat-room">
      <Chat
        ref={chatRef}
        messages={messages}
        disabled={disabled}
        onMessageLongPress={(ctx) => {
          if (ctx.type === "") {
            ctx.showPopover();
          } else {
            ctx.openPreview(ctx);
          }
        }}
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
            position: "right",
          });
          Taro.nextTick(() => {
            chatRef?.current?.scrollToBottom();
          });
          setDisabled(true);
          setTimeout(() => {
            setDisabled(false);
          }, 3000);
        }}
        customMessageContent={(data) => {
          if (data.content === "短语3") {
            data.type = undefined;
            console.log(
              "%c [data]",
              "background: #69c0ff; color: white; padding: 4px",
              data
            );
            // 自定义 bubble 渲染显示
            return (
              <Bubble message={data}>
                <Text>{data.content}</Text>
              </Bubble>
            );
          }
          return null;
        }}
        onRefresherRefresh={async () => {
          return newPage();
        }}
        renderAfterMessageContent={(msg) => {
          return (
            msg.position === "left" && (
              <View style={{ marginLeft: "4px", marginTop: "12px" }}>
                来源：文档
              </View>
            )
          );
        }}
        showRightAction={false}
        floatAction={<View>转发</View>}
        footer={<View>footer</View>}
        toolPopoverTools={toolPopoverTools}
        // @ts-ignore
        excludePopoverTool={excludePopoverTool}
      />
    </View>
  );
}
