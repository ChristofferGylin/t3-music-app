import { useEffect, useRef, useState } from "react";
import StandardKnob from "./Knobs/StandardKnob";
import { setStatusRing } from "./setStatusRing";
import { type KnobRange } from "~/types/Knobs";

const TurnableKnob = ({
  width = "w-8",
  value,
  range = "Plus",
  callback,
}: {
  width?: string;
  value: number;
  range?: KnobRange;
  callback: (value: number) => void;
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  let offsetOrigin: number | undefined;
  const maxRotation = 270;
  const minValue = 0;
  const maxValue = 1;
  const rotation = `${maxRotation * currentValue}deg`;
  const lightRingRef = useRef(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!offsetOrigin) return;

    const offset = -((e.clientY - offsetOrigin) / 100);

    let newValue = currentValue + offset;

    if (newValue < minValue) {
      newValue = minValue;
    } else if (newValue > maxValue) {
      newValue = maxValue;
    }
    setCurrentValue(newValue);
    callback(newValue);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    offsetOrigin = e.clientY;
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
