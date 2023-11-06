import { DrumsKit } from "@prisma/client";

export type InstrumentStateDrumsType = {
  type: "drums";
  currentKit: DrumsKit;
  masterVolume: number;
  channelVolumes: number[];
  modelName: string;
};
