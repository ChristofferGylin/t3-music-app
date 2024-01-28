import { scaleValue } from "./scaleValue";

export function cubeCurve(input: number) {
  const scaledValue = scaleValue({
    value: input,
    fromScale: { start: 0, end: 100 },
    toScale: { start: 0, end: 10 },
  });
  return Math.pow(scaledValue, 3) / 1000;
}
