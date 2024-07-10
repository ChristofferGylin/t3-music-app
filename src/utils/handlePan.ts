import { type Panner } from "tone";
import { scaleValue } from "./math/scaleValue";

const handlePan = (value: number, panner: Panner) => {
  const scaledValue = scaleValue({
    value,
    fromScale: { start: 0, end: 1 },
    toScale: { start: -1, end: 1 },
  });
  panner.pan.value = scaledValue;
};

export default handlePan;
