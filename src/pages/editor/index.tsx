import { useRouter } from "next/router";
import { useContext } from "react";
import PatternEditor from "~/components/PatternEditor";
import Drums from "~/components/drums/Drums";
import { AppContext, ContextType } from "~/context";
import { DrumsType } from "~/instruments/drums/drums";

const Editor = () => {
  console.log("render Editor Page");
  const { instruments, scenesState } = useContext(AppContext) as ContextType;
  const router = useRouter();

  if (!router.query.instrument || !router.query.scene) {
    router.push("/");
    return;
  }

  const instrumentIndex = +router.query.instrument;
  const instrument = instruments.current[instrumentIndex];

  const sceneIndex = +router.query.scene;
  const pattern = scenesState[sceneIndex]?.patterns[instrumentIndex];

  if (!instrument || !pattern) {
    router.push("/");
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
    <div className="flex h-full flex-col justify-between">
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
