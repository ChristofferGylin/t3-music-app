import { useContext } from "react";
import { AppContext, ContextType } from "~/context";
import SceneComponent from "./SceneComponent";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { PiPianoKeysFill } from "react-icons/pi";
import IconButton from "./IconButton";
import ChannelComponent from "./ChannelComponent";

const ChannelsContainer = () => {
  const { newInstrument, instrumentsState } = useContext(
    AppContext,
  ) as ContextType;

  return (
    <div className="sticky bottom-0 flex h-96 items-center justify-start gap-0.5 bg-slate-800 p-2">
      <ul className="flex h-full items-center justify-start gap-0.5">
        <li className="sticky bottom-0 left-0 flex h-full w-24 flex-col border border-slate-800 bg-slate-700 p-2 hover:bg-slate-500">
          <div>
            <div>Master</div>
            <div className="aspect-video w-full"></div>
          </div>
          <div className="h-48 w-full"></div>
        </li>
        {instrumentsState.map((instrument, index) => {
          return (
            <ChannelComponent
              key={`instrument#${index}`}
              instrument={instrument}
              instrumentIndex={index}
            />
          );
        })}
        <button
          onClick={() => {
            newInstrument("drums");
          }}
          className="group flex h-full w-24 items-center justify-center rounded-lg border-2 border-dashed border-slate-500 p-2  hover:border-slate-400"
        >
          <AiOutlinePlusCircle
            className={`fill-slate-300 text-2xl group-hover:fill-slate-200`}
          />
        </button>
      </ul>
    </div>
  );
};

export default ChannelsContainer;
