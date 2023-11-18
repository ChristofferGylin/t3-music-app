import * as Tone from "tone";
import React, {
  type MutableRefObject,
  type ReactNode,
  createContext,
  useRef,
  useState,
} from "react";
import drums, { type DrumsType } from "~/instruments/drums/drums";
import { type Scene } from "~/types/Scene";
import { v4 as uuid } from "uuid";
import createPattern from "./functions/createPattern";
import {
  type InstrumentStateBassicType,
  type InstrumentStateDrumsType,
} from "./types/InstrumentStateType";
import { type EditNote } from "./types/EditNote";
import { type DrumsKit } from "@prisma/client";
import type ProjectWithKits from "./types/ProjectWithKits";
import { type PatternSteps } from "./types/Pattern";
import signalToDb from "./utils/math/signalToDb";
import deepCopyPatternSteps from "./utils/deepCopyPatternSteps";
import deepCopyScene from "./utils/deepCopyScene";
import bassic, { type BassicType } from "./instruments/drums/bassic";

export type ContextType = {
  scenes: MutableRefObject<Scene[]>;
  scenesState: Scene[];
  instruments: MutableRefObject<InstrumentsType>;
  instrumentsState: InstrumentsStateType;
  newInstrumentDrums: (
    kit: DrumsKit,
    loadingProject?: boolean,
    chanVols?: number[],
    masterVol?: number,
  ) => void;
  newInstrumentBassic: (loadingProject?: boolean, masterVol?: number) => void;
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
  project: { id: string; name: string; masterVolume: number; bpm: number };
  loadProject: (dbProject: ProjectWithKits) => void;
  longerPattern: (data: { scene: number; instrument: number }) => void;
  shorterPattern: (data: { scene: number; instrument: number }) => void;
  doublePattern: (data: { scene: number; instrument: number }) => void;
  setCurrentStep: (data: { index?: number; next?: boolean }) => void;
  currentStep: MutableRefObject<number>;
  playing: boolean;
  setPlayState: (state: boolean) => void;
  appLoaded: MutableRefObject<boolean>;
  loadAppNow: boolean;
  loadApp: () => void;
  appIsLoaded: () => void;
  saving: boolean;
  setSavingState: (state: boolean) => void;
  setVolume: (options: {
    val: number;
    instrumentIndex?: number;
    channelIndex?: number;
    master?: boolean;
    type: string;
  }) => void;
  masterOut: MutableRefObject<Tone.Volume | null>;
  setMasterVolume: (val: number) => void;
  setBpm: (val: number) => void;
  copyScene: (index: number) => void;
};

export const AppContext = createContext<ContextType | null>(null);

type InstrumentsType = Array<DrumsType | BassicType>;
type InstrumentsStateType = Array<
  InstrumentStateDrumsType | InstrumentStateBassicType
>;

