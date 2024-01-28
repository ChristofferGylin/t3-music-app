import { type DrumsType } from "~/instruments/drums/drums";

import { type InstrumentType } from "~/types/InstrumentType";
import Channel from "./Channel";

const Drums = ({
  instrument,
  instrumentIndex,
}: {
  instrument: InstrumentType;
  instrumentIndex: number;
}) => {
  if (instrument.modelName === "Drums") {
    const drums = instrument as DrumsType;

    return (
      <ul className="flex h-full w-fit justify-center gap-4 rounded-xl border border-slate-700/70 bg-slate-700/50 p-8 shadow-lg">
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
    );
  }

  return <></>;
};

export default Drums;
