import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { Message } from "taro-chat";
import "taro-chat/dist/style.css";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="chat-room">
      <Message />
    </View>
  );
}
