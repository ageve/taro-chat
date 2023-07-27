import { CommonEventFunction, InputProps, ScrollView, Textarea, TextareaProps } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from "react";
import styles from "./index.module.scss";

interface Props {
  onConfirm: CommonEventFunction<InputProps.inputValueEventDetail>;
  onFocus: CommonEventFunction<InputProps.inputForceEventDetail>;
  onBlur: () => void;
}

const pixelRatio = 750 / Taro.getSystemInfoSync().windowWidth;

const TextInput = forwardRef((props: Props, ref) => {
  const {
    onConfirm: onConfirm,
    onFocus: handleFocus,
    onBlur: handleBlur,
  } = props;
  const [value, setValue] = useState<string>("");
  const query = Taro.createSelectorQuery()
  const [scrollTop, setScrollTop] = useState(0)
  const handleInput: CommonEventFunction<TextareaProps.onInputEventDetail> =
    useCallback((event) => {
      if(event.detail.value.split('').length === event.detail.cursor){
        Taro.nextTick(() => {
          query.select("#scroll-input-wrap").fields({ node: true, size: true }).exec(res => {
            setScrollTop(res[0].height * pixelRatio)
        })
        })
      }
      setValue(event.detail.value);
    }, [query]);

    const handleTextarea: CommonEventFunction<TextareaProps.onInputEventDetail> = useCallback((event) => {
      const arr = event.detail.value.split('')
      if(arr[arr.length - 1] === '\n'){
        onConfirm(event);
        setValue("");
        return
      }
      
      setValue(event.detail.value);
    }, [onConfirm]);

  const handleConfirm: CommonEventFunction<InputProps.inputValueEventDetail> =
    useCallback(
      (event) => {
        onConfirm(event);
        setValue("");
      },
      [onConfirm]
    );

  // 使用 useImperativeHandle 来暴露方法给父组件
  useImperativeHandle(ref, () => ({
    resetValue: (callback: (value: string) => void) => {
      console.log('resetValue')
      callback(value)
      setValue('')
    },
  }));

  return useMemo(() => {
    return (
<>
      <Textarea
        value={value ?? ""}
        className={styles["chat-textarea"]}
        onInput={handleTextarea}
        onConfirm={handleConfirm}
        onFocus={handleFocus}
        onBlur={handleBlur}
        adjustPosition={false}
        maxlength={-1}
      />
      <ScrollView className={styles["chat-input-wrap_scroll"]} scrollTop={scrollTop} scrollWithAnimation scrollY>
      <Textarea
        // type="text"
        value={value ?? ""}
        className={styles["chat-input-wrap_scroll_textarea"]}
        onInput={handleInput}
        onConfirm={handleConfirm}
        onFocus={handleFocus}
        onBlur={handleBlur}
        adjustPosition={false}
        autoHeight
        maxlength={-1}
        id="scroll-input-wrap"
      />
      </ScrollView>
</>
    );
  }, [handleBlur, handleConfirm, handleFocus, handleInput, handleTextarea, scrollTop, value]);
})

export default TextInput