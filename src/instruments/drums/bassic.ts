import { Volume, MonoSynth } from "tone";
import signalToDb from "~/utils/math/signalToDb";

export type BassicType = {
  currentStep: number;
  masterVolume: Volume;
  setMasterVolume: (val: number) => void;
  name: string;
  instrument: MonoSynth;
  type: "keys";
  modelName: string;
  new: boolean;
};

const bassic = function (masterOut: Volume): BassicType {
  const masterVolume = new Volume(0).connect(masterOut);

  const instrument = new MonoSynth({
    oscillator: {
      type: "square",
    },
    envelope: {
      attack: 0.1,
    },
  }).connect(masterVolume);

  return {
    currentStep: 0,
    name: "Bassic",
    masterVolume,
    setMasterVolume: function (val: number) {
      const dBValue = signalToDb(val);

      this.masterVolume.volume.value = dBValue;
    },
    instrument,
    type: "keys",
    modelName: "Bassic",
    new: true,
  };
};

export default bassic;
