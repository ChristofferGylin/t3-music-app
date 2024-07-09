import { type Panner, type Volume } from "tone";

type ChannelStrip = {
  masterVolume: Volume;
  pan: Panner;
  setMasterVolume: (val: number) => void;
};

export default ChannelStrip;
