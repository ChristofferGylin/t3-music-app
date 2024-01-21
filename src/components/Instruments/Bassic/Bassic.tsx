import { type InstrumentType } from "~/types/InstrumentType";
import Slider, { paramLabelStyle, paramItemStyle } from "./Slider";
import { FormEvent, useContext, useState } from "react";
import { AppContext, type ContextType } from "~/context";
import { type InstrumentStateBassicType } from "~/types/InstrumentStateType";
import getWaveIcon from "~/utils/instruments/getWaveIcon";

const Bassic = ({
  instrument,
  instrumentIndex,
}: {
  instrument: InstrumentType;
  instrumentIndex: number;
}) => {
  const { instrumentsState, setBassicParameter } = useContext(
    AppContext,
  )! as ContextType;
  const state = instrumentsState[instrumentIndex] as InstrumentStateBassicType;
  const [polyphony, setPolyphony] = useState(
    state.parameters.oscillator.polyphony,
  );
  if (instrument.modelName === "Bassic" && state !== undefined) {
    const WaveIcon = getWaveIcon(state.parameters.lfo.type);

    const paramGroupClasses =
      "flex flex-col gap-2 h-full w-full items-center text-center justify-center rounded-xl border border-slate-600 p-1 sm:p-2 md:p-3 lg:p-4";
    const paramGroupInnerClasses =
      "flex h-full w-full gap-1 sm:gap-2 md:gap-3 lg:gap-4 justify-center";
    const paramGroupTitleClasses =
      "w-full text-center text-xs sm:text-sm md:text-base lg:text-lg";

    const handlePolySubmit = (e: FormEvent) => {
      e.preventDefault();
      setBassicParameter(instrumentIndex, "osc-poly", polyphony);
    };

    return (
      <div className="grid grid-cols-[2fr_4fr_4fr_4fr] justify-center gap-1 rounded-xl border border-slate-700/70 bg-slate-700/50 p-2 shadow-lg sm:gap-2 sm:p-4 md:gap-3 md:p-5 lg:gap-4 lg:p-6">
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
            </div>
          </div>
        </div>
        <div className={paramGroupClasses}>
          <h2 className={paramGroupTitleClasses}>OSC</h2>
          <div className={paramGroupInnerClasses}>
            <Slider
              name="LEVEL"
              callback={(val) => {
                setBassicParameter(instrumentIndex, "lfo-freq", val);
              }}
              valueState={state.parameters.lfo.frequency}
            />
            <Slider
              name="SUB"
              callback={(val) => {
                setBassicParameter(instrumentIndex, "lfo-freq", val);
              }}
              valueState={state.parameters.lfo.frequency}
            />
            <Slider
              name="NOISE"
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
                  className="flex flex h-4 w-full w-full items-center justify-center justify-center self-start self-center justify-self-center justify-self-center overflow-hidden overflow-hidden rounded  bg-slate-600 text-center text-[10px] hover:bg-slate-600/80 sm:h-5 sm:text-xs md:h-6 md:text-sm lg:h-7 lg:text-base"
                />
              </form>
            </div>
          </div>
        </div>
        <div className={paramGroupClasses}>
          <h2 className={paramGroupTitleClasses}>FILTER</h2>
          <div className={paramGroupInnerClasses}>
            <Slider
              name="FREQ"
              callback={(val) => {
                setBassicParameter(instrumentIndex, "filter-freq", val);
              }}
              valueState={state.parameters.filter.frequency}
            />
            <Slider
              name="RES"
              callback={(val) => {
                setBassicParameter(instrumentIndex, "filter-res", val);
              }}
              valueState={state.parameters.filter.resonance}
            />
            <Slider
              name="ENV"
              callback={(val) => {
                setBassicParameter(instrumentIndex, "filter-env", val);
              }}
              valueState={state.parameters.filter.envelopeGain}
            />
            <Slider
              name="LFO"
              callback={(val) => {
                setBassicParameter(instrumentIndex, "filter-lfo", val);
              }}
              valueState={state.parameters.filter.lfoGain}
            />
          </div>
        </div>
        <div className={paramGroupClasses}>
          <h2 className={paramGroupTitleClasses}>ENVELOPE</h2>
          <div className={paramGroupInnerClasses}>
            <Slider
              name="A"
              callback={(val) => {
                setBassicParameter(instrumentIndex, "env-a", val);
              }}
              valueState={state.parameters.envelope.attack}
            />
            <Slider
              name="D"
              callback={(val) => {
                setBassicParameter(instrumentIndex, "env-d", val);
              }}
              valueState={state.parameters.envelope.decay}
            />
            <Slider
              name="S"
              callback={(val) => {
                setBassicParameter(instrumentIndex, "env-s", val);
              }}
              valueState={state.parameters.envelope.sustain}
            />
            <Slider
              name="R"
              callback={(val) => {
                setBassicParameter(instrumentIndex, "env-r", val);
              }}
              valueState={state.parameters.envelope.release}
            />
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default Bassic;
