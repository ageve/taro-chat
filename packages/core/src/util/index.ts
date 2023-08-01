export function createId() {
  return (Date.now() + Math.floor(Math.random() * 10000)).toString(36); // 转 36 进制
}
