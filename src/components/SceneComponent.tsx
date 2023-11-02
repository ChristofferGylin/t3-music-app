import * as Tone from "tone";
import Link from "next/link";
import { Scene } from "~/types/Scene";
import IconButton from "./IconButton";
import { BsFillPlayFill } from "react-icons/bs";
import { AppContext, ContextType } from "~/context";
import { useContext } from "react";
type SceneComponentProps = {
  sceneIndex: number;
  scene: Scene;
};

const SceneComponent = ({ sceneIndex, scene }: SceneComponentProps) => {
  const { setSceneAndPlay, toggleLoop, rewind, currentSceneState } = useContext(
    AppContext,
  ) as ContextType;

  return (
    <li key={`scene#${sceneIndex}`} className="flex h-32 bg-slate-500 p-2">
      <div className="sticky left-0 top-0 flex aspect-video w-24 flex-col bg-slate-500">
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
      <ul className="flex w-full gap-0.5">
        {scene.patterns.map((pattern, index) => {
          return (
            <li key={`scene#${sceneIndex}-pattern#${index}`}>
              <Link
                href={{
                  pathname: "/editor",
                  query: { instrument: index, scene: sceneIndex },
                }}
              >
                <div className="aspect-video w-24 rounded border border-purple-800 bg-purple-600 hover:bg-purple-500"></div>
              </Link>
            </li>
          );
        })}
        <div className="w-24"></div>
      </ul>
    </li>
  );
};

export default SceneComponent;
