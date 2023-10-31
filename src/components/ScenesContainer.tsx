import { useContext } from "react";
import { AppContext, ContextType } from "~/context";
import SceneComponent from "./SceneComponent";

const ScenesContainer = () => {
  const { scenesState } = useContext(AppContext) as ContextType;
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-4 p-2">
      <ul>
        {scenesState.map((scene, index) => {
          return (
            <SceneComponent
              key={`scene#${index}`}
              scene={scene}
              sceneIndex={index}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ScenesContainer;
