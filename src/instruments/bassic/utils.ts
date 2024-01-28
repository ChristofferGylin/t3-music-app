import { sliderMaxValue } from "~/data/constants";
import { scaleValue } from "~/utils/math/scaleValue";

export const sliderToSignal = (value: number) => {
  return value / sliderMaxValue;
};

export const signalToSlider = (value: number) => {
  return value * sliderMaxValue;
};

export const sliderToParam = (value: number) => {
  return Math.exp((value / sliderMaxValue) * Math.log(1000)) / 1000;
};

export const paramToSlider = (value: number) => {
  return (sliderMaxValue * Math.log(value * 1000)) / Math.log(1000);
};

export const sliderToParamEnv = (value: number) => {
  return scaleValue({
    value: value,
    fromScale: { start: 0, end: sliderMaxValue },
    toScale: { start: 0.001, end: 3 },
  });
};

export const paramToSliderEnv = (value: number) => {
  return scaleValue({
    value: value,
    fromScale: { start: 0.001, end: 3 },
    toScale: { start: 0, end: sliderMaxValue },
  });
};

export const sliderToParamFilterFreq = (value: number) => {
  return Math.exp(
    Math.log(20) + (value / sliderMaxValue) * (Math.log(20000) - Math.log(20)),
  );
};

export const paramToSliderFilterFreq = (value: number) => {
  return (
    (sliderMaxValue * (Math.log(value) - Math.log(20))) /
    (Math.log(20000) - Math.log(20))
  );
};

export const sliderToParamFilterRes = (value: number) => {
  return (value / sliderMaxValue) * 20;
};

export const paramToSliderFilterRes = (value: number) => {
  return (value / 20) * sliderMaxValue;
};

export const sliderToParamLfoFreq = (value: number) => {
  return Math.exp(
    Math.log(0.1) + (value / sliderMaxValue) * (Math.log(30) - Math.log(0.1)),
  );
};

export const paramToSliderLfoFreq = (value: number) => {
  return (
    ((Math.log(value) - Math.log(0.1)) / (Math.log(30) - Math.log(0.1))) *
    sliderMaxValue
  );
};
