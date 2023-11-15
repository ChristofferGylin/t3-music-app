import { type DrumsType } from "~/instruments/drums/drums";
import Channel from "./Channel";

const Drums = ({ drummachine }: { drummachine: DrumsType }) => {
  return (
    <ul className="flex h-full w-fit justify-center gap-4 rounded-xl border border-slate-700/70 bg-slate-700/50 p-12 shadow-lg">
      {drummachine.channels.map((channel, index) => {
        return (
          <li key={`drumChannel#${index}`}>
            <Channel drumChannel={channel} />
          </li>
        );
      })}
    </ul>
  );
};

export default Drums;
