import { type Time } from "tone/build/esm/core/type/Units";

export type PatternSteps = {
  start: (number | { note: string; duration: Time })[];
  stop: (number | string)[];
};

export type PatternType = {
  type: string;
  pattern: PatternSteps[];
  resolution: 16 | 32 | 64;
  length: number;
};
