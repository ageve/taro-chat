import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { Message } from "taro-chat";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="index">
      <Text>Hello world!</Text>
      <Message />
    </View>
  );
}
