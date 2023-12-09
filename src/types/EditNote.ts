import { type Time } from "tone/build/esm/core/type/Units";

export type EditNote = {
  step: number;
  note: string | number;
  duration?: Time;
  instrument: number;
  scene: number;
  type: "drums" | "keys";
};
