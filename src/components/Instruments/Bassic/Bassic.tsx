import { type InstrumentType } from "~/types/InstrumentType";
import { useContext, useState } from "react";
import { AppContext, type ContextType } from "~/context";
import { type InstrumentStateBassicType } from "~/types/InstrumentStateType";
import LFO from "./ParamGroups/LFO";
import OSC from "./ParamGroups/OSC";
import Filter from "./ParamGroups/Filter";
import Envelope from "./ParamGroups/Envelope";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { VscChromeMinimize, VscChromeMaximize } from "react-icons/vsc";

export const paramGroupClasses =
  "flex flex-col gap-2 h-full items-center text-center justify-center rounded-xl border border-slate-600 p-1 sm:p-2 md:p-2 lg:p-3";
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
      <div className="grid h-full w-full grid-rows-[1.5rem_auto] ">
        <div className="grid h-full grid-cols-3  bg-slate-600/20 px-1">
          <div className="flex h-full items-center justify-start text-[10px] shadow">
            <button
              onClick={() => {
                setMobileTab(1);
              }}
            >
              <IoIosArrowBack className="hover:text-white" />
            </button>
            <div className="flex w-16 items-center justify-center rounded bg-slate-300/20 text-slate-200 shadow-inner">
              Page {mobileTab} of 2
            </div>
            <button
              onClick={() => {
                setMobileTab(2);
              }}
            >
              <IoIosArrowForward className="hover:text-white" />
            </button>
          </div>
          <div className="flex h-full items-center justify-center text-[10px] shadow">
            <button
              onClick={() => {
                setMobileTab(1);
              }}
            >
              <IoIosArrowBack className="hover:text-white" />
            </button>
            <div className="flex w-20 items-center justify-center rounded bg-slate-300/20 text-slate-200 shadow-inner">
              Patch name
            </div>
            <button
              onClick={() => {
                setMobileTab(2);
              }}
            >
              <IoIosArrowForward className="hover:text-white" />
            </button>
          </div>
          <div className="flex h-full items-center justify-end gap-1 text-sm shadow">
            <button
              onClick={() => {
                setMobileTab(1);
              }}
            >
              <VscChromeMinimize className="text-slate-50 hover:bg-slate-300/20 hover:text-white" />
            </button>
            <button
              onClick={() => {
                setMobileTab(2);
              }}
            >
              <VscChromeMaximize className="text-slate-50 hover:bg-slate-300/20 hover:text-white" />
            </button>
          </div>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <div className="min-w-80 min-h-44 hidden grid-cols-[2fr_4fr_5fr_4fr] justify-center gap-1 rounded-xl border border-slate-700/70 bg-slate-700/50 p-0.5 shadow-lg xs:grid xs:p-1 sm:gap-2 sm:p-1 md:gap-2 md:p-2 lg:gap-3 lg:p-3">
            <LFO instrumentIndex={instrumentIndex} />
            <OSC instrumentIndex={instrumentIndex} />
            <Filter instrumentIndex={instrumentIndex} />
            <Envelope instrumentIndex={instrumentIndex} />
          </div>
          <div className="flex w-11/12 min-w-[348px] flex-col justify-start gap-1 rounded-xl border border-slate-700/70 bg-slate-700/50 shadow-lg xs:hidden">
            {mobileTab === 1 && (
              <div className="flex h-full items-center justify-start gap-2 rounded-xl border border-slate-700/70 bg-slate-700/50 p-1 shadow-lg">
                <LFO instrumentIndex={instrumentIndex} />
                <OSC instrumentIndex={instrumentIndex} />
              </div>
            )}
            {mobileTab === 2 && (
              <div className="flex items-center justify-start gap-1 rounded-xl border border-slate-700/70 bg-slate-700/50 p-1 shadow-lg">
                <Filter instrumentIndex={instrumentIndex} />
                <Envelope instrumentIndex={instrumentIndex} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default Bassic;
