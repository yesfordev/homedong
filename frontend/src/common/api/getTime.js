export default function getMonth() {
  const date = new Date();
  const minutes = date.getMonth() + 1;
  const seconds = date.getSeconds();
  return `${minutes}:${seconds}`;
}
