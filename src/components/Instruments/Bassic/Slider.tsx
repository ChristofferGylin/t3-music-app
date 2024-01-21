"use client";

import { useEffect, useRef, useState } from "react";
import VolumeSlider from "../../UI/VolumeSlider";

type SliderPropsType = {
  name: string;
  callback: (val: number) => void;
  valueState: number;
};

const Slider = ({ name, callback, valueState }: SliderPropsType) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const [textSize, setTextSize] = useState(0);
  const handleChange = (val: number) => {
    callback(val);
    // setVolume({
    //   val,
    //   instrumentIndex: instrumentIndex,
    //   channelIndex: channelIndex,
    //   type: "drums",
    // });
    // drumChannel.setVolume(val);
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined" && labelRef.current) {
  //     console.log("yo");
  //     const onResize = () => {
  //       if (labelRef.current) {
  //         setTextSize(labelRef.current?.clientHeight * 0.8);
  //         console.log(labelRef.current?.clientHeight * 0.8);
  //       }
  //     };

  //     onResize();

  //     window.addEventListener("resize", onResize);

  //     return window.removeEventListener("resize", onResize);
  //   }
  // }, [labelRef]);

  return (
    <div className="grid aspect-[1/4] w-6 grid-rows-[1fr_5fr] gap-1 xs:w-7 sm:w-8 md:w-10 lg:w-12">
      <div
        ref={labelRef}
        className="flex h-full w-full items-center justify-center self-center justify-self-center overflow-hidden rounded bg-purple-950 text-[8px] text-purple-300 sm:text-[10px] md:text-xs lg:text-sm"
      >
        {name}
      </div>
      <VolumeSlider callback={handleChange} valueState={valueState} />
    </div>
  );
};

export default Slider;
