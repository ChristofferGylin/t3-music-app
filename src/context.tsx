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
import {
  createPatternDrums,
  createPatternKeys,
} from "./functions/createPattern";
import {
  type InstrumentStateBassicType,
  type InstrumentStateDrumsType,
} from "./types/InstrumentStateType";
import { type EditNote } from "./types/EditNote";
import { type DrumsKit } from "@prisma/client";
import type ProjectWithKits from "./types/ProjectWithKits";
import {
  type PatternStepsDrums,
  type PatternTypeDrums,
  type PatternTypeKeys,
  type PatternStepsKeys,
} from "./types/Pattern";
import signalToDb from "./utils/math/signalToDb";
import {
  deepCopyPatternStepsDrums,
  deepCopyPatternStepsKeys,
} from "./utils/deepCopyPatternSteps";
import deepCopyScene from "./utils/deepCopyScene";
import bassic, {
  type BassicParameterType,
  type BassicType,
} from "./instruments/bassic";
import { type Time } from "tone/build/esm/core/type/Units";
import { scaleValue } from "./utils/math/scaleValue";
import deepCopyInstrumentsState from "./utils/deepCopyInstrumentsState";

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
  setBassicParameter: (
    instrumentIndex: number,
    parameter: BassicParameterType,
    value: number,
  ) => void;
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
        scene.patterns.push(createPatternDrums());
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
      parameters: {
        envelope: {
          attack: 0,
          decay: 0,
          sustain: 100,
          release: 0,
        },
        filterEnvelope: {
          attack: 0,
          decay: 0,
          sustain: 100,
          release: 0,
        },
        oscillator: {
          type: "square",
          detune: 0,
          volume: 0,
          pwmWidth: 0,
          polyphony: 1,
        },
        filter: {
          frequency: 100,
          resonance: 0,
          type: "lowpass",
          envelopeGain: 0,
          lfoGain: 0,
          kybd: 0,
        },
        lfo: {
          frequency: 5,
          amplitude: 0,
          type: "sine",
          retrig: true,
        },
      },
    };

    setInstrumentsState((old) => {
      return [...old, newInstrumentState];
    });

    if (!loadingProject) {
      scenes.current.forEach((scene) => {
        scene.patterns.push(createPatternKeys());
      });

      setScenesState([...scenes.current]);
    }
  };

  const setBassicParameter = (
    instrumentIndex: number,
    parameter: BassicParameterType,
    value: number,
  ) => {
    if (instruments.current[instrumentIndex]?.modelName === "Bassic") {
      const instrument = instruments.current[instrumentIndex] as BassicType;
      let calcedValue;
      switch (parameter) {
        case "env-a":
          calcedValue = scaleValue({
            value: value,
            fromScale: { start: 0, end: 100 },
            toScale: { start: 0.001, end: 3 },
          });

          for (const voice of instrument.voices) {
            voice.envelope.attack = calcedValue;
          }

          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.envelope.attack = value;
            }

            return newState;
          });
          break;
        case "env-d":
          calcedValue = scaleValue({
            value: value,
            fromScale: { start: 0, end: 100 },
            toScale: { start: 0.001, end: 3 },
          });
          for (const voice of instrument.voices) {
            voice.envelope.decay = calcedValue;
          }

          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.envelope.decay = value;
            }

            return newState;
          });
          break;
        case "env-s":
          calcedValue = Math.exp((value / 100) * Math.log(1000)) / 1000;

          for (const voice of instrument.voices) {
            voice.envelope.sustain = calcedValue;
          }

          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.envelope.sustain = value;
            }

            return newState;
          });
          break;
        case "env-r":
          calcedValue = scaleValue({
            value: value,
            fromScale: { start: 0, end: 100 },
            toScale: { start: 0.001, end: 3 },
          });

          for (const voice of instrument.voices) {
            voice.envelope.release = calcedValue;
          }

          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.envelope.release = value;
            }

            return newState;
          });
          break;

        case "filter-freq":
          calcedValue = Math.exp(
            Math.log(20) + (value / 100) * (Math.log(20000) - Math.log(20)),
          );

          instrument.lfo.set({
            max: calcedValue,
          });

          for (const voice of instrument.voices) {
            voice.filter.frequency.value = calcedValue;
            voice.filterEnvScaler.min = calcedValue;
          }

          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.filter.frequency = value;
            }

            return newState;
          });
          break;
        case "filter-res":
          calcedValue = (value / 100) * 20;

          for (const voice of instrument.voices) {
            voice.filter.Q.value = calcedValue;
          }

          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.filter.resonance = value;
            }

            return newState;
          });
          break;
        case "filter-env":
          calcedValue = Math.exp((value / 100) * Math.log(1000)) / 1000;

          for (const voice of instrument.voices) {
            voice.filterEnvGain.gain.value = calcedValue;
          }

          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.filter.envelopeGain = value;
            }

            return newState;
          });
          break;
        case "filter-lfo":
          instrument.lfo.set({ amplitude: value / 100 });

          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.filter.lfoGain = value;
            }

            return newState;
          });
          break;
        case "filter-kybd":
          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.filter.kybd = value;
            }

            return newState;
          });
          break;
        case "lfo-type":
          let newWave: Tone.ToneOscillatorType;

          switch (instrument.lfo.type) {
            case "sawtooth":
              newWave = "square";
              break;

            case "square":
              newWave = "triangle";
              break;

            case "triangle":
              newWave = "sine";
              break;

            case "sine":
              newWave = "sawtooth";
              break;
            default:
              newWave = "sine";
          }

          instrument.lfo.type = newWave;

          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.lfo.type = newWave;
            }

            return newState;
          });
          break;

        case "lfo-freq":
          calcedValue = Math.exp(
            Math.log(0.1) + (value / 100) * (Math.log(30) - Math.log(0.1)),
          );
          instrument.lfo.frequency.value = calcedValue;

          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.lfo.frequency = value;
            }

            return newState;
          });
          break;

        case "lfo-retrig":
          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.lfo.retrig =
                !instrumentState.parameters.lfo.retrig;
            }

            return newState;
          });
          break;

        case "osc-poly":
          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.oscillator.polyphony = value;
            }

            return newState;
          });
          break;

        case "osc-type":
          let newOscWave: Tone.ToneOscillatorType;

          switch (instrument.voices[0]?.oscillator.type) {
            case "sawtooth":
              newOscWave = "square";
              break;

            case "square":
              newOscWave = "triangle";
              break;

            case "triangle":
              newOscWave = "sine";
              break;

            case "sine":
              newOscWave = "sawtooth";
              break;
            default:
              newOscWave = "sine";
          }

          instrument.voices.forEach((voice) => {
            voice.oscillator.type = newOscWave;
          });

          setInstrumentsState((old) => {
            const newState = deepCopyInstrumentsState(old);

            if (newState[instrumentIndex]?.modelName === "Bassic") {
              const instrumentState = newState[
                instrumentIndex
              ] as InstrumentStateBassicType;

              instrumentState.parameters.oscillator.type = newOscWave;
            }

            return newState;
          });
          break;
      }
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
        newScene.patterns.push(createPatternDrums());
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
    if (data.type === "drums" && typeof data.note === "number") {
      const pattern = scenes.current[data.scene]?.patterns[
        data.instrument
      ] as PatternTypeDrums;

      pattern.pattern[data.step]?.start.push(data.note);

      setScenesState([...scenes.current]);
    } else if (
      data.type === "keys" &&
      typeof data.note === "string" &&
      data.duration
    ) {
      const note = {
        note: data.note,
        duration: data.duration,
      };

      const pattern = scenes.current[data.scene]?.patterns[
        data.instrument
      ] as PatternTypeKeys;

      pattern.pattern[data.step]?.start.push(note);

      pattern.pattern[data.step]?.start.sort((a, b) => {
        const sortA = a.note.replace("#", "");
        const sortB = b.note.replace("#", "");

        if (sortA < sortB) {
          return -1;
        } else if (sortA > sortB) {
          return 1;
        } else {
          return 0;
        }
      });

      setScenesState([...scenes.current]);
    }
  };

  const deleteNote = (data: EditNote) => {
    if (data.type === "drums") {
      const pattern = scenes.current[data.scene]?.patterns[
        data.instrument
      ] as PatternTypeDrums;

      pattern.pattern[data.step]?.start.forEach((note, index) => {
        if (note === data.note) {
          pattern.pattern[data.step]?.start.splice(index, 1);
        }
      });
    } else {
      const pattern = scenes.current[data.scene]?.patterns[
        data.instrument
      ] as PatternTypeKeys;

      pattern.pattern[data.step]?.start.forEach((note, index) => {
        if (note.note === data.note) {
          pattern.pattern[data.step]?.start.splice(index, 1);
        }
      });
    }
    setScenesState([...scenes.current]);
  };

  const longerPattern = (data: { scene: number; instrument: number }) => {
    if (
      scenes.current[data.scene]?.patterns[data.instrument]?.type === "keys"
    ) {
      const pattern = scenes.current[data.scene]?.patterns[
        data.instrument
      ] as PatternTypeKeys;

      if (pattern.pattern.length < 1024) {
        if (pattern.length < pattern.pattern.length) {
          pattern.length += 64;
        } else {
          for (let i = 0; i < 64; i++) {
            const step: PatternStepsKeys = {
              start: [] as { note: string; duration: Time }[],
              stop: [] as { note: string; duration: Time }[],
            };

            pattern.pattern.push(step);
          }

          if (pattern.pattern.length > 1024) pattern.pattern.length = 1024;

          pattern.length = pattern.pattern.length;
        }
      }
    } else {
      const pattern = scenes.current[data.scene]?.patterns[
        data.instrument
      ] as PatternTypeDrums;

      if (pattern.pattern.length < 1024) {
        if (pattern.length < pattern.pattern.length) {
          pattern.length += 64;
        } else {
          for (let i = 0; i < 64; i++) {
            const step: PatternStepsDrums = {
              start: [] as number[],
            };

            pattern.pattern.push(step);
          }

          if (pattern.pattern.length > 1024) pattern.pattern.length = 1024;

          pattern.length = pattern.pattern.length;
        }
      }
    }

    const scene = scenes.current[data.scene];

    if (scene) {
      let longest = 0;

      scene.patterns.forEach((pat) => {
        if (pat.length > longest) longest = pat.length;
      });

      scene.longestPattern = longest;
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
    if (
      scenes.current[data.scene]?.patterns[data.instrument]?.type === "keys"
    ) {
      const pattern = scenes.current[data.scene]?.patterns[
        data.instrument
      ] as PatternTypeKeys;

      if (pattern.pattern.length < 1024) {
        if (pattern.length < pattern.pattern.length) {
          pattern.pattern.length = pattern.length;
        }

        const newPattern = [
          ...deepCopyPatternStepsKeys(pattern.pattern),
          ...deepCopyPatternStepsKeys(pattern.pattern),
        ];

        if (newPattern.length > 1024) newPattern.length = 1024;

        pattern.length = newPattern.length;
        pattern.pattern = newPattern;
      }
    } else {
      const pattern = scenes.current[data.scene]?.patterns[
        data.instrument
      ] as PatternTypeDrums;

      if (pattern.pattern.length < 1024) {
        if (pattern.length < pattern.pattern.length) {
          pattern.pattern.length = pattern.length;
        }

        const newPattern = [
          ...deepCopyPatternStepsDrums(pattern.pattern),
          ...deepCopyPatternStepsDrums(pattern.pattern),
        ];

        if (newPattern.length > 1024) newPattern.length = 1024;

        pattern.length = newPattern.length;
        pattern.pattern = newPattern;
      }
    }

    const scene = scenes.current[data.scene];

    if (scene) {
      let longest = 0;

      scene.patterns.forEach((pat) => {
        if (pat.length > longest) longest = pat.length;
      });

      scene.longestPattern = longest;
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
        setBassicParameter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
