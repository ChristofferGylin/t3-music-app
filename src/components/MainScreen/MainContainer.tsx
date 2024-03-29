import SceneContainer from "./SceneContainer";
import SideContainerScene from "./SideContainerScene";
import { type SyntheticEvent, useRef, useContext } from "react";
import { type ContextType, AppContext } from "~/context";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";
import IconButton from "../UI/IconButton";
import ChannelComponent from "./ChannelComponent";
import SceneControls from "./SceneControls";
import Link from "next/link";
import ChannelContainer from "./ChannelContainer";
import MasterComponent from "./MasterComponent";
import NewInstrument from "./NewInstrument";

const MainContainer = () => {
  const scrollRefScenes = useRef<HTMLDivElement | null>(null);
  const scrollRefChannels = useRef<HTMLDivElement | null>(null);
  const { scenesState, newScene, instrumentsState, instruments, copyScene } =
    useContext(AppContext)! as ContextType;

  const handleScroll = (event: SyntheticEvent, target: HTMLDivElement) => {
    if (target !== null) {
      const eventTarget = event.target as HTMLDivElement;
      target.scrollLeft = eventTarget.scrollLeft;
    }
  };

  return (
    <main className="grid h-full w-full grid-rows-main-horizontal bg-slate-700 pt-11 sm:pt-12 md:pt-14">
      <div className="grid h-full w-full grid-cols-main-vertical overflow-auto">
        <SideContainerScene>
          {scenesState.map((scene, index) => {
            return (
              <SceneControls
                key={`sceneControls#${index}`}
                sceneIndex={index}
              />
            );
          })}
          <li key="newSceneButton" className="h-16 bg-slate-700">
            <IconButton
              state={false}
              Icon={AiOutlinePlusCircle}
              callback={newScene}
            />
            <IconButton
              state={false}
              Icon={MdOutlineContentCopy}
              callback={() => {
                copyScene(scenesState.length - 1);
              }}
            />
          </li>
        </SideContainerScene>
        <div
          ref={scrollRefScenes}
          className="no-scrollbar flex h-full w-full flex-col overflow-auto"
          onScroll={(e) => {
            if (scrollRefChannels.current !== null) {
              handleScroll(e, scrollRefChannels.current);
            }
          }}
        >
          {scenesState.map((scene, sceneIndex) => {
            return (
              <SceneContainer key={`sceneContainer#${sceneIndex}`}>
                {scene.patterns.map((pattern, index) => {
                  return (
                    <li
                      key={`scene#${sceneIndex}-pattern#${index}`}
                      className="flex h-14 items-center justify-center"
                    >
                      <Link
                        href={{
                          pathname: "/studio/editor",
                          query: { instrument: index, scene: sceneIndex },
                        }}
                        className="h-full"
                      >
                        <div className="h-full w-24 rounded border border-purple-800 bg-purple-600 hover:bg-purple-500"></div>
                      </Link>
                    </li>
                  );
                })}
                <li
                  key={`scene-pattern#filler`}
                  className="flex h-14 items-center justify-center"
                >
                  <div className="h-full w-24 rounded"></div>
                </li>
              </SceneContainer>
            );
          })}
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-main-vertical overflow-auto">
        <MasterComponent />

        <div
          onScroll={(e) => {
            if (scrollRefScenes.current !== null) {
              handleScroll(e, scrollRefScenes.current);
            }
          }}
          className="flex h-full w-full flex-col gap-0.5 overflow-auto bg-slate-800"
          ref={scrollRefChannels}
        >
          <ChannelContainer>
            {instrumentsState.map((instrumentState, index) => {
              const instrument = instruments.current[index];

              if (!instrument) return;

              return (
                <ChannelComponent
                  key={`instrument#${index}`}
                  instrument={instrument}
                  instrumentState={instrumentState}
                  instrumentIndex={index}
                />
              );
            })}
            <NewInstrument />
          </ChannelContainer>
        </div>
      </div>
    </main>
  );
};

export default MainContainer;
