import { DrumsType } from "~/instruments/drums/drums";
import Channel from "./Channel";

const Drums = ({ drummachine }: { drummachine: DrumsType }) => {
  return (
    <div className="flex w-full justify-center gap-4 overflow-hidden rounded-xl bg-slate-800 p-12">
      {drummachine.channels.map((channel) => {
        return <Channel drumChannel={channel} />;
      })}
    </div>
  );
};

export default Drums;
