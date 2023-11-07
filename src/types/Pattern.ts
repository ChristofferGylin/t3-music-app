export type PatternSteps = {
  start: (number | string)[];
  stop: (number | string)[];
};

export type PatternType = {
  type: string;
  pattern: PatternSteps[];
  resolution: 16 | 32 | 64;
  length: number;
};
