import { DrumsType } from "~/instruments/drums/drums";
import { PatternDrums, PatternKeys } from "~/types/Pattern";

type PatternEditorProps = {
  instrument: DrumsType;
  pattern: PatternDrums | PatternKeys;
};

const PatternEditor = ({ instrument, pattern }: PatternEditorProps) => {
  const addNote = () => {
    console.log("add note");
  };
  const deleteNote = () => {
    console.log("delete note");
  };

  const colorActive = "bg-green-400";
  const colorInactive = "bg-slate-700";
  let divider = 16;

  switch (pattern.resolution) {
    case 16:
      divider = 4;
      break;

    case 32:
      divider = 2;
      break;
  }

  console.log(pattern);
  const things = [];

  for (let i = 0; i < 176; i++) {
    things.push(i);
  }

  if (pattern.type === "drums") {
    return (
      <ul className="grid w-full grid-flow-col grid-rows-11 justify-start gap-0 bg-blue-950">
        {pattern.pattern.map((step, stepIndex) => {
          if (
            pattern.resolution === 16 &&
            stepIndex % 4 !== 0 &&
            stepIndex !== 0
          )
            return;
          if (
            pattern.resolution === 32 &&
            stepIndex % 2 !== 0 &&
            stepIndex !== 0
          )
            return;

          console.log(`${stepIndex}`);
          let bgColor;
          let callback;
          const elements = [];

          for (let i = 0; i < instrument.channels.length; i++) {
            if (step.start.filter((trig) => trig === i).length > 0) {
              bgColor = colorActive;
              callback = deleteNote;
            } else {
              bgColor = colorInactive;
              callback = addNote;
            }

            elements.push(
              <li
                onClick={callback}
                key={`step#${stepIndex}sample${i}`}
                className={`flex h-6 w-12 items-center justify-center border-b border-r border-slate-600 ${bgColor}`}
              ></li>,
            );
          }

          return elements;
        })}
      </ul>
    );
  } else {
    return (
      <ul className="grid w-full grid-flow-col grid-rows-11 justify-start gap-0 bg-blue-950">
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
  }
};

export default PatternEditor;
