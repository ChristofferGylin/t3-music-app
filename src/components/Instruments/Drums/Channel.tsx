import { useContext } from "react";
import type ChannelType from "~/types/ChannelType";
import VolumeSlider from "../../UI/VolumeSlider";
import { type ContextType, AppContext } from "~/context";
import { type InstrumentStateDrumsType } from "~/types/InstrumentStateType";

type ChannelPropsType = {
  drumChannel: ChannelType;
  channelIndex: number;
  instrumentIndex: number;
};

const Channel = ({
  drumChannel,
  channelIndex,
  instrumentIndex,
}: ChannelPropsType) => {
  const { instrumentsState, setVolume } = useContext(
    AppContext,
  )! as ContextType;

  const handleChange = (val: number) => {
    setVolume({
      val,
      instrumentIndex: instrumentIndex,
      channelIndex: channelIndex,
      type: "drums",
    });
    drumChannel.setVolume(val);
  };

  const instrument = instrumentsState[
    instrumentIndex
  ] as InstrumentStateDrumsType;

  let valueState = instrument.channelVolumes[channelIndex];

  if (valueState === undefined) {
    valueState = 79.014;
  }

  const paramLabelStyle =
    "flex aspect-[4/3] w-full items-center justify-center self-center justify-self-center overflow-hidden rounded bg-purple-950 text-[6px] text-purple-300 sm:h-5 sm:text-[8px] md:h-6 md:text-[9px] lg:h-7 lg:text-[10px]";

  const paramItemStyle =
    "flex aspect-[1/3] w-8 xs:w-8 flex-col gap-0.5 sm:w-9 sm:gap-1 md:w-10 md:gap-1.5 lg:w-12 lg:gap-2";

  return (
    <>
      <div className={paramItemStyle}>
        <div className={paramLabelStyle}>{drumChannel.name}</div>
        <VolumeSlider callback={handleChange} valueState={valueState} />
        <button
          className="aspect-[2/3] w-3/4 self-center justify-self-center rounded border border-purple-300 bg-purple-400"
          onClick={() => drumChannel.play()}
        />
      </div>
    </>
  );
};

export default Channel;
