import { DrumsType } from "~/instruments/drums/drums";
import { PatternDrums, PatternKeys } from "~/types/Pattern";

type PatternEditorProps = {
  instrument: DrumsType;
  pattern: PatternDrums | PatternKeys;
};

const PatternEditor = ({ instrument, pattern }: PatternEditorProps) => {
  const things = [];

  for (let i = 0; i < 176; i++) {
    things.push(i);
  }
  return (
    <ul className="grid-rows-11 grid w-full grid-flow-col justify-start gap-0 bg-blue-950">
      {things.map((step, index) => {
        return (
          <li
            key={`step#${index}`}
            className="flex h-6 w-12 items-center justify-center border-b border-r border-slate-400 bg-slate-700 text-blue-100"
          >
            {step}
          </li>
        );
      })}
    </ul>
  );
};

export default PatternEditor;
