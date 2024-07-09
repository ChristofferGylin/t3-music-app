import { useContext } from "react";
import VolumeSlider from "../UI/VolumeSlider";
import { type ContextType, AppContext } from "~/context";
import signalToDb from "~/utils/math/signalToDb";
import TurnableKnob from "../UI/TurnableKnob/TurnableKnob";
import handlePan from "~/utils/handlePan";

const MasterComponent = () => {
  const { masterChannel, setMasterVolume, project } = useContext(
    AppContext,
  )! as ContextType;

  const handleVolume = (val: number) => {
    const dbValue = signalToDb(val);

    if (!masterChannel.current) return;

    masterChannel.current.masterVolume.volume.value = dbValue;
    masterChannel.current.setMasterVolume(val);
    setMasterVolume(val);
  };

  return (
    <div className="prevent-select flex h-full w-24 flex-col bg-slate-800 pt-1">
      <div key={`instrument#master`} className="h-full">
        <div className="flex h-full w-24 flex-col items-center justify-start gap-2 rounded-t border border-slate-600 bg-slate-700/60 py-2">
          <div className="flex w-full items-center justify-center">
            <div className="flex w-3/4 items-center justify-center rounded bg-green-800 text-green-300">
              Master
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-xs">
            PAN
            <TurnableKnob
              width="w-10"
              range="PlusMinus"
              callback={(value) => {
                if (!masterChannel.current) return;
                handlePan(value, masterChannel.current.pan);
              }}
              value={0.5}
            />
          </div>
          <div className="h-full w-8/12">
            <VolumeSlider
              valueState={project.masterVolume}
              callback={handleVolume}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterComponent;
