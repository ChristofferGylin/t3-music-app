import * as Tone from "tone";
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
import createPattern from "./functions/createPattern";
import { InstrumentStateDrumsType } from "./types/InstrumentStateType";
import { EditNote } from "./types/EditNote";
import { DrumsKit, Project } from "@prisma/client";
import ProjectWithKits from "./types/ProjectWithKits";

export type ContextType = {
  scenes: MutableRefObject<Scene[]>;
  scenesState: Scene[];
  instruments: MutableRefObject<InstrumentsType>;
  instrumentsState: InstrumentStateDrumsType[];
  newInstrumentDrums: (kit: DrumsKit) => void;
  loop: MutableRefObject<boolean>;
  loopState: boolean;
  toggleLoop: () => void;
  currentScene: MutableRefObject<number>;
  currentSceneState: number;
  setSceneAndPlay: (update: number) => void;
  nextScene: () => void;
  newScene: () => void;
  rewind: () => void;
  addNote: (data: EditNote) => void;
  deleteNote: (data: EditNote) => void;
  projectLoaded: boolean;
  setLoaded: (state: boolean) => void;
  project: { id: string; name: string };
  loadProject: (dbProject: ProjectWithKits) => void;
};

export const AppContext = createContext<ContextType | null>(null);

type InstrumentsType = Array<DrumsType>;

const Context = ({ children }: { children: ReactNode }) => {
  const [scenesState, setScenesState] = useState<Scene[]>([]);
  const scenes = useRef<Scene[]>([]);
  const instruments = useRef<InstrumentsType>([]);
  const [instrumentsState, setInstrumentsState] = useState<
    InstrumentStateDrumsType[]
  >([]);
  const currentScene = useRef(0);
  const [loopState, setLoopState] = useState(true);
  const loop = useRef(true);
  const [currentSceneState, setCurrentSceneState] = useState(0);
  const [projectLoaded, setProjectLoaded] = useState(false);
  const [project, setProject] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });

  const newInstrumentDrums = async (
    kit: DrumsKit,
    loadingProject?: boolean,
  ) => {
    const newDrums = drums(kit);
    instruments.current.push(newDrums);

    const channelVolumes = newDrums.channels.map((channel) => {
      return channel.sampler.volume.value;
    });

    const newDrumsState: InstrumentStateDrumsType = {
      type: "drums",
      currentKit: kit.id,
      masterVolume: newDrums.masterVolume.volume.value,
      channelVolumes,
      modelName: "Drums",
      name: "Drums,",
    };

    setInstrumentsState((old) => {
      return [...old, newDrumsState];
    });

    if (!loadingProject) {
      scenes.current.forEach((scene) => {
        scene.patterns.push(createPattern("drums"));
      });

      setScenesState([...scenes.current]);
    }
  };

  // const newInstrument = (instrumentType: string) => {
  //   switch (instrumentType) {
  //     case "drums":
  //       const newDrums = drums();
  //       instruments.current.push(newDrums);

  //       const channelVolumes = newDrums.channels.map((channel) => {
  //         return channel.sampler.volume.value;
  //       });

  //       const newDrumsState: InstrumentStateDrumsType = {
  //         type: "drums",
  //         currentKit: [...defaultKit],
  //         kitName: "default kit",
  //         masterVolume: newDrums.masterVolume.volume.value,
  //         channelVolumes,
  //         modelName: "Drums",
  //       };

  //       setInstrumentsState((old) => {
  //         return [...old, newDrumsState];
  //       });
  //       scenes.current.forEach((scene) => {
  //         scene.patterns.push(createPattern("drums"));
  //       });

  //       setScenesState([...scenes.current]);

  //       break;
  //   }
  // };

  const newScene = () => {
    const newScene: Scene = { id: uuid(), patterns: [], longestPattern: 64 };

    for (let i = 0; i < instruments.current.length; i++) {
      if (instruments.current[i]?.type === "drums") {
        newScene.patterns.push(createPattern("drums"));
      }
    }

    setScenesState((old) => {
      return [...old, newScene];
    });

    scenes.current.push(newScene);
  };

  const addNote = (data: EditNote) => {
    console.log("add note data:", data);
    if (data.type === "drums") {
      scenes.current[data.scene]?.patterns[data.instrument]?.pattern[
        data.step
      ]?.start.push(data.note);

      setScenesState([...scenes.current]);
    }
  };

  const deleteNote = (data: EditNote) => {
    if (data.type === "drums") {
      scenes.current[data.scene]?.patterns[data.instrument]?.pattern[
        data.step
      ]?.start.forEach((note, index) => {
        if (note === data.note) {
          scenes.current[data.scene]?.patterns[data.instrument]?.pattern[
            data.step
          ]?.start.splice(index, 1);
        }
      });

      setScenesState([...scenes.current]);
    }
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

  const setSceneAndPlay = (update: number) => {
    currentScene.current = update;
    setCurrentSceneState(update);
    setLoopState(true);
    loop.current = true;
    rewind();
    if (Tone.Transport.state === "paused" || Tone.Transport.state === "stopped")
      Tone.Transport.start();
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

  const setLoaded = (state: boolean) => {
    setProjectLoaded(state);
  };

  const loadProject = (dbProject: ProjectWithKits) => {
    setProject({ id: dbProject.id, name: dbProject.name });
    const dbInstruments = JSON.parse(
      dbProject.instruments,
    ) as InstrumentStateDrumsType[];
    const dbScenes = JSON.parse(dbProject.scenes) as Scene[];

    setScenesState([...dbScenes]);
    scenes.current = [...dbScenes];

    dbInstruments.forEach((instrument) => {
      switch (instrument.modelName) {
        case "Drums":
          const selectedKit = dbProject.drumsKits.filter(
            (dbKit) => instrument.currentKit === dbKit.id,
          );

          if (selectedKit[0]) {
            newInstrumentDrums(selectedKit[0], true);
          }

          break;
      }
    });

    setCurrentSceneState(0);
    currentScene.current = 0;
    setProjectLoaded(true);
  };

  return (
    <AppContext.Provider
      value={{
        scenes,
        scenesState,
        instruments,
        instrumentsState,
        newInstrumentDrums,
        loop,
        toggleLoop,
        currentScene,
        currentSceneState,
        setSceneAndPlay,
        nextScene,
        newScene,
        loopState,
        rewind,
        addNote,
        deleteNote,
        projectLoaded,
        setLoaded,
        project,
        loadProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
