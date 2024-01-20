import { type DrumsType } from "~/instruments/drums/drums";
import {
  type PatternTypeDrums,
  type PatternType,
  type PatternTypeKeys,
} from "~/types/Pattern";
import { useContext } from "react";
import { type ContextType, AppContext } from "~/context";
import { type EditNote } from "~/types/EditNote";
import scales from "~/instruments/scales";
import { type BassicType } from "~/instruments/bassic";
import PatternContainer from "./PatternContainer";
import { Transport } from "tone";

type PatternEditorProps = {
  instrument: DrumsType | BassicType;
  pattern: PatternType;
  sceneIndex: number;
  instrumentIndex: number;
};

type GridCellProps = {
  callback: () => void;
  bgColor: string;
};

const GridCell = ({ callback, bgColor }: GridCellProps) => {
  return (
    <li
      onClick={callback}
      className={`flex h-8 w-12 items-center justify-center border-b border-r border-slate-600 ${bgColor}`}
    ></li>
  );
};

const PatternEditor = ({
  instrument,
  pattern,
  sceneIndex,
  instrumentIndex,
}: PatternEditorProps) => {
  const { addNote, deleteNote } = useContext(AppContext)! as ContextType;
  const colorActive = "bg-green-400";
  const colorInactive = "bg-slate-700";

  if (pattern.type === "drums") {
    const currentPattern = pattern as PatternTypeDrums;
    const currentInstrument = instrument as DrumsType;
    const keys = currentInstrument.channels.map((channel, index) => {
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
    });
    const grid = currentPattern.pattern.map((step, stepIndex) => {
      if (stepIndex < pattern.length) {
        if (pattern.resolution === 16 && stepIndex % 4 !== 0 && stepIndex !== 0)
          return;
        if (pattern.resolution === 32 && stepIndex % 2 !== 0 && stepIndex !== 0)
          return;

        let bgColor;
        let callback: () => void;
        const elements: JSX.Element[] = [];

        currentInstrument.channels.forEach((channel, i) => {
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
            <GridCell
              key={`step#${stepIndex}sample${i}`}
              callback={callback}
              bgColor={bgColor}
            />,
          );
        });

        return elements;
      }
    });

    return (
      <PatternContainer
        pattern={pattern}
        keys={keys}
        grid={grid}
        sceneIndex={sceneIndex}
        instrumentIndex={instrumentIndex}
      />
    );
  } else {
    const currentInstrument = instrument as BassicType;
    const currentPattern = pattern as PatternTypeKeys;
    const keys: JSX.Element[] = [];

    for (let j = 0; j < 8; j++) {
      scales.chromatic.forEach((note) => {
        let style = "bg-white text-slate-900";

        if (note.length > 1) {
          style = "bg-black text-slate-300";
        }

        const element = (
          <li
            onMouseDown={() => {
              currentInstrument.play(`${note}${j}`, Transport.now());
            }}
            onMouseUp={() => {
              currentInstrument.stop(Transport.now());
            }}
            key={`keyLabel#${note}${j}`}
            className={`flex h-8 w-24 items-center justify-start border-b border-r border-slate-600 px-2 text-xs font-light uppercase tracking-wide ${style}`}
          >
            {`${note}${j}`}
          </li>
        );
        keys.unshift(element);
      });
    }

    const grid = currentPattern.pattern.map((step, stepIndex) => {
      if (stepIndex < pattern.length) {
        if (pattern.resolution === 16 && stepIndex % 4 !== 0 && stepIndex !== 0)
          return;
        if (pattern.resolution === 32 && stepIndex % 2 !== 0 && stepIndex !== 0)
          return;

        let bgColor;
        let callback: () => void;
        const elements: JSX.Element[] = [];

        for (let j = 0; j < 8; j++) {
          scales.chromatic.forEach((note) => {
            const noteString = `${note}${j}`;
            const editNoteArgs: EditNote = {
              instrument: instrumentIndex,
              type: "keys",
              step: stepIndex,
              note: noteString,
              duration: `${pattern.resolution}n`,
              scene: sceneIndex,
            };

            if (
              step.start.filter((trig) => {
                if (trig.note === noteString) return true;
              }).length > 0
            ) {
              bgColor = colorActive;
              callback = () => {
                deleteNote(editNoteArgs);
              };
            } else {
              bgColor = colorInactive;
              callback = () => {
                currentInstrument.playAndStop(
                  noteString,
                  `${pattern.resolution}n`,
                  0,
                );
                addNote(editNoteArgs);
              };
            }

            elements.unshift(
              <GridCell
                key={`step#${stepIndex}-${noteString}`}
                callback={callback}
                bgColor={bgColor}
              />,
            );
          });
        }

        // currentInstrument.channels.forEach((channel, i) => {
        //   const editNoteArgs: EditNote = {
        //     instrument: instrumentIndex,
        //     type: "drums",
        //     step: stepIndex,
        //     note: i,
        //     scene: sceneIndex,
        //   };

        //   if (step.start.filter((trig) => trig === i).length > 0) {
        //     bgColor = colorActive;
        //     callback = () => {
        //       deleteNote(editNoteArgs);
        //     };
        //   } else {
        //     bgColor = colorInactive;
        //     callback = () => {
        //       channel.play();
        //       addNote(editNoteArgs);
        //     };
        //   }

        //   elements.push(
        //     <GridCell
        //       key={`step#${stepIndex}sample${i}`}
        //       callback={callback}
        //       i={i}
        //       stepIndex={stepIndex}
        //       bgColor={bgColor}
        //     />,
        //   );
        // });

        return elements;
      }
    });

    return (
      <PatternContainer
        pattern={pattern}
        keys={keys}
        grid={grid}
        sceneIndex={sceneIndex}
        instrumentIndex={instrumentIndex}
      />
    );
  }
};

export default PatternEditor;
