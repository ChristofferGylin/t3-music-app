import {
  Volume,
  Filter,
  Envelope,
  Gain,
  Noise,
  Oscillator,
  Scale,
  Transport,
  LFO,
} from "tone";
import { type Time } from "tone/build/esm/core/type/Units";
import { type InstrumentStateBassicType } from "~/types/InstrumentStateType";
import signalToDb from "~/utils/math/signalToDb";
import {
  sliderToParam,
  sliderToParamEnv,
  sliderToParamFilterFreq,
  sliderToParamFilterRes,
  sliderToParamLfoFreq,
  sliderToSignal,
} from "./utils";

export type BassicType = {
  voices: BassicVoiceType[];
  currentStep: number;
  masterVolume: Volume;
  play: (note: string, time: Time) => void;
  stop: (time: Time) => void;
  playAndStop: (note: string, duration: Time, time: Time) => void;
  setMasterVolume: (val: number) => void;
  loadPreset: (preset: InstrumentStateBassicType) => void;
  name: string;
  type: "keys";
  modelName: "Bassic";
  polyphony: number;
  new: boolean;
  lfo: LFO;
  noise: Noise;
  //lfoFilterScaler: Scale;
  lfoFilterGain: Gain;
};

export type BassicParameterType =
  | "osc-type"
  | "osc-gain"
  | "osc-poly"
  | "osc-sub"
  | "osc-noise"
  | "filter-freq"
  | "filter-res"
  | "filter-env"
  | "filter-lfo"
  | "filter-kybd"
  | "env-a"
  | "env-d"
  | "env-s"
  | "env-r"
  | "filter-env-a"
  | "filter-env-d"
  | "filter-env-s"
  | "filter-env-r"
  | "lfo-type"
  | "lfo-freq"
  | "lfo-retrig";

export type BassicVoiceType = {
  oscillator: Oscillator;
  subOscillator: Oscillator;
  filter: Filter;
  envelope: Envelope;
  vca: Gain;
  filterEnvGain: Gain;
  filterLfoGain: Gain;
  filterEnvScaler: Scale;
  ampGain: Gain;
  oscGain: Gain;
  subOscGain: Gain;
  noiseGain: Gain;
};

