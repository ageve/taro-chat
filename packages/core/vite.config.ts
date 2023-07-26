import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "taro-chat",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@tarojs/taro",
        "@tarojs/react",
        "@tarojs/components",
      ],
    },
  },
  css: {
    preprocessorOptions: {
      // 导入scss预编译程序
      scss: {
        additionalData: `@import "./src/assets/styles/media_screen.module.scss";`,
      },
    },
  },
  plugins: [dts()], // 生成 TS 类型文件
});
