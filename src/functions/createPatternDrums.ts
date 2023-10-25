import { PatternDrums } from "~/types/Pattern";
import { v4 as uuid } from "uuid";

const createPatternDrums = (): PatternDrums => {
  const pattern: PatternDrums = {
    id: uuid(),
    pattern: [],
  };

  for (let i = 0; i < 64; i++) {
    pattern.pattern.push({
      start: [],
    });
  }

  return pattern;
};

export default createPatternDrums;
