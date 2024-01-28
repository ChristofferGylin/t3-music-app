import { useContext } from "react";
import {
  paramGroupClasses,
  paramGroupInnerClasses,
  paramGroupTitleClasses,
} from "../Bassic";
import Slider from "../Slider";
import { AppContext, type ContextType } from "~/context";
import { type InstrumentStateBassicType } from "~/types/InstrumentStateType";

const Envelope = ({ instrumentIndex }: { instrumentIndex: number }) => {
  const { instrumentsState, setBassicParameter } = useContext(
    AppContext,
  )! as ContextType;

  const state = instrumentsState[instrumentIndex] as InstrumentStateBassicType;

  return (
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
  );
};

export default Envelope;
