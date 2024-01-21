import VolumeSlider from "../../UI/VolumeSlider";

type SliderPropsType = {
  name: string;
  callback: (val: number) => void;
  valueState: number;
};

export const paramLabelStyle =
  "flex h-4 w-full items-center justify-center self-center justify-self-center overflow-hidden rounded bg-purple-950 text-[7px] text-purple-300 sm:h-5 sm:text-[9px] md:h-6 md:text-[10px] lg:h-7 lg:text-xs";

export const paramItemStyle =
  "flex aspect-[1/4] w-7 flex-col gap-0.5 sm:w-9 sm:gap-1 md:w-10 md:gap-1.5 lg:w-12 lg:gap-2";
const Slider = ({ name, callback, valueState }: SliderPropsType) => {
  return (
    <div className={paramItemStyle}>
      <div className={paramLabelStyle}>{name}</div>
      <VolumeSlider callback={callback} valueState={valueState} />
    </div>
  );
};

export default Slider;
