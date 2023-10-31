export type EditNote = {
  step: number;
  note: string | number;
  instrument: number;
  scene: number;
  type: "drums" | "keys";
};
