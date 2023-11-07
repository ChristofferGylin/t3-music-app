import { DrumsKit } from "@prisma/client";

export type InstrumentStateDrumsType = {
  type: "drums";
  currentKit: string;
  masterVolume: number;
  channelVolumes: number[];
  modelName: string;
  name: string;
};
