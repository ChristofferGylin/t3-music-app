import Link from "next/link";
import { type ContextType, AppContext } from "~/context";
import { useContext } from "react";
import {
  type InstrumentStateBassicType,
  type InstrumentStateDrumsType,
} from "~/types/InstrumentStateType";
import VolumeSlider from "../UI/VolumeSlider";
import { type DrumsType } from "~/instruments/drums/drums";
import { type BassicType } from "~/instruments/drums/bassic";
type SceneComponentProps = {
  instrumentIndex: number;
  instrument: DrumsType | BassicType;
  instrumentState: InstrumentStateDrumsType | InstrumentStateBassicType;
};

const ChannelComponent = ({
  instrumentIndex,
  instrument,
  instrumentState,
}: SceneComponentProps) => {
  const { currentSceneState, setVolume } = useContext(
    AppContext,
  )! as ContextType;

  const handleVolume = (val: number) => {
    setVolume({
      val,
      instrumentIndex: instrumentIndex,
      type: "drums",
      master: true,
    });
    instrument.setMasterVolume(val);
  };

  return (
    <li key={`instrument#${instrumentIndex}`} className="h-full">
      <div className="flex h-full w-24 flex-col items-center justify-start gap-2 rounded-t border border-slate-600 bg-slate-700/60 py-2">
        <Link
          href={{
            pathname: "/studio/editor",
            query: { instrument: instrumentIndex, scene: currentSceneState },
          }}
          className="flex w-full items-center justify-center"
        >
          <div className="flex w-3/4 items-center justify-center rounded bg-green-800 text-green-300">
            {instrumentState.modelName}
          </div>
        </Link>
        <VolumeSlider
          valueState={instrumentState.masterVolume}
          callback={handleVolume}
        />
      </div>
    </li>
  );
};

export default ChannelComponent;
