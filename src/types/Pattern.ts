export type PatternDrums = {
  type: "drums";
  pattern: { start: number[] }[];
  resolution: 16 | 32 | 64;
};
export type PatternKeys = {
  type: "keys";
  pattern: { start: string[]; stop: string[] }[];
  resolution: 16 | 32 | 64;
};
