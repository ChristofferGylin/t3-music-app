import { DrumsType } from "~/instruments/drums/drums";
import { PatternType } from "~/types/Pattern";
import { useContext } from "react";
import { AppContext, ContextType } from "~/context";
import { EditNote } from "~/types/EditNote";

type PatternEditorProps = {
  instrument: DrumsType;
  pattern: PatternType;
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
      <div className="flex w-full overflow-auto bg-slate-700">
        <ul className="sticky left-0 top-0 grid grid-flow-col grid-rows-11 justify-start gap-0 bg-blue-950">
          {instrument.channels.map((channel, index) => {
            return (
              <li
                onClick={() => {
                  channel.play();
                }}
                key={`drumLabel#${index}`}
                className={`flex h-8 w-24 items-center justify-start border-b border-r border-slate-600 bg-slate-800 px-2 text-xs font-light uppercase tracking-wide text-slate-300`}
              >
                {channel.name}
              </li>
            );
          })}
        </ul>
        <ul className="grid grid-flow-col grid-rows-11 justify-start gap-0 bg-blue-950">
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
            let callback: () => void;
            const elements: JSX.Element[] = [];

            instrument.channels.forEach((channel, i) => {
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
                  channel.play();
                  addNote(editNoteArgs);
                };
              }

              elements.push(
                <li
                  onClick={callback}
                  key={`step#${stepIndex}sample${i}`}
                  className={`flex h-8 w-12 items-center justify-center border-b border-r border-slate-600 ${bgColor}`}
                ></li>,
              );
            });

            return elements;
          })}
        </ul>
      </div>
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
