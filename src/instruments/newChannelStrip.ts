import { Volume, Panner } from "tone";
import type ChannelStrip from "~/types/ChannelStrip";
import signalToDb from "~/utils/math/signalToDb";

const newChannelStrip = function (output?: Volume): ChannelStrip {
  const channelStrip = {
    pan: new Panner({ channelCount: 2 }),
    masterVolume: new Volume(0),
    setMasterVolume: function (val: number) {
      const dBValue = signalToDb(val);

      this.masterVolume.volume.value = dBValue;
    },
  };
  channelStrip.masterVolume.connect(channelStrip.pan);

  if (!output) {
    channelStrip.pan.toDestination();
  } else {
    channelStrip.pan.connect(output);
  }

  return channelStrip;
};

export default newChannelStrip;
