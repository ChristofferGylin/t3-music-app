import { useContext, useState } from "react";
import {
  paramGroupClasses,
  paramGroupInnerClasses,
  paramGroupTitleClasses,
} from "../Bassic";
import Slider, { paramItemStyle, paramLabelStyle } from "../Slider";
import { AppContext, type ContextType } from "~/context";
import { type InstrumentStateBassicType } from "~/types/InstrumentStateType";
import getWaveIcon from "~/utils/instruments/getWaveIcon";

const OSC = ({ instrumentIndex }: { instrumentIndex: number }) => {
  const { instrumentsState, setBassicParameter } = useContext(
    AppContext,
  )! as ContextType;

  const state = instrumentsState[instrumentIndex] as InstrumentStateBassicType;

  const WaveIcon = getWaveIcon(state.parameters.oscillator.type);

  const [polyphony, setPolyphony] = useState(
    state.parameters.oscillator.polyphony,
  );

  return (
    <div className={paramGroupClasses}>
      <h2 className={paramGroupTitleClasses}>OSC</h2>
      <div className={paramGroupInnerClasses}>
        <Slider
          name="LEVEL"
          callback={(val) => {
            setBassicParameter(instrumentIndex, "osc-gain", val);
          }}
          valueState={state.parameters.oscillator.gain}
        />
        <Slider
          name="SUB"
          callback={(val) => {
            setBassicParameter(instrumentIndex, "osc-sub", val);
          }}
          valueState={state.parameters.oscillator.sub}
        />
        <Slider
          name="NOISE"
          callback={(val) => {
            setBassicParameter(instrumentIndex, "osc-noise", val);
          }}
          valueState={state.parameters.oscillator.noise}
        />
        <div className={`${paramItemStyle}`}>
          <div className={paramLabelStyle}>WAVE</div>

          <button
            onClick={() => {
              setBassicParameter(instrumentIndex, "osc-type", 0);
            }}
            className="flex w-full items-center justify-center self-start justify-self-center overflow-hidden rounded bg-slate-600 text-xl hover:bg-slate-600/80"
          >
            <WaveIcon className="w-full text-sm sm:text-base md:h-5 md:text-lg lg:h-6 lg:text-xl" />
          </button>
          <div className={paramLabelStyle}>POLY</div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setBassicParameter(instrumentIndex, "osc-poly", polyphony);
            }}
          >
            <input
              type="number"
              min={1}
              max={32}
              value={polyphony}
              onChange={(e) => {
                setPolyphony(Number(e.target.value));
              }}
              onBlur={() => {
                setBassicParameter(instrumentIndex, "osc-poly", polyphony);
              }}
              className="flex h-4 w-full items-center justify-center self-center justify-self-center overflow-hidden rounded  bg-slate-600 text-center text-[10px] hover:bg-slate-600/80 sm:h-5 sm:text-xs md:h-6 md:text-sm lg:h-7 lg:text-base"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default OSC;
