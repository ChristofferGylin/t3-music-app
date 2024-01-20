import VolumeSlider from "../../UI/VolumeSlider";

type SliderPropsType = {
  name: string;
  callback: (val: number) => void;
  valueState: number;
};

const Slider = ({ name, callback, valueState }: SliderPropsType) => {
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

  return (
    <div className="grid h-full w-12 grid-rows-[1.5rem_1fr] gap-2">
      <div className="flex h-6 w-full items-center justify-center self-center justify-self-center overflow-hidden rounded bg-purple-950 text-sm text-purple-300">
        {name}
      </div>
      <VolumeSlider callback={handleChange} valueState={valueState} />
    </div>
  );
};

export default Slider;
