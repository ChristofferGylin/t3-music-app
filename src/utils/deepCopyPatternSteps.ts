import { type PatternSteps } from "~/types/Pattern";

const deepCopyPatternSteps = (
  originalPattern: PatternSteps[],
): PatternSteps[] => {
  return originalPattern.map((step) => ({
    start: [...step.start],
    stop: [...step.stop],
  }));
};

export default deepCopyPatternSteps;
