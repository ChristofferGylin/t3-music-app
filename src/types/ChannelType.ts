import { Sampler } from "tone";
import { Time } from "tone/build/esm/core/type/Units";

type ChannelType = {
  name: string;
  sampler: Sampler;
  release: Time;
  attack: Time;
  volume: number;
  play: (time?: Time) => void;
};

export default ChannelType;
