import { type PatternTypeDrums, type PatternTypeKeys } from "~/types/Pattern";
import {
  deepCopyPatternStepsDrums,
  deepCopyPatternStepsKeys,
} from "./deepCopyPatternSteps";

export const deepCopyPatternDrums = (
  originalPattern: PatternTypeDrums,
): PatternTypeDrums => {
  const pattern = deepCopyPatternStepsDrums(originalPattern.pattern);
  return { ...originalPattern, pattern };
};
export const deepCopyPatternKeys = (
  originalPattern: PatternTypeKeys,
): PatternTypeKeys => {
  const pattern = deepCopyPatternStepsKeys(originalPattern.pattern);
  return { ...originalPattern, pattern };
};
