import {
  type ToneOscillatorType,
  type OmniOscillatorType,
} from "tone/build/esm/source/oscillator/OscillatorInterface";

export type InstrumentStateDrumsType = {
  type: "drums";
  currentKit: string;
  masterVolume: number;
  channelVolumes: number[];
  modelName: string;
  name: string;
};

export type InstrumentStateBassicType = {
  type: "keys";
  masterVolume: number;
  modelName: string;
  name: string;
  parameters: {
    envelope: {
      attack: number;
      decay: number;
      sustain: number;
      release: number;
    };
    filterEnvelope: {
      attack: number;
      decay: number;
      sustain: number;
      release: number;
    };
    oscillator: {
      type: OmniOscillatorType;
      detune: number;
      volume: number;
      pwmWidth: number;
      polyphony: number;
    };
    filter: {
      frequency: number;
      resonance: number;
      type: BiquadFilterType;
      envelopeGain: number;
      lfoGain: number;
    };
    lfo: {
      frequency: number;
      amplitude: number;
      type: ToneOscillatorType;
      retrig: boolean;
    };
  };
};
