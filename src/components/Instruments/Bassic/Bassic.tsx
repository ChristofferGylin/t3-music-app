import { type InstrumentType } from "~/types/InstrumentType";
import Slider from "./Slider";
import { useContext } from "react";
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
  if (instrument.modelName === "Bassic" && state !== undefined) {
    const WaveIcon = getWaveIcon(state.parameters.lfo.type);

    return (
      <div className="flex h-full w-fit justify-center gap-4 rounded-xl border border-slate-700/70 bg-slate-700/50 p-8 shadow-lg">
        <div className="flex h-full flex-col items-center gap-4 rounded-xl border border-slate-600 p-4">
          <h2 className="text-lg">LFO</h2>
          <div className="flex h-full gap-4">
            <Slider
              name="RATE"
              callback={(val) => {
                setBassicParameter(instrumentIndex, "lfo-freq", val);
              }}
              valueState={state.parameters.lfo.frequency}
            />
            <div className="grid h-full w-12 grid-rows-[1.5rem_1fr] gap-2">
              <div className="flex h-6 w-full items-center justify-center self-center justify-self-center overflow-hidden rounded bg-purple-950 text-sm text-purple-300">
                WAVE
              </div>
              <button
                onClick={() => {
                  setBassicParameter(instrumentIndex, "lfo-type", 0);
                }}
                className="flex h-6 w-full items-center justify-center self-start justify-self-center overflow-hidden rounded bg-slate-600 text-xl hover:bg-slate-600/80"
              >
                <WaveIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col items-center gap-4 rounded-xl border border-slate-600 p-4">
          <h2 className="text-lg">FILTER</h2>
          <div className="flex h-full gap-4">
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
        <div className="flex h-full flex-col items-center gap-4 rounded-xl border border-slate-600 p-4">
          <h2 className="text-lg">ENVELOPE</h2>
          <div className="flex h-full gap-4">
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
