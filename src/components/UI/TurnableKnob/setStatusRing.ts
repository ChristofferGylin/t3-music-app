import { type KnobRange } from "~/types/Knobs";
import { scaleValue } from "~/utils/math/scaleValue";

export const setStatusRing = (
  element: SVGCircleElement,
  range: KnobRange,
  value: number,
) => {
  if (range === "PlusMinus") {
    element.style.rotate = "-90deg";
    value = scaleValue({
      value,
      fromScale: { start: 0, end: 1 },
      toScale: { start: -1, end: 1 },
    });
  } else {
    element.style.rotate = "135deg";
  }
  const rangeMultiplier = range === "PlusMinus" ? 0.375 : 0.75;
  const radius = element.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - value * (circumference * rangeMultiplier);

  element.style.strokeDasharray = `${circumference} ${circumference}`;
  element.style.strokeDashoffset = `${offset}`;
};
