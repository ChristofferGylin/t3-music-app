import {
  PiWaveSawtooth,
  PiWaveSine,
  PiWaveSquare,
  PiWaveTriangle,
} from "react-icons/pi";
import { type ToneOscillatorType } from "tone";

const getWaveIcon = (waveType: ToneOscillatorType) => {
  switch (waveType) {
    case "sawtooth":
      return PiWaveSawtooth;

    case "square":
      return PiWaveSquare;

    case "triangle":
      return PiWaveTriangle;

    default:
      return PiWaveSine;
  }
};

export default getWaveIcon;
