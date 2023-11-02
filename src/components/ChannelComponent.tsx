import * as Tone from "tone";
import Link from "next/link";
import { Scene } from "~/types/Scene";
import IconButton from "./IconButton";
import { BsFillPlayFill } from "react-icons/bs";
import { AppContext, ContextType } from "~/context";
import { useContext } from "react";
import { DrumsType } from "~/instruments/drums/drums";
import { InstrumentStateDrumsType } from "~/types/InstrumentStateType";
type SceneComponentProps = {
  instrumentIndex: number;
  instrument: InstrumentStateDrumsType;
};

const ChannelComponent = ({
  instrumentIndex,
  instrument,
}: SceneComponentProps) => {
  const { setSceneAndPlay, toggleLoop, rewind, currentSceneState } = useContext(
    AppContext,
  ) as ContextType;

  return (
    <li
      key={`instrument#${instrumentIndex}`}
      className="flex h-full w-24 flex-col border border-slate-800 bg-slate-700 p-2 hover:bg-slate-500"
    >
      <Link
        href={{
          pathname: "/editor",
          query: { instrument: instrumentIndex, scene: currentSceneState },
        }}
      >
        <div>
          <div>{instrument.modelName}</div>
          <div className="aspect-video w-full bg-green-300"></div>
        </div>
        <div className="h-full w-full"></div>
      </Link>
    </li>
  );
};

export default ChannelComponent;
