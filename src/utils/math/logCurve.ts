import { scaleValue } from "./scaleValue";

export function logCurve(inputSignal: number) {
  const scaledValue = scaleValue({
    value: inputSignal,
    fromScale: { start: 0, end: 100 },
    toScale: { start: 1, end: 10 },
  });
  const min = Math.log(1) / Math.log(10);
  const max = Math.log(10) / Math.log(10),
    range = max - min;

  return (Math.log(scaledValue) / Math.log(10) - min) / range;
}
