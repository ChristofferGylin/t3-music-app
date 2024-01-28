import {
  type InstrumentStateBassicType,
  type InstrumentStateDrumsType,
} from "~/types/InstrumentStateType";

const deepCopyInstrumentsState = (
  oldState: (InstrumentStateBassicType | InstrumentStateDrumsType)[],
): (InstrumentStateBassicType | InstrumentStateDrumsType)[] => {
  const newState = oldState.map((instrument) => {
    let currentInstrument;
    switch (instrument.modelName) {
      case "Drums":
        currentInstrument = instrument as InstrumentStateDrumsType;
        return {
          ...currentInstrument,
          channelVolumes: [...currentInstrument.channelVolumes],
        } as InstrumentStateDrumsType;

      case "Bassic":
        currentInstrument = instrument as InstrumentStateBassicType;
        return {
          ...currentInstrument,
          parameters: {
            envelope: {
              ...currentInstrument.parameters.envelope,
            },
            filterEnvelope: {
              ...currentInstrument.parameters.filterEnvelope,
            },
            oscillator: {
              ...currentInstrument.parameters.oscillator,
            },
            filter: {
              ...currentInstrument.parameters.filter,
            },
            lfo: {
              ...currentInstrument.parameters.lfo,
            },
          },
        } as InstrumentStateBassicType;

      default:
        return { ...instrument };
    }
  });

  return newState;
};

export default deepCopyInstrumentsState;
