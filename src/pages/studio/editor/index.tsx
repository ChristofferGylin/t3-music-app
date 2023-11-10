import { useRouter } from "next/router";
import { useContext } from "react";
import PatternEditor from "~/components/PatternEditor";
import Drums from "~/components/drums/Drums";
import { type ContextType, AppContext } from "~/context";

const Editor = () => {
  const { instruments, scenesState } = useContext(AppContext)! as ContextType;
  const router = useRouter();

  if (!router.query.instrument || !router.query.scene) {
    void router.push("/");
    return;
  }

  const instrumentIndex = +router.query.instrument;
  const instrument = instruments.current[instrumentIndex];

  const sceneIndex = +router.query.scene;
  const pattern = scenesState[sceneIndex]?.patterns[instrumentIndex];

  if (!instrument || !pattern) {
    void router.push("/");
    return;
  }

  let InstrumentComponent;

  switch (instrument.modelName) {
    case "Drums":
      InstrumentComponent = Drums;
      break;

    default:
      InstrumentComponent = Drums;
  }

  return (
    <div className="flex h-full flex-col justify-between pt-14">
      <PatternEditor
        instrument={instrument}
        sceneIndex={sceneIndex}
        pattern={pattern}
        instrumentIndex={instrumentIndex}
      />
      {<InstrumentComponent drummachine={instrument} />}
    </div>
  );
};

export default Editor;
