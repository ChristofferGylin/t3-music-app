import { PatternDrums } from "~/types/Pattern";

const createPatternDrums3 = (): PatternDrums => {
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

  pattern.pattern[60]?.start.push(6);

  return pattern;
};

export default createPatternDrums3;
