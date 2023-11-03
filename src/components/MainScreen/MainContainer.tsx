import InnerContainer from "./InnerContainer";
import SideContainer from "./SideContainer";
import { useRef, MutableRefObject, SyntheticEvent } from "react";
import { useContext } from "react";
import { AppContext, ContextType } from "~/context";
import { AiOutlinePlusCircle } from "react-icons/ai";
import IconButton from "../IconButton";
import ChannelComponent from "./ChannelComponent";
import SceneControls from "./SceneControls";
import Link from "next/link";
import ChannelContainer from "./ChannelContainer";
import MasterComponent from "./MasterComponent";

const MainContainer = () => {
  const scrollRefScenes = useRef<HTMLDivElement | null>(null);
  const scrollRefChannels = useRef<HTMLDivElement | null>(null);
  const { scenesState, newScene, newInstrument, instrumentsState } = useContext(
    AppContext,
  ) as ContextType;

  const handleScroll = (event: SyntheticEvent, target: HTMLDivElement) => {
    if (target !== null) {
      const eventTarget = event.target as HTMLDivElement;
      target.scrollLeft = eventTarget.scrollLeft;
    }
  };

  return (
    <main className="grid h-full w-full grid-rows-main-horizontal">
      <div className="grid h-full w-full grid-cols-main-vertical overflow-auto">
        <SideContainer>
          {scenesState.map((scene, index) => {
            return <SceneControls sceneIndex={index} />;
          })}
          <li className="h-16 bg-slate-700">
            <IconButton
              state={false}
              Icon={AiOutlinePlusCircle}
              callback={newScene}
            />
          </li>
        </SideContainer>
        <div
          ref={scrollRefScenes}
          className="no-scrollbar flex h-full w-full flex-col overflow-auto"
          onScroll={(e) => {
            if (scrollRefChannels.current !== null) {
              handleScroll(e, scrollRefChannels.current);
            }
          }}
        >
          {scenesState.map((scene, index) => {
            return (
              <InnerContainer>
                {scene.patterns.map((pattern, index) => {
                  return (
                    <li
                      key={`scene#${index}-pattern#${index}`}
                      className="flex h-14 items-center justify-center"
                    >
                      <Link
                        href={{
                          pathname: "/editor",
                          query: { instrument: index, scene: index },
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
              </InnerContainer>
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
            {instrumentsState.map((instrument, index) => {
              return (
                <ChannelComponent
                  key={`instrument#${index}`}
                  instrument={instrument}
                  instrumentIndex={index}
                />
              );
            })}
            <li key={`newInstrument`} className="h-full">
              <button
                onClick={() => {
                  newInstrument("drums");
                }}
                className="group flex h-full w-24 items-center justify-center rounded-lg border-2 border-dashed border-slate-500 p-2  hover:border-slate-400"
              >
                <AiOutlinePlusCircle
                  className={`fill-slate-300 text-2xl group-hover:fill-slate-200`}
                />
              </button>
            </li>
          </ChannelContainer>
        </div>
      </div>
    </main>
  );
};

export default MainContainer;
