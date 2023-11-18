export type InstrumentStateDrumsType = {
  type: "drums";
  currentKit: string;
  masterVolume: number;
  channelVolumes: number[];
  modelName: string;
  name: string;
};

export type InstrumentStateBassicType = {
  type: "keys";
  masterVolume: number;
  modelName: string;
  name: string;
};
