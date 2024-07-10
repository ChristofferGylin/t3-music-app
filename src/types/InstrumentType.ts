import type ChannelStrip from "./ChannelStrip";

export type InstrumentType = {
  currentStep: number;
  channelStrip: ChannelStrip;
  name: string;
  type: string;
  modelName: string;
  new: boolean;
};
