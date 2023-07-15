本地启动 example 调试

```shell
pnpm --filter taro-chat run build && pnpm i taro-chat -r --filter example && pnpm --filter example run dev:weapp
```

发布新版本

```shell
pnpm release
```
