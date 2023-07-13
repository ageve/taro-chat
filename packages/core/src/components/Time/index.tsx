import React from "react";
import { Text } from "@tarojs/components";
import formatDate, { IDate } from "./parser";
import { useLocale } from "../ConfigProvider";

export interface TimeProps {
  date: IDate;
}

export const Time = ({ date }: TimeProps) => {
  const { trans } = useLocale("Time");

  return (
    <Text className="Time">
      {formatDate(date, trans())}
    </Text>
  );
};