const bassic = function (masterOut: Volume): BassicType {
  const now = Transport.now();

  const newBassic: BassicType = {
    masterVolume: new Volume(0).connect(masterOut),
    voices: [] as BassicVoiceType[],
    lfo: new LFO(5, 0, 20000).set({ amplitude: 0 }).start(now),
    noise: new Noise("white").start(),
    //lfoFilterScaler: new Scale(0, 4000),
    lfoFilterGain: new Gain(0),
    currentStep: 0,
    name: "Bassic",

    play: function (note: string, time?: Time) {
      let currentTime = time;

      if (currentTime === undefined) {
        currentTime = Transport.now();
      }

      if (this.polyphony === 1) {
        const firstVoice = this.voices[0];

        if (firstVoice !== undefined) {
          firstVoice.vca.gain.setValueAtTime(0, currentTime);
          firstVoice.oscillator.frequency.setValueAtTime(note, currentTime);
          firstVoice.subOscillator.frequency.setValueAtTime(note, currentTime);
          firstVoice.envelope.triggerAttack(currentTime);
        }
      }
    },
    stop: function (time?: Time) {
      let currentTime = time;

      if (currentTime === undefined) {
        currentTime = Transport.now();
      }
      if (this.polyphony === 1) {
        const firstVoice = this.voices[0];

        if (firstVoice !== undefined) {
          firstVoice.envelope.triggerRelease(currentTime);
        }
      }
    },
    playAndStop: function (note: string, duration: Time, time: Time) {
      if (this.polyphony === 1) {
        const firstVoice = this.voices[0];

        if (firstVoice !== undefined) {
          firstVoice.oscillator.frequency.setValueAtTime(note, time);
          firstVoice.subOscillator.frequency.setValueAtTime(note, time);
          firstVoice.vca.gain.setValueAtTime(0, time);
          firstVoice.envelope.triggerAttackRelease(duration, time);
        }
      }
    },
    setMasterVolume: function (val: number) {
      const dBValue = signalToDb(val);

      this.masterVolume.volume.value = dBValue;
    },
    loadPreset: function (preset: InstrumentStateBassicType) {
      const envAttack = sliderToParamEnv(preset.parameters.envelope.attack);

      for (const voice of this.voices) {
        voice.envelope.attack = envAttack;
      }

      const envDecay = sliderToParamEnv(preset.parameters.envelope.decay);

      for (const voice of this.voices) {
        voice.envelope.decay = envDecay;
      }

      const envSustain = sliderToParam(preset.parameters.envelope.sustain);

      for (const voice of this.voices) {
        voice.envelope.sustain = envSustain;
      }

      const envRelease = sliderToParamEnv(preset.parameters.envelope.release);

      for (const voice of this.voices) {
        voice.envelope.release = envRelease;
      }

      const filterFreq = sliderToParamFilterFreq(
        preset.parameters.filter.frequency,
      );

      for (const voice of this.voices) {
        voice.filter.frequency.value = filterFreq;
        voice.filterEnvScaler.min = filterFreq;
      }

      const filterRes = sliderToParamFilterRes(
        preset.parameters.filter.resonance,
      );

      for (const voice of this.voices) {
        voice.filter.Q.value = filterRes;
      }

      const filterEnv = sliderToParam(preset.parameters.filter.envelopeGain);

      for (const voice of this.voices) {
        voice.filterEnvGain.gain.value = filterEnv;
      }

      this.lfo.set({
        amplitude: sliderToSignal(preset.parameters.filter.lfoGain),
      });

      this.lfo.set({
        max: filterFreq,
      });

      this.lfo.type = preset.parameters.lfo.type;
      this.lfo.frequency.value = sliderToParamLfoFreq(
        preset.parameters.lfo.frequency,
      );

      const oscGain = sliderToSignal(preset.parameters.oscillator.gain);

      for (const voice of this.voices) {
        voice.oscGain.gain.value = oscGain;
      }

      const subGain = sliderToSignal(preset.parameters.oscillator.sub);

      for (const voice of this.voices) {
        voice.subOscGain.gain.value = subGain;
      }

      const noiseGain = sliderToSignal(preset.parameters.oscillator.noise);

      for (const voice of this.voices) {
        voice.noiseGain.gain.value = noiseGain;
      }

      for (const voice of this.voices) {
        voice.oscillator.type = preset.parameters.oscillator.type;
      }
    },
    type: "keys",
    modelName: "Bassic",
    polyphony: 1,
    new: true,
  };

  //newBassic.lfo.connect(newBassic.lfoFilterGain);
  //newBassic.lfoFilterGain.connect(newBassic.lfoFilterScaler);

  for (let i = 0; i < 1; i++) {
    const voice: BassicVoiceType = {
      oscillator: new Oscillator(440, "square").start(now),
      subOscillator: new Oscillator(440, "square").start(now),
      filter: new Filter(20000),
      envelope: new Envelope(0.001, 0.001, 1, 0.001),
      vca: new Gain(0),
      filterEnvGain: new Gain(0),
      filterLfoGain: new Gain(0),
      filterEnvScaler: new Scale(20000, 20000),
      ampGain: new Gain(0.5),
      oscGain: new Gain(0.5),
      subOscGain: new Gain(0),
      noiseGain: new Gain(0),
    };

    voice.subOscillator.set({ detune: -1200 });

    voice.oscillator.connect(voice.oscGain);
    voice.oscGain.connect(voice.filter);
    voice.filter.connect(voice.vca);
    voice.vca.connect(newBassic.masterVolume);

    voice.subOscillator.connect(voice.subOscGain);
    voice.subOscGain.connect(voice.filter);

    newBassic.noise.connect(voice.noiseGain);
    voice.noiseGain.connect(voice.filter);

    //newBassic.lfoFilterScaler.connect(voice.filter.frequency);
    newBassic.lfo.connect(voice.filter.frequency);
    voice.envelope.connect(voice.ampGain);
    voice.ampGain.connect(voice.vca.gain);
    voice.envelope.connect(voice.filterEnvGain);
    voice.filterEnvGain.connect(voice.filterEnvScaler);
    voice.filterEnvScaler.connect(voice.filter.frequency);

    newBassic.voices.push(voice);
  }

  return newBassic;
};

export default bassic;
