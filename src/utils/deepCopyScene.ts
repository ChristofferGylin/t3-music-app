import { type Scene } from "~/types/Scene";
import deepCodyPattern from "./deepCopyPattern";

const deepCopyScene = (originalScene: Scene): Scene => {
  const patterns = originalScene.patterns.map((pattern) => {
    return deepCodyPattern(pattern);
  });
  return { ...originalScene, patterns };
};

export default deepCopyScene;
