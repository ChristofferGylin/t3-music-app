import { type Time } from "tone/build/esm/core/type/Units";
import {
  type PatternTypeKeys,
  type PatternStepsDrums,
  type PatternStepsKeys,
  type PatternTypeDrums,
} from "~/types/Pattern";

export const createPatternDrums = (): PatternTypeDrums => {
  const pattern: PatternTypeDrums = {
    type: "drums",
    pattern: [] as PatternStepsDrums[],
    resolution: 16,
    length: 64,
  };

  for (let i = 0; i < 64; i++) {
    const step: PatternStepsDrums = {
      start: [] as number[],
    };

    pattern.pattern.push(step);
  }

  return pattern;
};

export const createPatternKeys = (): PatternTypeKeys => {
  const pattern: PatternTypeKeys = {
    type: "keys",
    pattern: [] as PatternStepsKeys[],
    resolution: 16,
    length: 64,
  };

  for (let i = 0; i < 64; i++) {
    const step: PatternStepsKeys = {
      start: [] as { note: string; duration: Time }[],
      stop: [] as { note: string; duration: Time }[],
    };

    pattern.pattern.push(step);
  }

  return pattern;
};
