export type PatternDrums = {
  type: "drums";
  pattern: { start: number[] }[];
};
export type PatternKeys = {
  type: "keys";
  pattern: { start: string[]; stop: string[] }[];
};
