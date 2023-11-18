import { type PatternType } from "~/types/Pattern";
import { useContext } from "react";
import { type ContextType, AppContext } from "~/context";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { TbMultiplier2X } from "react-icons/tb";
import PatternButton from "./PatternButton";

type PatternEditorProps = {
  pattern: PatternType;
  sceneIndex: number;
  instrumentIndex: number;
  keys: JSX.Element[];
  grid: (JSX.Element[] | undefined)[];
};

const PatternContainer = ({
  pattern,
  sceneIndex,
  instrumentIndex,
  keys,
  grid,
}: PatternEditorProps) => {
  const { longerPattern, shorterPattern, doublePattern } = useContext(
    AppContext,
  )! as ContextType;

  let gridTemplate = "";

  if (pattern.type === "drums") {
    gridTemplate = "grid-rows-drums";
  } else {
    gridTemplate = "grid-rows-keys";
  }
  return (
    <div className="flex h-full w-full flex-col">
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
                doublePattern({
                  scene: sceneIndex,
                  instrument: instrumentIndex,
                });
              }}
              size=""
            />
          </div>
        </div>
      </div>
      <div className="flex w-full overflow-auto bg-slate-700">
        <ul
          className={`sticky left-0 grid grid-flow-col ${gridTemplate} justify-start gap-0 bg-blue-950`}
        >
          {keys}
        </ul>
        <ul
          className={`grid grid-flow-col ${gridTemplate} justify-start gap-0`}
        >
          {grid}
        </ul>
      </div>
    </div>
  );
};

export default PatternContainer;
