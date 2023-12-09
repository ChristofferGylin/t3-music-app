import { Volume, MonoSynth } from "tone";
import { type Time } from "tone/build/esm/core/type/Units";
import signalToDb from "~/utils/math/signalToDb";

export type BassicType = {
  currentStep: number;
  masterVolume: Volume;
  play: (note: string) => void;
  stop: () => void;
  playAndStop: (note: string, duration: Time, time: Time) => void;
  setMasterVolume: (val: number) => void;
  name: string;
  instrument: MonoSynth;
  type: "keys";
  modelName: string;
  polyphony: string;
  new: boolean;
};

const bassic = function (masterOut: Volume): BassicType {
  const masterVolume = new Volume(0).connect(masterOut);

  const instrument = new MonoSynth({
    oscillator: {
      type: "square",
    },
    envelope: {
      attack: 0.001,
    },
  }).connect(masterVolume);

  return {
    currentStep: 0,
    name: "Bassic",
    masterVolume,
    play: function (note: string) {
      this.stop();
      this.instrument.triggerAttack(note);
    },
    stop: function () {
      this.instrument.triggerRelease();
    },
    playAndStop: function (note: string, duration: Time, time: Time) {
      this.stop();
      this.instrument.triggerAttackRelease(note, duration, time);
    },
    setMasterVolume: function (val: number) {
      const dBValue = signalToDb(val);

      this.masterVolume.volume.value = dBValue;
    },
    instrument,
    type: "keys",
    modelName: "Bassic",
    polyphony: "mono",
    new: true,
  };
};

export default bassic;
