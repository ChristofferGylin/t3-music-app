import { type DrumsType } from "~/instruments/drums/drums";
import Channel from "./Channel";

const Drums = ({ drummachine }: { drummachine: DrumsType }) => {
  return (
    <ul className="flex w-full justify-center gap-4 overflow-hidden rounded-xl bg-slate-800 p-12">
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
