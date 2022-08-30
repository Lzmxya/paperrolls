export const formatDate = (
  value: number | string,
  pattern: string,
  timezone: string
) => {
  let i = 0;
  const date = value.toString();
  return `${pattern.replace(/#/g, (_) => date[i++])} ${timezone}`;
};
