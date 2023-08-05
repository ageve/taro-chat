// vite.config.ts
import { defineConfig } from "file:///Users/chenhubin/wm-work/taro-chat/node_modules/.pnpm/vite@4.3.9_@types+node@18.15.11_less@4.1.3_sass@1.63.6_stylus@0.55.0/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/chenhubin/wm-work/taro-chat/node_modules/.pnpm/vite-plugin-dts@3.1.0_@types+node@18.15.11_less@4.1.3_sass@1.63.6_stylus@0.55.0_typescript@4.1.2/node_modules/vite-plugin-dts/dist/index.mjs";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "taro-chat",
      formats: ["es"],
      fileName: "index"
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@tarojs/taro",
        "@tarojs/react",
        "@tarojs/components"
      ]
    }
  },
  css: {
    preprocessorOptions: {
      // 导入scss预编译程序
      scss: {
        additionalData: `@import "./src/assets/styles/media_screen.module.scss";`
      }
    }
  },
  plugins: [dts()]
  // 生成 TS 类型文件
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2hlbmh1YmluL3dtLXdvcmsvdGFyby1jaGF0L3BhY2thZ2VzL2NvcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9jaGVuaHViaW4vd20td29yay90YXJvLWNoYXQvcGFja2FnZXMvY29yZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvY2hlbmh1YmluL3dtLXdvcmsvdGFyby1jaGF0L3BhY2thZ2VzL2NvcmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogXCJzcmMvaW5kZXgudHNcIixcbiAgICAgIG5hbWU6IFwidGFyby1jaGF0XCIsXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcbiAgICAgIGZpbGVOYW1lOiBcImluZGV4XCIsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICBcInJlYWN0XCIsXG4gICAgICAgIFwicmVhY3QtZG9tXCIsXG4gICAgICAgIFwiQHRhcm9qcy90YXJvXCIsXG4gICAgICAgIFwiQHRhcm9qcy9yZWFjdFwiLFxuICAgICAgICBcIkB0YXJvanMvY29tcG9uZW50c1wiLFxuICAgICAgXSxcbiAgICB9LFxuICB9LFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAvLyBcdTVCRkNcdTUxNjVzY3NzXHU5ODg0XHU3RjE2XHU4QkQxXHU3QTBCXHU1RThGXG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIi4vc3JjL2Fzc2V0cy9zdHlsZXMvbWVkaWFfc2NyZWVuLm1vZHVsZS5zY3NzXCI7YCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW2R0cygpXSwgLy8gXHU3NTFGXHU2MjEwIFRTIFx1N0M3Qlx1NTc4Qlx1NjU4N1x1NEVGNlxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLFNBQVMsb0JBQW9CO0FBQy9WLE9BQU8sU0FBUztBQUVoQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsSUFBSTtBQUFBLE1BQ2QsVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUE7QUFBQSxNQUVuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUE7QUFDakIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
