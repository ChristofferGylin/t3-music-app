import { useContext } from "react";
import VolumeSlider from "../UI/VolumeSlider";
import { type ContextType, AppContext } from "~/context";
import signalToDb from "~/utils/math/signalToDb";
import TurnableKnob from "../UI/TurnableKnob/TurnableKnob";
import { scaleValue } from "~/utils/math/scaleValue";

const MasterComponent = () => {
  const { masterOut, masterPan, setMasterVolume, project } = useContext(
    AppContext,
  )! as ContextType;

  const handleVolume = (val: number) => {
    const dbValue = signalToDb(val);

    if (!masterOut.current) return;

    masterOut.current.volume.value = dbValue;
    setMasterVolume(val);
  };

  const handlePan = (value: number) => {
    if (!masterPan.current) return;
    const scaledValue = scaleValue({
      value,
      fromScale: { start: 0, end: 1 },
      toScale: { start: -1, end: 1 },
    });
    masterPan.current.pan.value = scaledValue;
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
              callback={handlePan}
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
