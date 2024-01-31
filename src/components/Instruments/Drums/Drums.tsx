import { type DrumsType } from "~/instruments/drums/drums";
import { type InstrumentType } from "~/types/InstrumentType";
import Channel from "./Channel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { VscChromeMinimize, VscChromeMaximize } from "react-icons/vsc";
import { useState } from "react";

const Drums = ({
  instrument,
  instrumentIndex,
}: {
  instrument: InstrumentType;
  instrumentIndex: number;
}) => {
  const [mobileTab, setMobileTab] = useState(1);
  if (instrument.modelName === "Drums") {
    const drums = instrument as DrumsType;

    return (
      <div className="grid h-full w-full grid-rows-[1.5rem_auto]">
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
          <ul className="flex justify-center gap-4 rounded-xl border border-slate-700/70 bg-slate-700/50 p-2 shadow-lg xs:p-3 sm:p-4 md:p-5 lg:p-6">
            {drums.channels.map((channel, index) => {
              return (
                <li key={`drumChannel#${index}`}>
                  <Channel
                    drumChannel={channel}
                    channelIndex={index}
                    instrumentIndex={instrumentIndex}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return <></>;
};

export default Drums;
