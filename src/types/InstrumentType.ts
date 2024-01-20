import { type Volume } from "tone";

export type InstrumentType = {
  currentStep: number;
  masterVolume: Volume;
  setMasterVolume: (val: number) => void;
  name: string;
  type: string;
  modelName: string;
  new: boolean;
};
