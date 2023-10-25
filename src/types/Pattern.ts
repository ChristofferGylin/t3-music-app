export type PatternDrums = {
  id: string;
  pattern: { start: number[] }[];
};
export type PatternKeys = {
  id: string;
  pattern: { start: string[]; stop: string[] }[];
};
