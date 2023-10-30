import React, {
  MutableRefObject,
  ReactNode,
  createContext,
  useRef,
  useState,
} from "react";
import drums, { DrumsType } from "~/instruments/drums/drums";
import { Scene } from "~/types/Scene";
import { v4 as uuid } from "uuid";
import createPatternDrums from "./functions/createPatternDrums";
import createPatternDrums2 from "./functions/createPatternDrums2";
import { kits } from "./instruments/drums/kits";
import { InstrumentStateDrumsType } from "./types/InstrumentStateType";
import { KitsType } from "./types/KitsType";
import createPatternDrums3 from "./functions/createPatternDrums3";

export type ContextType = {
  scenes: MutableRefObject<Scene[]>;
  scenesState: Scene[];
  instruments: MutableRefObject<InstrumentsType>;
  instrumentsState: InstrumentStateDrumsType[];
  newInstrument: (instrumentType: string) => void;
  updateScenes: (update: Scene[]) => void;
  loop: MutableRefObject<boolean>;
  loopState: boolean;
  toggleLoop: () => void;
  currentScene: MutableRefObject<number>;
  currentSceneState: number;
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
  const [instrumentsState, setInstrumentsState] = useState<
    InstrumentStateDrumsType[]
  >([]);
  const currentScene = useRef(0);
  const [loopState, setLoopState] = useState(true);
  const loop = useRef(true);
  const [currentSceneState, setCurrentSceneState] = useState(0);

  const newInstrument = (instrumentType: string) => {
    switch (instrumentType) {
      case "drums":
        const newDrums = drums();
        instruments.current.push(newDrums);

        const channelVolumes = newDrums.channels.map((channel) => {
          return channel.sampler.volume.value;
        });

        const newDrumsState: InstrumentStateDrumsType = {
          type: "drums",
          currentKit: kits[0]!,
          masterVolume: newDrums.masterVolume.volume.value,
          channelVolumes,
        };

        setInstrumentsState((old) => {
          return [...old, newDrumsState];
        });
        scenes.current.forEach((scene) => {
          scene.patterns.push(createPatternDrums3());
        });
        setScenesState(scenes.current);

        break;
    }
  };

  const newScene = () => {
    const newScene: Scene = { id: uuid(), patterns: [] };

    for (let i = 0; i < instruments.current.length; i++) {
      if (instruments.current[i]?.type === "drums") {
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
    setCurrentSceneState(update);
  };

  const nextScene = () => {
    if (currentScene.current >= scenes.current.length - 1) {
      currentScene.current = 0;
      setCurrentSceneState(0);
    } else {
      currentScene.current++;
      setCurrentSceneState(currentScene.current);
    }
  };

  return (
    <AppContext.Provider
      value={{
        scenes,
        scenesState,
        updateScenes,
        instruments,
        instrumentsState,
        newInstrument,
        loop,
        toggleLoop,
        currentScene,
        currentSceneState,
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
