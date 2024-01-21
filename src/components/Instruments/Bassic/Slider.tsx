import { useRef, useState } from "react";
import VolumeSlider from "../../UI/VolumeSlider";

type SliderPropsType = {
  name: string;
  callback: (val: number) => void;
  valueState: number;
};

export const paramLabelStyle =
  "flex h-4 w-full items-center justify-center self-center justify-self-center overflow-hidden rounded bg-purple-950 text-[8px] text-purple-300 sm:h-5 sm:text-[10px] md:h-6 md:text-xs lg:h-7 lg:text-sm";

export const paramItemStyle =
  "flex aspect-[1/4] w-6 flex-col gap-0.5 sm:w-8 sm:gap-1 md:w-10 md:gap-1.5 lg:w-12 lg:gap-2";
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
    <div className={paramItemStyle}>
      <div ref={labelRef} className={paramLabelStyle}>
        {name}
      </div>
      <VolumeSlider callback={handleChange} valueState={valueState} />
    </div>
  );
};

export default Slider;
