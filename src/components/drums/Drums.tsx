import { type DrumsType } from "~/instruments/drums/drums";
import Channel from "./Channel";
import { InstrumentStateDrumsType } from "~/types/InstrumentStateType";

const Drums = ({
  drummachine,
  instrumentIndex,
}: {
  drummachine: DrumsType;
  instrumentIndex: number;
}) => {
  return (
    <ul className="flex h-full w-fit justify-center gap-4 rounded-xl border border-slate-700/70 bg-slate-700/50 p-8 shadow-lg">
      {drummachine.channels.map((channel, index) => {
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
};

export default Drums;
