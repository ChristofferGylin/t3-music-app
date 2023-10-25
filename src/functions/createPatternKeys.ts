import { PatternKeys } from "~/types/Pattern";
import { v4 as uuid } from "uuid";

const createPatternDrums = (): PatternKeys => {
  const pattern: PatternKeys = {
    id: uuid(),
    pattern: [],
  };

  for (let i = 0; i < 64; i++) {
    pattern.pattern.push({
      start: [],
      stop: [],
    });
  }

  return pattern;
};

export default createPatternDrums;
