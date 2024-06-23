import { useEffect, useRef, useState } from "react";
import StandardKnob from "./Knobs/StandardKnob";
import { setStatusRing } from "./setStatusRing";
import { type KnobRange } from "~/types/Knobs";
import { scaleValue } from "~/utils/math/scaleValue";

const TurnableKnob = ({
  width = "w-8",
  value,
  range = "Plus",
  setValue,
}: {
  width?: string;
  value: number;
  range?: KnobRange;
  setValue: (newValue: number) => void;
}) => {
  const [offsetOrigin, setOffsetOrigin] = useState(0);
  const maxRotation = 270;
  const scaledValue =
    range === "PlusMinus"
      ? scaleValue({
          value,
          fromScale: { start: -1, end: 1 },
          toScale: { start: 0, end: 1 },
        })
      : value;
  const rotation = `${maxRotation * scaledValue}deg`;
  const lightRingRef = useRef(null);

  const handleMouseMove = (e: MouseEvent) => {
    const offset = -((e.clientY - offsetOrigin) / 100);
    const minValue = range === "PlusMinus" ? -1 : 0;

    let newValue = value + offset;

    if (newValue < minValue) {
      newValue = minValue;
    } else if (newValue > 1) {
      newValue = 1;
    }

    setValue(newValue);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    setOffsetOrigin(e.clientY);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (lightRingRef.current) {
      setStatusRing(lightRingRef.current, range, value);
    }
  }, [range, value]);

  return (
    <div className={`${width} flex aspect-square items-center justify-center`}>
      <StandardKnob
        onMouseDown={handleClick}
        rotation={rotation}
        lightRingRef={lightRingRef}
      />
    </div>
  );
};

export default TurnableKnob;
