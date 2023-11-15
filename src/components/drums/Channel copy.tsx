import type ChannelType from "~/types/ChannelType";
import ReactSlider from "react-slider";

const Channel = ({ drumChannel }: { drumChannel: ChannelType }) => {
  return (
    <div className="grid h-full w-16 grid-rows-[3rem_1fr_5rem] items-center justify-center bg-purple-600">
      <div className="mx-4 my-2 flex w-16 items-center justify-center overflow-hidden rounded-lg bg-purple-950 text-purple-300">
        {drumChannel.name}
      </div>
      {/* <ReactSlider
        ariaLabelledby="slider-label"
        className="h-full w-16 border border-slate-700/60 bg-slate-700"
        thumbClassName=" z-40 shadow cursor-pointer w-full h-6 bg-red-500 "
        orientation="vertical"
        invert
      /> */}

      {/* <ReactSlider
        className="flex h-full w-full flex-col items-center bg-blue-600"
        thumbClassName="absolute block  top-3 z-40 shadow cursor-pointer w-full h-6 bg-red-500"
        trackClassName="relative top-6 left-0 h-5/6 w-1 rounded bg-yellow-400"
        orientation="vertical"
      /> */}
      <div>vol</div>
      <button
        className="aspect-[2/3] w-full rounded border bg-purple-400"
        onClick={() => drumChannel.play()}
      />
    </div>
  );
};

export default Channel;
