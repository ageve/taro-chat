import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import copyImg from "../../assets/images/copy.png";
import styles from "./index.module.scss";
import { ToolPopoverProps } from "./type";

const windowWidth = Taro.getSystemInfoSync().windowWidth;

const windowHeight = Taro.getSystemInfoSync().windowHeight;

const ToolPopover: FC<ToolPopoverProps> = (props) => {
  const { popoverInfo, onClose, toolPopover, toolPopoverTools } = props;
  const [popoverVisible, setPopoverVisible] = useState(false);

  const [positionInfo, setPositionInfo] = useState<{
    translateY: number;
    translateX: number;
    positionY: "top" | "bottom";
    positionX: "left" | "right";
    x: number;
    y: number;
  }>();

  useEffect(() => {
    if (popoverInfo) {
      const { visible, rect } = popoverInfo;
      const { right, bottom, width, height } = rect;
      Taro.createSelectorQuery()
        .select("#tool-popover-wrap_popover")
        .boundingClientRect(function (
          popoverRect: Taro.NodesRef.BoundingClientRectCallbackResult
        ) {
          console.log("popoverRect", popoverRect);
          // 气泡位置tag
          const positionY =
            bottom > (windowHeight + height) / 2 ? "top" : "bottom";
          const positionX =
            right > (windowWidth + width) / 2 ? "right" : "left";
          // 气泡位置数值
          const X = rect[positionX];
          const Y = rect[positionY] + (positionY === "top" ? -10 : 10);
          //   气泡位置偏移量
          const translateX = positionX === "left" ? 0 : -100;
          const translateY = positionY === "top" ? -100 : 0;
          setPositionInfo({
            translateX,
            translateY,
            x: X,
            y: Y,
            positionX,
            positionY,
          });
          setPopoverVisible(visible);
          console.log("rect", rect, windowHeight, windowWidth);
        })
        .exec();
    } else {
      setPopoverVisible(false);
    }
  }, [popoverInfo]);

  const copyToClipboard = useCallback((textToCopy) => {
    Taro.setClipboardData({
      data: textToCopy,
      success: function () {
        Taro.showToast({
          title: "已复制",
          icon: "none",
          duration: 2000,
        });
      },
      fail: function () {
        Taro.showToast({
          title: "复制失败",
          icon: "none",
          duration: 2000,
        });
      },
    });
  }, []);

  const tools = useMemo(() => {
    if (toolPopoverTools && popoverInfo) {
      return toolPopoverTools
        .filter((item) =>
          item.includeMessageType.includes(popoverInfo.message.type || "Text")
        )
        .filter((item) =>
          item.includeMessageType.includes(popoverInfo.message.type || "Text")
        );
    }
    return [];
  }, [popoverInfo, toolPopoverTools]);
  return (
    <View
      className={styles["tool-popover-wrap"]}
      style={{
        top: positionInfo?.y + "Px",
        left: positionInfo?.x + "Px",
        transform: `translate(${positionInfo?.translateX}%, ${positionInfo?.translateY}%)`,
        opacity: popoverVisible ? 1 : 0,
        display: popoverVisible ? "block" : "none",
      }}
    >
      {/* 自定义工具 toolPopover render 或者传入工具列表数据 toolPopoverTools，在现有模版上渲染工具列表 */}
      {toolPopover ? (
        toolPopover
      ) : (
        <View
          className={styles["tool-popover-wrap_popover"]}
          style={{
            gridTemplateColumns: `repeat(${tools.length + 1 > 5 ? 5 : tools.length + 1}, 1fr)`,
            gridTemplateAreas: `repeat(${Math.ceil((tools.length + 1) / 5)}, 1fr)`,
          }}
          id="tool-popover-wrap_popover"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {popoverInfo?.message.type === "Text" && (
            <View
              className={styles["tool-popover-wrap_popover-item"]}
              onClick={() => {
                copyToClipboard(popoverInfo?.message.content);
                onClose && onClose();
              }}
            >
              <Image
                src={copyImg}
                className={styles["tool-popover-wrap_popover-item-img"]}
              ></Image>
              <Text className={styles["tool-popover-wrap_popover-item-name"]}>
                复制
              </Text>
            </View>
          )}
          {/* 外部自定义工具列表 */}
          {popoverInfo &&
            tools.map((item, key) => (
              <View
                key={key}
                className={styles["tool-popover-wrap_popover-item"]}
                onClick={() => {
                  item.onClick && item.onClick(popoverInfo.message);
                  onClose && onClose();
                }}
              >
                <Image
                  src={item.icon}
                  className={styles["tool-popover-wrap_popover-item-img"]}
                ></Image>
                <Text className={styles["tool-popover-wrap_popover-item-name"]}>
                  {item.name}
                </Text>
              </View>
            ))}
        </View>
      )}
      <View
        className={
          styles[
            `tool-popover-wrap_${positionInfo?.positionY}-${positionInfo?.positionX}-triangle`
          ]
        }
      ></View>
    </View>
  );
};

export default ToolPopover;
