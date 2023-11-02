import { useContext } from "react";
import { AppContext, ContextType } from "~/context";
import SceneComponent from "./SceneComponent";
import { AiOutlinePlusCircle } from "react-icons/ai";
import IconButton from "./IconButton";

const ScenesContainer = () => {
  const { scenesState, newScene } = useContext(AppContext) as ContextType;
  return (
    <div className="flex h-2/3 w-screen flex-col items-start justify-start gap-0.5 p-2 pb-96">
      <ul className="flex flex-col">
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

      <IconButton
        state={false}
        Icon={AiOutlinePlusCircle}
        callback={newScene}
      />
    </div>
  );
};

export default ScenesContainer;
