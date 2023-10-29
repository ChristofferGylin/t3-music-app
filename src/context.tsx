import React, {
  MutableRefObject,
  ReactNode,
  createContext,
  useRef,
  useState,
} from "react";
import { DrumsType } from "~/instruments/drums/drums";
import { Scene } from "~/types/Scene";
import { v4 as uuid } from "uuid";
import createPatternDrums from "./functions/createPatternDrums";
import createPatternDrums2 from "./functions/createPatternDrums2";

export type ContextType = {
  scenes: MutableRefObject<Scene[]>;
  scenesState: Scene[];
  instruments: MutableRefObject<InstrumentsType>;
  updateScenes: (update: Scene[]) => void;
  loop: MutableRefObject<boolean>;
  loopState: boolean;
  toggleLoop: () => void;
  currentScene: MutableRefObject<number>;
  updateCurrentScene: (update: number) => void;
  nextScene: () => void;
  newScene: () => void;
  rewind: () => void;
};

export const AppContext = createContext<ContextType | null>(null);

type InstrumentsType = Array<DrumsType>;

const Context = ({ children }: { children: ReactNode }) => {
  const [scenesState, setScenesState] = useState<Scene[]>([
    { id: uuid(), patterns: [createPatternDrums()] },
    { id: uuid(), patterns: [createPatternDrums2()] },
  ]);
  const scenes = useRef<Scene[]>([
    { id: uuid(), patterns: [createPatternDrums()] },
    { id: uuid(), patterns: [createPatternDrums2()] },
  ]);
  const instruments = useRef<InstrumentsType>([]);
  const currentScene = useRef(0);
  const [loopState, setLoopState] = useState(true);
  const loop = useRef(true);
  //const [currentScene, setCurrentScene] = useState(0);

  const newScene = () => {
    const newScene: Scene = { id: uuid(), patterns: [] };

    for (let i = 0; i < instruments.current.length; i++) {
      if (instruments.current[i]?.type === "drums") {
        let index = scenes.current.length - 1;

        if (index < 0) index = 0;

        newScene.patterns.push(createPatternDrums2());
      }
    }

    setScenesState((old) => {
      return [...old, newScene];
    });

    scenes.current.push(newScene);
  };

  const updateScenes = (update: Scene[]) => {
    setScenesState(update);
  };

  const rewind = () => {
    for (let i = 0; i < instruments.current.length; i++) {
      instruments.current[i]!.currentStep = 0;
    }

    if (!loop.current) {
      currentScene.current = 0;
    }
  };

  const toggleLoop = () => {
    setLoopState((old) => !old);
    loop.current = !loop.current;
  };

  const updateCurrentScene = (update: number) => {
    currentScene.current = update;
  };

  const nextScene = () => {
    if (currentScene.current >= scenes.current.length - 1) {
      currentScene.current = 0;
    } else {
      currentScene.current++;
    }
  };

  return (
    <AppContext.Provider
      value={{
        scenes,
        scenesState,
        updateScenes,
        instruments,
        loop,
        toggleLoop,
        currentScene,
        updateCurrentScene,
        nextScene,
        newScene,
        loopState,
        rewind,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
