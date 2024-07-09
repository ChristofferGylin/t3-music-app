import { Volume, Panner } from "tone";
import type ChannelStrip from "~/types/ChannelStrip";
import signalToDb from "~/utils/math/signalToDb";

const newChannelStrip = function (masterOut: Volume): ChannelStrip {
  const channelStrip = {
    pan: new Panner({ channelCount: 2 }).connect(masterOut),
    masterVolume: new Volume(0),
    setMasterVolume: function (val: number) {
      const dBValue = signalToDb(val);

      this.masterVolume.volume.value = dBValue;
    },
  };
  channelStrip.masterVolume.connect(channelStrip.pan);

  return channelStrip;
};

export default newChannelStrip;
