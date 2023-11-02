import * as Tone from "tone";
import Link from "next/link";
import { Scene } from "~/types/Scene";
import IconButton from "../IconButton";
import { BsFillPlayFill } from "react-icons/bs";
import { AppContext, ContextType } from "~/context";
import { useContext } from "react";

type SceneComponentProps = {
  sceneIndex: number;
};

const SceneControls = ({ sceneIndex }: SceneComponentProps) => {
  const { setSceneAndPlay, currentSceneState } = useContext(
    AppContext,
  ) as ContextType;
  return (
    <li
      key={`scene#${sceneIndex}`}
      className="flex h-16 bg-slate-700/60 odd:bg-slate-700/80"
    >
      <div className="sticky left-0 top-0 flex h-full w-24 flex-col">
        <div className="flex justify-between">
          <IconButton
            state={
              currentSceneState === sceneIndex &&
              Tone.Transport.state === "started"
            }
            Icon={BsFillPlayFill}
            callback={() => {
              setSceneAndPlay(sceneIndex);
            }}
          />
        </div>
      </div>
    </li>
  );
};

export default SceneControls;