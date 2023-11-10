import { type PatternType } from "./Pattern";

export type Scene = {
  id: string;
  patterns: PatternType[];
  longestPattern: number;
};
