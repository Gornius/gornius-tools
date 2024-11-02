export function isConvertibleToInt(str: string): boolean {
  const parsedStr = parseInt(str, 10);
  return !isNaN(parsedStr);
}
