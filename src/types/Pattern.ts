import { type Time } from "tone/build/esm/core/type/Units";

export type PatternStepsKeys = {
  start: { note: string; duration: Time }[];
  stop: { note: string; duration: Time }[];
};
export type PatternStepsDrums = {
  start: number[];
};

export type PatternType = {
  type: string;
  pattern: PatternStepsKeys[] | PatternStepsDrums[];
  resolution: 16 | 32 | 64;
  length: number;
};

export type PatternTypeKeys = PatternType & {
  type: "keys";
  pattern: PatternStepsKeys[];
};

export type PatternTypeDrums = PatternType & {
  type: "drums";
  pattern: PatternStepsDrums[];
};
