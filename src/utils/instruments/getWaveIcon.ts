import {
  PiWaveSawtooth,
  PiWaveSine,
  PiWaveSquare,
  PiWaveTriangle,
} from "react-icons/pi";
import { type OmniOscillatorType } from "tone/build/esm/source/oscillator/OscillatorInterface";

const getWaveIcon = (waveType: OmniOscillatorType) => {
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
