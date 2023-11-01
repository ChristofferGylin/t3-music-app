import { PatternDrums } from "~/types/Pattern";

const createPatternDrums = (): PatternDrums => {
  const pattern: PatternDrums = {
    type: "drums",
    pattern: [],
    resolution: 16,
  };

  for (let i = 0; i < 64; i++) {
    pattern.pattern.push({
      start: [],
    });
  }

  return pattern;
};

export default createPatternDrums;
