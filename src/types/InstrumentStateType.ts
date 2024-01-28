import { type ToneOscillatorType } from "tone/build/esm/source/oscillator/OscillatorInterface";

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
      type: ToneOscillatorType;
      detune: number;
      gain: number;
      pwmWidth: number;
      polyphony: number;
      sub: number;
      noise: number;
    };
    filter: {
      frequency: number;
      resonance: number;
      type: BiquadFilterType;
      envelopeGain: number;
      lfoGain: number;
      kybd: number;
    };
    lfo: {
      frequency: number;
      amplitude: number;
      type: ToneOscillatorType;
      retrig: boolean;
    };
  };
};
