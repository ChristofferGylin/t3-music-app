import { logCurve } from "./logCurve";
import { scaleValue } from "./scaleValue";

const signalToDb = (val: number) => {
  return scaleValue({
    value: logCurve(val),
    fromScale: { start: 0, end: 1 },
    toScale: { start: -60, end: +6 },
  });
};

export default signalToDb;
