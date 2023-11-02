import Link from "next/link";
import { AppContext, ContextType } from "~/context";
import { useContext } from "react";
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
    <li key={`instrument#${instrumentIndex}`} className="h-full">
      <div className="flex h-full w-24 flex-col items-center justify-start rounded-t border border-slate-600 bg-slate-700/60 py-2">
        <Link
          href={{
            pathname: "/editor",
            query: { instrument: instrumentIndex, scene: currentSceneState },
          }}
          className="flex w-full items-center justify-center"
        >
          <div className="flex w-3/4 items-center justify-center rounded bg-green-800 text-green-300">
            {instrument.modelName}
          </div>
        </Link>
      </div>
    </li>
  );
};

export default ChannelComponent;
