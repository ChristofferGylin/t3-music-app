import { type DrumsType } from "~/instruments/drums/drums";
import { type InstrumentType } from "~/types/InstrumentType";
import Channel from "./Channel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { VscChromeMinimize, VscChromeMaximize } from "react-icons/vsc";
import { useState } from "react";
import type ChannelType from "~/types/ChannelType";

const Drums = ({
  instrument,
  instrumentIndex,
}: {
  instrument: InstrumentType;
  instrumentIndex: number;
}) => {
  const [mobileTab, setMobileTab] = useState(0);
  const [itemsPerTab] = useState(6);
  const [mobileTabMax, setMobileTabMax] = useState(1);

  const drums = instrument as DrumsType;

  const renderMobileTab = () => {
    if (!mobileTabMax) {
      setMobileTabMax(Math.ceil(drums.channels.length / itemsPerTab) - 1);
    }

    const startIndex = mobileTab * itemsPerTab;
    let endIndex = startIndex + itemsPerTab;
    if (endIndex > drums.channels.length) endIndex = drums.channels.length;
    const channels = [];

    for (let i = startIndex; i < endIndex; i++) {
      const drumChannel = drums.channels[i]! as ChannelType;

      channels.push(
        <li key={`drumChannel#${i}`}>
          <Channel
            drumChannel={drumChannel}
            channelIndex={i}
            instrumentIndex={instrumentIndex}
          />
        </li>,
      );
    }

    return channels;
  };

  return (
    <div className="grid h-full w-full grid-rows-[1.5rem_auto]">
      <div className="grid h-full grid-cols-3  bg-slate-600/20 px-1">
        <div className="flex h-full items-center justify-start text-[10px] shadow">
          <button
            onClick={() => {
              setMobileTab((oldNum) => {
                const newNum = oldNum - 1;

                if (newNum < 0) {
                  return 0;
                } else {
                  return newNum;
                }
              });
            }}
          >
            <IoIosArrowBack className="hover:text-white" />
          </button>
          <div className="flex w-16 items-center justify-center rounded bg-slate-300/20 text-slate-200 shadow-inner">
            Page {mobileTab + 1} of {mobileTabMax + 1}
          </div>
          <button
            onClick={() => {
              setMobileTab((oldNum) => {
                const newNum = oldNum + 1;

                if (newNum > mobileTabMax) {
                  return mobileTabMax - 1;
                } else {
                  return newNum;
                }
              });
            }}
          >
            <IoIosArrowForward className="hover:text-white" />
          </button>
        </div>
        <div className="flex h-full items-center justify-center text-[10px] shadow">
          <button
            onClick={() => {
              console.log("previous patch");
            }}
          >
            <IoIosArrowBack className="hover:text-white" />
          </button>
          <div className="flex w-20 items-center justify-center rounded bg-slate-300/20 text-slate-200 shadow-inner">
            Patch name
          </div>
          <button
            onClick={() => {
              console.log("next patch");
            }}
          >
            <IoIosArrowForward className="hover:text-white" />
          </button>
        </div>
        <div className="flex h-full items-center justify-end gap-1 text-sm shadow">
          <button
            onClick={() => {
              console.log("minimize");
            }}
          >
            <VscChromeMinimize className="text-slate-50 hover:bg-slate-300/20 hover:text-white" />
          </button>
          <button
            onClick={() => {
              console.log("maximize");
            }}
          >
            <VscChromeMaximize className="text-slate-50 hover:bg-slate-300/20 hover:text-white" />
          </button>
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <ul className="hidden justify-center gap-4 rounded-xl border border-slate-700/70 bg-slate-700/50 p-2 shadow-lg xs:flex xs:p-3 sm:p-4 md:p-5 lg:p-6">
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
        <ul className="flex justify-center gap-4 rounded-xl border border-slate-700/70 bg-slate-700/50 p-2 shadow-lg xs:hidden xs:p-3 sm:p-4 md:p-5 lg:p-6">
          {renderMobileTab()}
        </ul>
      </div>
    </div>
  );
};

export default Drums;
