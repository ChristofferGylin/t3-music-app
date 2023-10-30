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

  pattern.pattern[0]?.start.push(0);
  pattern.pattern[8]?.start.push(4);
  pattern.pattern[16]?.start.push(0, 1);
  pattern.pattern[24]?.start.push(4);
  pattern.pattern[32]?.start.push(0);
  pattern.pattern[40]?.start.push(4);
  pattern.pattern[48]?.start.push(0, 1);
  pattern.pattern[56]?.start.push(4);

  return pattern;
};

export default createPatternDrums;
