import { type PatternStepsDrums, type PatternStepsKeys } from "~/types/Pattern";

export const deepCopyPatternStepsDrums = (
  originalPattern: PatternStepsDrums[],
): PatternStepsDrums[] => {
  return originalPattern.map((step) => ({
    start: [...step.start],
  }));
};

export const deepCopyPatternStepsKeys = (
  originalPattern: PatternStepsKeys[],
): PatternStepsKeys[] => {
  return originalPattern.map((step) => ({
    start: [...step.start],
    stop: [...step.stop],
  }));
};
