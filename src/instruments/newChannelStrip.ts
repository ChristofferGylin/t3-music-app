import { Volume, Panner } from "tone";
import type ChannelStrip from "~/types/ChanelStrip";
import signalToDb from "~/utils/math/signalToDb";

const channelStrip = function (masterOut: Volume): ChannelStrip {
  return {
    masterVolume: new Volume(0),
    pan: new Panner({ channelCount: 2 }).connect(masterOut),
    setMasterVolume: function (val: number) {
      const dBValue = signalToDb(val);

      this.masterVolume.volume.value = dBValue;
    },
  };
};

export default channelStrip;
