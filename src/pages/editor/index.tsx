import { useRouter } from "next/router";
import { useContext } from "react";
import PatternEditor from "~/components/PatternEditor";
import { AppContext, ContextType } from "~/context";

const Editor = () => {
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

  return (
    <div>
      <PatternEditor instrument={instrument} pattern={pattern} />
    </div>
  );
};

export default Editor;
