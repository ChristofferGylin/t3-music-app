import { TfiLoop } from "react-icons/tfi";
import { AiFillStepBackward } from "react-icons/ai";
import { BsStopFill } from "react-icons/bs";
import TransportButton from "./TransportButton";
import { type ContextType, AppContext } from "~/context";
import { useContext } from "react";
import * as Tone from "tone";
import { BsFillPlayFill } from "react-icons/bs";
import Bpm from "./Bpm";

const TransportControls = () => {
  const { loopState, toggleLoop, rewind, playing, setPlayState } = useContext(
    AppContext,
  )! as ContextType;

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
      <Bpm />
    </div>
  );
};

export default TransportControls;
