import { PatternKeys } from "~/types/Pattern";

const createPatternDrums = (): PatternKeys => {
  const pattern: PatternKeys = {
    type: "keys",
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
