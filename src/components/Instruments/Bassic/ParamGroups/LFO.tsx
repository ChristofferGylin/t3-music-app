import { useContext } from "react";
import {
  paramGroupClasses,
  paramGroupInnerClasses,
  paramGroupTitleClasses,
} from "../Bassic";
import Slider, { paramItemStyle, paramLabelStyle } from "../Slider";
import { AppContext, type ContextType } from "~/context";
import getWaveIcon from "~/utils/instruments/getWaveIcon";
import { type InstrumentStateBassicType } from "~/types/InstrumentStateType";

const LFO = ({ instrumentIndex }: { instrumentIndex: number }) => {
  const { instrumentsState, setBassicParameter } = useContext(
    AppContext,
  )! as ContextType;
  const state = instrumentsState[instrumentIndex] as InstrumentStateBassicType;
  const WaveIcon = getWaveIcon(state.parameters.lfo.type);

  return (
    <div className={paramGroupClasses}>
      <h2 className={paramGroupTitleClasses}>LFO</h2>
      <div className={paramGroupInnerClasses}>
        <Slider
          name="RATE"
          callback={(val) => {
            setBassicParameter(instrumentIndex, "lfo-freq", val);
          }}
          valueState={state.parameters.lfo.frequency}
        />
        <div className={paramItemStyle}>
          <div className={paramLabelStyle}>WAVE</div>
          <button
            onClick={() => {
              setBassicParameter(instrumentIndex, "lfo-type", 0);
            }}
            className="flex w-full items-center justify-center self-start justify-self-center overflow-hidden rounded bg-slate-600 text-xl hover:bg-slate-600/80"
          >
            <WaveIcon className="w-full text-sm sm:text-base md:h-5 md:text-lg lg:h-6 lg:text-xl" />
          </button>
          <div className={paramLabelStyle}>RETRIG</div>
          <button
            onClick={() => {
              setBassicParameter(instrumentIndex, "lfo-retrig", 0);
            }}
            className="flex h-4 w-full items-center justify-center  self-center justify-self-center overflow-hidden rounded  bg-slate-600 text-center text-[10px] hover:bg-slate-600/80 sm:h-5 sm:text-xs md:h-6 md:text-sm lg:h-7 lg:text-base"
          >
            {state.parameters.lfo.retrig ? (
              <p className="text-green-500">ON</p>
            ) : (
              <p>OFF</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LFO;
