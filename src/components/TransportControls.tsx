import { TfiLoop } from "react-icons/tfi";
import { AiFillStepBackward } from "react-icons/ai";
import { BsStopFill } from "react-icons/bs";
import { GiBrainDump } from "react-icons/gi";
import TransportButton from "./TransportButton";
import { type ContextType, AppContext } from "~/context";
import { useContext } from "react";
import * as Tone from "tone";
import { BsFillPlayFill } from "react-icons/bs";

const TransportControls = () => {
  const {
    loopState,
    loop,
    toggleLoop,
    rewind,
    instruments,
    instrumentsState,
    scenes,
    scenesState,
    playing,
    setPlayState,
  } = useContext(AppContext)! as ContextType;

  const handleStart = async () => {
    if (Tone.context.state !== "running") {
      await Tone.context.resume();
    }

    if (Tone.Transport.state === "paused") {
      Tone.Transport.start();
      setPlayState(true);
    } else if (Tone.Transport.state === "stopped") {
      rewind();
      Tone.Transport.start();
      setPlayState(true);
    } else {
      Tone.Transport.pause();
      setPlayState(false);
    }
  };

  const handleStop = () => {
    Tone.Transport.stop();
    setPlayState(false);
  };

  return (
    <div className="col-start-2 flex justify-self-center">
      <TransportButton
        Icon={AiFillStepBackward}
        state={false}
        callback={rewind}
      />
      <TransportButton Icon={BsStopFill} state={false} callback={handleStop} />
      <TransportButton
        Icon={BsFillPlayFill}
        state={playing}
        callback={handleStart}
      />
      <TransportButton Icon={TfiLoop} state={loopState} callback={toggleLoop} />
      <TransportButton
        Icon={GiBrainDump}
        state={false}
        callback={() => {
          console.log("scenes:", scenes);
          console.log("scenesState:", scenesState);
          console.log("instruments:", instruments);
          console.log("instrumentsState:", instrumentsState);
          console.log("loopState:", loopState);
          console.log("loop:", loop);
        }}
      />
    </div>
  );
};

export default TransportControls;
