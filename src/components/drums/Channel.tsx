import type ChannelType from "~/types/ChannelType";

const Channel = ({ drumChannel }: { drumChannel: ChannelType }) => {
  return (
    <div className="flex w-16 flex-col items-center">
      <div className="mx-4 my-2 flex w-16 items-center justify-center overflow-hidden rounded-lg bg-purple-950 text-purple-300">
        {drumChannel.name}
      </div>
      <button
        className="aspect-[2/3] w-full rounded bg-purple-400"
        onClick={() => drumChannel.play()}
      />
    </div>
  );
};

export default Channel;
