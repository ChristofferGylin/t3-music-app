import { PatternType, PatternSteps } from "~/types/Pattern";

const createPatternDrums = (): PatternType => {
  const pattern: PatternType = {
    type: "drums",
    pattern: [],
    resolution: 16,
  };

  for (let i = 0; i < 64; i++) {
    const step: PatternSteps = {
      start: [] as (number | string)[],
      stop: [] as (number | string)[],
    };

    pattern.pattern.push(step);
  }

  return pattern;
};

export default createPatternDrums;
