import { useContext } from "react";
import {
  paramGroupClasses,
  paramGroupInnerClasses,
  paramGroupTitleClasses,
} from "../Bassic";
import Slider from "../Slider";
import { AppContext, type ContextType } from "~/context";
import { type InstrumentStateBassicType } from "~/types/InstrumentStateType";

const Filter = ({ instrumentIndex }: { instrumentIndex: number }) => {
  const { instrumentsState, setBassicParameter } = useContext(
    AppContext,
  )! as ContextType;

  const state = instrumentsState[instrumentIndex] as InstrumentStateBassicType;

  return (
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
        <Slider
          name="KYBD"
          callback={(val) => {
            setBassicParameter(instrumentIndex, "filter-kybd", val);
          }}
          valueState={state.parameters.filter.kybd}
        />
      </div>
    </div>
  );
};

export default Filter;
