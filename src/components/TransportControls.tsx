import { TfiLoop } from "react-icons/tfi";
import { AiFillStepBackward } from "react-icons/ai";
import { BsStopFill } from "react-icons/bs";
import { GiBrainDump } from "react-icons/gi";
import TransportButton from "./TransportButton";
import { AppContext, ContextType } from "~/context";
import { useContext, useState } from "react";
import * as Tone from "tone";
import { BsFillPlayFill } from "react-icons/bs";

const TransportControls = () => {
  const {
    loopState,
    toggleLoop,
    rewind,
    instruments,
    instrumentsState,
    scenes,
    scenesState,
  } = useContext(AppContext) as ContextType;
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }

    if (Tone.Transport.state === "paused") {
      Tone.Transport.start();
      setStarted(true);
    } else if (Tone.Transport.state === "stopped") {
      rewind();
      Tone.Transport.start();
      setStarted(true);
    } else {
      Tone.Transport.pause();
      setStarted(false);
    }
  };

  const handleStop = () => {
    Tone.Transport.stop();
    setStarted(false);
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
        state={started}
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
        }}
      />
    </div>
  );
};

export default TransportControls;
