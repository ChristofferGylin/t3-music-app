import { DrumsType } from "~/instruments/drums/drums";
import { PatternDrums, PatternKeys } from "~/types/Pattern";
import { useContext } from "react";
import { AppContext, ContextType } from "~/context";
import { EditNote } from "~/types/EditNote";

type PatternEditorProps = {
  instrument: DrumsType;
  pattern: PatternDrums | PatternKeys;
  sceneIndex: number;
  instrumentIndex: number;
};

const PatternEditor = ({
  instrument,
  pattern,
  sceneIndex,
  instrumentIndex,
}: PatternEditorProps) => {
  const { addNote, deleteNote } = useContext(AppContext) as ContextType;

  const colorActive = "bg-green-400";
  const colorInactive = "bg-slate-700";

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

          let bgColor;
          let callback: (data: EditNote) => void;
          const elements = [];

          for (let i = 0; i < instrument.channels.length; i++) {
            const editNoteArgs: EditNote = {
              instrument: instrumentIndex,
              type: "drums",
              step: stepIndex,
              note: i,
              scene: sceneIndex,
            };

            if (step.start.filter((trig) => trig === i).length > 0) {
              bgColor = colorActive;
              callback = () => {
                deleteNote(editNoteArgs);
              };
            } else {
              bgColor = colorInactive;
              callback = () => {
                addNote(editNoteArgs);
              };
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
