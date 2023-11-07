import { DrumsType } from "~/instruments/drums/drums";
import { PatternType } from "~/types/Pattern";
import { useContext } from "react";
import { AppContext, ContextType } from "~/context";
import { EditNote } from "~/types/EditNote";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { TbMultiplier2X } from "react-icons/tb";
import PatternButton from "./PatternButton";

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
  const { addNote, deleteNote, longerPattern, shorterPattern } = useContext(
    AppContext,
  ) as ContextType;

  const colorActive = "bg-green-400";
  const colorInactive = "bg-slate-700";

  const things = [];

  for (let i = 0; i < 176; i++) {
    things.push(i);
  }

  if (pattern.type === "drums") {
    return (
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-end bg-slate-800 p-2 text-slate-200">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center gap-0.5">
              <PatternButton
                Icon={AiOutlineMinus}
                callback={() => {
                  shorterPattern({
                    scene: sceneIndex,
                    instrument: instrumentIndex,
                  });
                }}
              />
              <div className="flex aspect-[2/1] h-7 items-center justify-center rounded border border-slate-700 bg-slate-900/50 p-1 text-sm font-light">
                {pattern.length === 64 ? (
                  <p>1 bar</p>
                ) : (
                  <p>{pattern.length / 64} bars</p>
                )}
              </div>
              <PatternButton
                Icon={AiOutlinePlus}
                callback={() => {
                  longerPattern({
                    scene: sceneIndex,
                    instrument: instrumentIndex,
                  });
                }}
              />
              <PatternButton
                Icon={TbMultiplier2X}
                callback={() => {
                  console.log("double");
                }}
                size=""
              />
            </div>
          </div>
        </div>
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
              if (stepIndex < pattern.length) {
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
              }
            })}
          </ul>
        </div>
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
