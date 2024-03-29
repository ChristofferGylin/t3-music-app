import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PatternEditor from "~/components/PatternEditor/PatternEditor";
import Drums from "~/components/Instruments/Drums/Drums";
import { type ContextType, AppContext } from "~/context";
import { type BassicType } from "~/instruments/bassic/bassic";
import { type DrumsType } from "~/instruments/drums/drums";
import {
  type InstrumentStateBassicType,
  type InstrumentStateDrumsType,
} from "~/types/InstrumentStateType";
import { type PatternType } from "~/types/Pattern";
import Bassic from "~/components/Instruments/Bassic/Bassic";

const Editor = () => {
  const { instruments, scenesState, instrumentsState } = useContext(
    AppContext,
  )! as ContextType;
  const router = useRouter();
  const [instrumentIndex, setInstrumentIndex] = useState<number | undefined>(
    undefined,
  );
  const [sceneIndex, setSceneIndex] = useState<number | undefined>(undefined);
  const [instrument, setInstrument] = useState<
    DrumsType | BassicType | undefined
  >(undefined);
  const [instrumentState, setInstrumentState] = useState<
    InstrumentStateDrumsType | InstrumentStateBassicType | undefined
  >(undefined);
  const [pattern, setPattern] = useState<PatternType | undefined>(undefined);

  useEffect(() => {
    if (router && typeof window !== undefined) {
      if (
        !router?.query?.instrument ||
        !router?.query?.scene ||
        typeof router.query.instrument !== "string" ||
        typeof router.query.scene !== "string"
      ) {
        void router.push("/");
      } else {
        const instInd = +router.query.instrument;
        const scnInd = +router.query.scene;

        if (typeof instInd !== "number" || typeof scnInd !== "number") {
          void router.push("/");
        } else {
          setInstrument(instruments.current[instInd]);
          setPattern(scenesState[scnInd]?.patterns[instInd]);
          setInstrumentIndex(instInd);
          setInstrumentState(instrumentsState[instInd]);
          setSceneIndex(scnInd);
        }
      }
    }
  }, [
    router,
    setInstrument,
    setPattern,
    instruments,
    scenesState,
    instrumentsState,
  ]);

  if (
    instrument === undefined ||
    instrumentState === undefined ||
    pattern === undefined ||
    sceneIndex === undefined ||
    instrumentIndex === undefined
  ) {
    return <></>;
  }

  let InstrumentComponent;

  switch (instrument.modelName) {
    case "Drums":
      InstrumentComponent = Drums;
      break;
    case "Bassic":
      InstrumentComponent = Bassic;
      break;

    default:
      InstrumentComponent = Drums;
  }

  return (
    <div className="grid h-full w-full grid-rows-main-horizontal bg-slate-700 pt-11 sm:pt-12 md:pt-14">
      <div className="h-full w-full overflow-auto">
        <PatternEditor
          instrument={instrument}
          sceneIndex={sceneIndex}
          pattern={pattern}
          instrumentIndex={instrumentIndex}
        />
      </div>
      <div className="flex items-start justify-center overflow-auto bg-slate-800">
        {
          <InstrumentComponent
            instrument={instrument}
            instrumentIndex={instrumentIndex}
          />
        }
      </div>
    </div>
  );
};

export default Editor;
