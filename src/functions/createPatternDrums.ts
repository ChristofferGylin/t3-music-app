import { PatternDrums } from "~/types/Pattern";

type PatternType = { start: number[] };

const createPatternDrums = (): PatternDrums => {
  const pattern: PatternDrums = {
    type: "drums",
    pattern: [],
    resolution: 16,
  };

  const patternTriggers: PatternType = {
    start: [],
  };

  for (let i = 0; i < 64; i++) {
    pattern.pattern.push(patternTriggers);
  }

  return pattern;
};

export default createPatternDrums;
