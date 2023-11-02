import ChannelsContainer from "~/components/ChannelsContainer";
import ScenesContainer from "~/components/ScenesContainer";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col justify-between overflow-auto">
      <ScenesContainer />
      <ChannelsContainer />
    </div>
  );
}
