import { useContext } from "react";
import type ChannelType from "~/types/ChannelType";
import VolumeSlider from "../UI/VolumeSlider";
import { type ContextType, AppContext } from "~/context";

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

  let valueState =
    instrumentsState[instrumentIndex]?.channelVolumes[channelIndex];

  if (valueState === undefined) {
    valueState = 79.014;
  }

  return (
    <div className="grid h-full w-16 grid-rows-[1.5rem_1fr_4rem] gap-2">
      <div className="flex h-6 w-full items-center justify-center self-center justify-self-center overflow-hidden rounded bg-purple-950 text-sm text-purple-300">
        {drumChannel.name}
      </div>
      <VolumeSlider callback={handleChange} valueState={valueState} />

      <button
        className="aspect-[2/3] h-full self-center justify-self-center rounded border border-purple-300 bg-purple-400"
        onClick={() => drumChannel.play()}
      />
    </div>
  );
};

export default Channel;
