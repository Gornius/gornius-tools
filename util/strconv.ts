export function isConvertibleToInt(str: string): boolean {
  const parsedStr = parseInt(str, 10);
  return !isNaN(parsedStr);
}

type TimeLengthMsecToStringOptions = {
  withMsec?: boolean;
};

export function timeLengthMsecToString(
  time: number,
  options: TimeLengthMsecToStringOptions = {}
) {
  const { withMsec = false } = options;
  const hours = Math.trunc(time / 1000 / 60 / 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.trunc((time / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.trunc((time / 1000) % 60)
    .toString()
    .padStart(2, "0");
  if (!withMsec) {
    return `${hours}:${minutes}:${seconds}}`;
  }
  const miliSeconds = Math.trunc(time % 1000)
    .toString()
    .padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${miliSeconds}`;
}
