import Link from "next/link";
import { AppContext, ContextType } from "~/context";
import { useContext } from "react";
import { InstrumentStateDrumsType } from "~/types/InstrumentStateType";
type SceneComponentProps = {
  instrumentIndex: number;
  instrument: InstrumentStateDrumsType;
};

const MasterComponent = () => {
  const {} = useContext(AppContext) as ContextType;

  return (
    <div className="flex h-full w-24 flex-col bg-slate-800 pt-1">
      <div key={`instrument#master`} className="h-full">
        <div className="flex h-full w-24 flex-col items-center justify-start rounded-t border border-slate-600 bg-slate-700/60 py-2">
          <div className="flex w-full items-center justify-center">
            <div className="flex w-3/4 items-center justify-center rounded bg-green-800 text-green-300">
              Master
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterComponent;
