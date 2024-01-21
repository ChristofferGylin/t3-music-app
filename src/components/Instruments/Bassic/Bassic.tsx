import { type InstrumentType } from "~/types/InstrumentType";
import { useContext, useState } from "react";
import { AppContext, type ContextType } from "~/context";
import { type InstrumentStateBassicType } from "~/types/InstrumentStateType";
import LFO from "./ParamGroups/LFO";
import OSC from "./ParamGroups/OSC";
import Filter from "./ParamGroups/Filter";
import Envelope from "./ParamGroups/Envelope";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const paramGroupClasses =
  "flex flex-col gap-2 h-full w-full items-center text-center justify-center rounded-xl border border-slate-600 p-1 sm:p-2 md:p-2 lg:p-3";
export const paramGroupInnerClasses =
  "flex h-full w-full gap-1 sm:gap-2 md:gap-2 lg:gap-3 justify-center";
export const paramGroupTitleClasses =
  "w-full text-center text-xs sm:text-sm md:text-base lg:text-lg";

const Bassic = ({
  instrument,
  instrumentIndex,
}: {
  instrument: InstrumentType;
  instrumentIndex: number;
}) => {
  const { instrumentsState } = useContext(AppContext)! as ContextType;
  const state = instrumentsState[instrumentIndex] as InstrumentStateBassicType;
  const [mobileTab, setMobileTab] = useState(1);
  if (instrument.modelName === "Bassic" && state !== undefined) {
    return (
      <>
        <div className="min-w-80 min-h-44 hidden grid-cols-[2fr_4fr_5fr_4fr] justify-center gap-1 rounded-xl border border-slate-700/70 bg-slate-700/50 p-0.5 shadow-lg xs:grid sm:gap-2 sm:p-1 md:gap-2 md:p-2 lg:gap-3 lg:p-3">
          <LFO instrumentIndex={instrumentIndex} />
          <OSC instrumentIndex={instrumentIndex} />
          <Filter instrumentIndex={instrumentIndex} />
          <Envelope instrumentIndex={instrumentIndex} />
        </div>
        <div className="flex h-48 w-80 flex-col justify-start gap-1 rounded-xl border border-slate-700/70 bg-slate-700/50 p-0.5 shadow-lg xs:hidden">
          <div className="grid h-4 grid-cols-3 border-b border-slate-500">
            <div className="flex items-center justify-start text-[10px]">
              <button
                onClick={() => {
                  setMobileTab(1);
                }}
              >
                <IoIosArrowBack className="hover:text-white" />
              </button>
              <button
                onClick={() => {
                  setMobileTab(2);
                }}
              >
                <IoIosArrowForward className="hover:text-white" />
              </button>
            </div>
          </div>
          {mobileTab === 1 && (
            <div className="grid h-full grid-cols-[2fr_4fr_3fr] items-start justify-start gap-1 rounded-xl border border-slate-700/70 bg-slate-700/50 p-0.5 shadow-lg">
              <LFO instrumentIndex={instrumentIndex} />
              <OSC instrumentIndex={instrumentIndex} />
            </div>
          )}
          {mobileTab === 2 && (
            <div className="grid grid-cols-[5fr_4fr] justify-center gap-1 rounded-xl border border-slate-700/70 bg-slate-700/50 p-0.5 shadow-lg">
              <Filter instrumentIndex={instrumentIndex} />
              <Envelope instrumentIndex={instrumentIndex} />
            </div>
          )}
        </div>
      </>
    );
  }

  return <></>;
};

export default Bassic;
