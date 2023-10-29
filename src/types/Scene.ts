import { PatternDrums, PatternKeys } from "./Pattern";

export type Scene = {
  id: string;
  patterns: (PatternDrums | PatternKeys)[];
};
