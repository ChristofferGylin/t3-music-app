import { type Scene } from "~/types/Scene";
import { deepCopyPatternDrums, deepCopyPatternKeys } from "./deepCopyPattern";
import { type PatternTypeDrums, type PatternTypeKeys } from "~/types/Pattern";

const deepCopyScene = (originalScene: Scene): Scene => {
  const patterns = originalScene.patterns.map((pattern) => {
    if (pattern.type === "drums") {
      const currentPattern = pattern as PatternTypeDrums;
      return deepCopyPatternDrums(currentPattern);
    } else {
      const currentPattern = pattern as PatternTypeKeys;
      return deepCopyPatternKeys(currentPattern);
    }
  });
  return { ...originalScene, patterns };
};

export default deepCopyScene;
