import { PatternType, PatternSteps } from "~/types/Pattern";

const createPattern = (type: "drums" | "keys"): PatternType => {
  const pattern: PatternType = {
    type: type,
    pattern: [],
    resolution: 16,
    length: 64,
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

export default createPattern;
