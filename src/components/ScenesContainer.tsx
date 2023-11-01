import { useContext } from "react";
import { AppContext, ContextType } from "~/context";
import SceneComponent from "./SceneComponent";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { PiPianoKeysFill } from "react-icons/pi";
import TransportButton from "./TransportButton";
import IconButton from "./IconButton";

const ScenesContainer = () => {
  const { scenesState, newScene, newInstrument } = useContext(
    AppContext,
  ) as ContextType;
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

      <IconButton
        state={false}
        Icon={AiOutlinePlusCircle}
        callback={newScene}
      />
      <IconButton
        state={false}
        Icon={PiPianoKeysFill}
        callback={() => {
          newInstrument("drums");
        }}
      />
    </div>
  );
};

export default ScenesContainer;
