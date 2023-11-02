import { KitsType } from "./KitsType";

export type InstrumentStateDrumsType = {
  type: "drums";
  currentKit: { url: string; title: string }[];
  masterVolume: number;
  channelVolumes: number[];
  modelName: string;
};
