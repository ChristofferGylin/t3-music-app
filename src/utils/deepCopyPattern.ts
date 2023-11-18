import { type PatternType } from "~/types/Pattern";
import deepCopyPatternSteps from "./deepCopyPatternSteps";

const deepCodyPattern = (originalPattern: PatternType): PatternType => {
  const pattern = deepCopyPatternSteps(originalPattern.pattern);
  return { ...originalPattern, pattern };
};

export default deepCodyPattern;
