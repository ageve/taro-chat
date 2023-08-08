本地启动 example 调试

```shell
pnpm --filter taro-chat run build && pnpm i taro-chat -r --filter example && pnpm --filter example run dev:weapp
```

发布新版本

```shell
pnpm release
```

> 开发之前，先将 vscode 里对 scss 文件的格式化工具调整成 css 默认，不要使用 prettier。
> prettier 会对 scss 文件里的 `Px` 单位转换成 `px`
