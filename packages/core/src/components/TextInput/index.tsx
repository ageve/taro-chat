import { CommonEventFunction, Input, InputProps } from "@tarojs/components";
import React, { useCallback, useMemo, useState } from "react";
import styles from "./index.module.scss";

interface Props {
  onConfirm: CommonEventFunction<InputProps.inputValueEventDetail>;
  onFocus: CommonEventFunction<InputProps.inputForceEventDetail>;
  onBlur: () => void;
}

export default function TextInput(props: Props) {
  const {
    onConfirm: onConfirm,
    onFocus: handleFocus,
    onBlur: handleBlur,
  } = props;
  const [value, setValue] = useState<string>("");

  const handleInput: CommonEventFunction<InputProps.inputValueEventDetail> =
    useCallback((event) => {
      setValue(event.detail.value);
    }, []);

  const handleConfirm: CommonEventFunction<InputProps.inputValueEventDetail> =
    useCallback(
      (event) => {
        onConfirm(event);
        setValue("");
      },
      [onConfirm]
    );

  return useMemo(() => {
    return (
      <Input
        type="text"
        value={value ?? ""}
        className={styles["chat-input"]}
        onInput={handleInput}
        onConfirm={handleConfirm}
        onFocus={handleFocus}
        onBlur={handleBlur}
        confirmType="send"
        adjustPosition={false}
      />
    );
  }, [handleBlur, handleConfirm, handleFocus, handleInput, value]);
}
