import { PatternDrums } from "~/types/Pattern";

const createPatternDrums2 = (): PatternDrums => {
  const pattern: PatternDrums = {
    type: "drums",
    pattern: [],
  };

  for (let i = 0; i < 64; i++) {
    pattern.pattern.push({
      start: [],
    });
  }

  pattern.pattern[8]?.start.push(4);
  pattern.pattern[24]?.start.push(4);
  pattern.pattern[40]?.start.push(4);
  pattern.pattern[56]?.start.push(4);

  return pattern;
};

export default createPatternDrums2;