const Context = ({ children }: { children: ReactNode }) => {
  const appLoaded = useRef(false);
  const [loadAppNow, setLoadAppNow] = useState(false);
  const [scenesState, setScenesState] = useState<Scene[]>([]);
  const scenes = useRef<Scene[]>([]);
  const instruments = useRef<InstrumentsType>([]);
  const [instrumentsState, setInstrumentsState] =
    useState<InstrumentsStateType>([]);
  const currentScene = useRef(0);
  const currentStep = useRef(0);
  const [loopState, setLoopState] = useState(true);
  const loop = useRef(true);
  const [currentSceneState, setCurrentSceneState] = useState(0);
  const [projectLoaded, setProjectLoaded] = useState(false);
  const [project, setProject] = useState<{
    id: string;
    name: string;
    masterVolume: number;
    bpm: number;
  }>({
    id: "",
    name: "",
    masterVolume: 79.014,
    bpm: 120,
  });
  const [playing, setPlaying] = useState(false);
  const [saving, setSaving] = useState(false);
  const masterOut = useRef<Tone.Volume | null>(null);

  const setBpm = (val: number) => {
    setProject((old) => {
      const newProject = { ...old };
      newProject.bpm = val;
      return newProject;
    });
  };

  const setMasterVolume = (val: number) => {
    setProject((old) => {
      const newProject = { ...old };

      newProject.masterVolume = val;

      return newProject;
    });
  };

  const setVolume = (options: {
    val: number;
    instrumentIndex?: number;
    channelIndex?: number;
    master?: boolean;
    type: string;
  }) => {
    if (options.type === "drums") {
      setInstrumentsState((old) => {
        const newState = [...old];

        if (options.instrumentIndex === undefined) return newState;

        const instrument = newState[
          options.instrumentIndex
        ] as InstrumentStateDrumsType;

        if (instrument === undefined) return newState;

        if (options.master) {
          instrument.masterVolume = options.val;

          return newState;
        }

        if (options.channelIndex !== undefined) {
          instrument.channelVolumes[options.channelIndex] = options.val;
        }

        return newState;
      });
    }
  };

  const setSavingState = (state: boolean) => {
    setSaving(state);
  };

  const loadApp = () => {
    if (!appLoaded.current) {
      setLoadAppNow(true);
    }
  };
  const appIsLoaded = () => {
    setLoadAppNow(false);
  };

  const setPlayState = (state: boolean) => {
    setPlaying(state);
  };

  const setCurrentStep = (data: { index?: number; next?: boolean }) => {
    if (data.next) {
      const longest = scenes.current[currentScene.current]?.longestPattern;

      if (longest && currentStep.current === longest - 1) {
        currentStep.current = 0;
      } else {
        currentStep.current++;
      }
    }

    if (data.index) {
      currentStep.current = data.index;
    }
  };

  const newInstrumentDrums = (
    kit: DrumsKit,
    loadingProject?: boolean,
    chanVols?: number[],
    masterVol?: number,
  ) => {
    if (!masterOut.current) return;

    const newDrums = drums(masterOut.current, kit);

    instruments.current.push(newDrums);

    let channelVolumes;
    let masterVolume;

    if (loadingProject && chanVols && masterVol) {
      channelVolumes = chanVols;
      masterVolume = masterVol;
      newDrums.setMasterVolume(masterVolume);
      newDrums.channels.forEach((channel, index) => {
        const vol = chanVols[index];
        if (vol !== undefined) channel.setVolume(vol);
      });
    } else {
      masterVolume = 79.014;
      channelVolumes = newDrums.channels.map(() => {
        return 79.014;
      });
    }

    const newDrumsState: InstrumentStateDrumsType = {
      type: "drums",
      currentKit: kit.id,
      masterVolume: masterVolume,
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
  const newInstrumentBassic = (
    loadingProject?: boolean,
    masterVol?: number,
  ) => {
    if (!masterOut.current) return;

    const newInstrument = bassic(masterOut.current);

    instruments.current.push(newInstrument);

    let masterVolume;

    if (loadingProject && masterVol) {
      masterVolume = masterVol;
      newInstrument.setMasterVolume(masterVolume);
    } else {
      masterVolume = 79.014;
    }

    const newInstrumentState: InstrumentStateBassicType = {
      type: "keys",
      masterVolume: masterVolume,
      modelName: "Bassic",
      name: "Bassic",
    };

    setInstrumentsState((old) => {
      return [...old, newInstrumentState];
    });

    if (!loadingProject) {
      scenes.current.forEach((scene) => {
        scene.patterns.push(createPattern("keys"));
      });

      setScenesState([...scenes.current]);
    }
  };

  const newScene = () => {
    const newScene: Scene = { id: uuid(), patterns: [], longestPattern: 64 };

    // for (let i = 0; i < instruments.current.length; i++) {
    //   if (instruments.current[i]?.type === "drums") {
    //     newScene.patterns.push(createPattern("drums"));
    //   }
    // }

    for (const inst of instruments.current) {
      if (inst.type === "drums") {
        newScene.patterns.push(createPattern("drums"));
      }
    }

    setScenesState((old) => {
      return [...old, newScene];
    });

    scenes.current.push(newScene);
  };

  const copyScene = (index: number) => {
    const originalScene = scenes.current[index];

    if (!originalScene) return;

    scenes.current.push(deepCopyScene(originalScene));

    setScenesState((old) => [...old, deepCopyScene(originalScene)]);
  };

  const addNote = (data: EditNote) => {
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

  const longerPattern = (data: { scene: number; instrument: number }) => {
    const pattern = scenes.current[data.scene]?.patterns[data.instrument];

    if (pattern) {
      if (pattern.pattern.length < 1024) {
        if (pattern.length < pattern.pattern.length) {
          pattern.length += 64;
        } else {
          for (let i = 0; i < 64; i++) {
            const step: PatternSteps = {
              start: [] as (number | string)[],
              stop: [] as (number | string)[],
            };

            pattern.pattern.push(step);
          }

          if (pattern.pattern.length > 1024) pattern.pattern.length = 1024;

          pattern.length = pattern.pattern.length;
        }

        const scene = scenes.current[data.scene];

        if (scene) {
          let longest = 0;

          scene.patterns.forEach((pat) => {
            if (pat.length > longest) longest = pat.length;
          });

          scene.longestPattern = longest;
        }
      }
    }

    setScenesState([...scenes.current]);
  };

  const shorterPattern = (data: { scene: number; instrument: number }) => {
    const pattern = scenes.current[data.scene]?.patterns[data.instrument];
    const instrument = instruments.current[data.instrument];

    if (pattern && instrument) {
      if (pattern.pattern.length > 64) {
        let notesExist = false;

        for (
          let i = pattern.pattern.length - 64;
          i < pattern.pattern.length;
          i++
        ) {
          if (pattern.pattern[i]?.start.length) {
            notesExist = true;
            break;
          }
        }

        if (notesExist) {
          pattern.length = pattern.length - 64;
        } else {
          pattern.pattern.length -= 64;
          pattern.length = pattern.pattern.length;
        }

        const scene = scenes.current[data.scene];

        if (scene) {
          let longest = 0;

          scene.patterns.forEach((pat) => {
            if (pat.length > longest) longest = pat.length;
          });

          scene.longestPattern = longest;

          if (instrument.currentStep > pattern.length - 1) {
            instrument.currentStep -= 64;
          }
        }
      }
    }

    setScenesState([...scenes.current]);
  };

  const doublePattern = (data: { scene: number; instrument: number }) => {
    const pattern = scenes.current[data.scene]?.patterns[data.instrument];

    if (pattern) {
      if (pattern.pattern.length < 1024) {
        if (pattern.length < pattern.pattern.length) {
          pattern.pattern.length = pattern.length;
        }

        const newPattern = [
          ...deepCopyPatternSteps(pattern.pattern),
          ...deepCopyPatternSteps(pattern.pattern),
        ];

        if (newPattern.length > 1024) newPattern.length = 1024;

        pattern.length = newPattern.length;
        pattern.pattern = newPattern;

        const scene = scenes.current[data.scene];

        if (scene) {
          let longest = 0;

          scene.patterns.forEach((pat) => {
            if (pat.length > longest) longest = pat.length;
          });

          scene.longestPattern = longest;
        }
      }
    }

    setScenesState([...scenes.current]);
  };

  const rewind = () => {
    // for (let i = 0; i < instruments.current.length; i++) {
    //   instruments.current[i]!.currentStep = 0;
    // }

    for (const inst of instruments.current) {
      inst.currentStep = 0;
    }

    currentStep.current = 0;

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
    setPlayState(true);
  };

  const nextScene = () => {
    currentStep.current = 0;
    instruments.current.forEach((inst) => {
      inst.currentStep = 0;
    });

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
    if (!masterOut.current) {
      masterOut.current = new Tone.Volume(0).toDestination();
    }
    Tone.Transport.bpm.value = dbProject.bpm;
    masterOut.current.volume.value = signalToDb(dbProject.masterVolume);
    instruments.current = [];
    setInstrumentsState([]);
    setProject({
      id: dbProject.id,
      name: dbProject.name,
      masterVolume: dbProject.masterVolume,
      bpm: dbProject.bpm,
    });
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
          instrument.masterVolume;

          if (selectedKit[0]) {
            void newInstrumentDrums(
              selectedKit[0],
              true,
              instrument.channelVolumes,
              instrument.masterVolume,
            );
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
        newInstrumentBassic,
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
        longerPattern,
        shorterPattern,
        doublePattern,
        setCurrentStep,
        currentStep,
        playing,
        setPlayState,
        appLoaded,
        loadAppNow,
        loadApp,
        appIsLoaded,
        saving,
        setSavingState,
        setVolume,
        masterOut,
        setMasterVolume,
        setBpm,
        copyScene,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
