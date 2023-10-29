import { useContext, useState } from "react";
import * as Tone from "tone";
import drums from "~/instruments/drums/drums";
import { Time } from "tone/build/esm/core/type/Units";
import { AppContext, ContextType } from "~/context";
import TransportControls from "./TransportControls";

const Header = () => {
  const [loaded, setLoaded] = useState(false);
  //const [pattern, setPattern] = useState(createPatternDrums());
  const { instruments, scenes, loop, currentScene, nextScene, newScene } =
    useContext(AppContext) as ContextType;

  const repeatFunction = (time: Time) => {
    if (instruments.current !== null && instruments.current !== undefined) {
      for (let i = 0; i < instruments.current.length; i++) {
        let step = instruments.current[i]?.currentStep;

        if (step === undefined) return;

        if (instruments.current[i]?.type === "drums") {
          const start =
            scenes.current[currentScene.current]?.patterns[i]?.pattern[step]
              ?.start;

          if (start === undefined) return;

          for (let j = 0; j < start.length; j++) {
            const playIndex = start[j];

            if (playIndex === undefined || typeof playIndex !== "number")
              return;

            instruments.current[i]?.channels[playIndex]?.play(time);
          }
        }

        if (
          instruments.current[i] === undefined ||
          instruments.current[i] === null
        )
          return;

        const pattern =
          scenes.current[currentScene.current]?.patterns[i]?.pattern;
        const instrumentsArray = scenes.current[currentScene.current]?.patterns;

        if (
          pattern === undefined ||
          pattern === null ||
          instrumentsArray === undefined ||
          instrumentsArray === null
        )
          return;

        if (step >= pattern.length - 1) {
          if (instruments.current === null) return;
          instruments.current[i]!.currentStep = 0;
          if (i === instrumentsArray?.length - 1) {
            if (!loop.current) {
              let changeScene = true;

              for (let j = 0; j < instruments.current.length; j++) {
                if (instruments.current[j]?.currentStep !== 0) {
                  changeScene = false;
                  break;
                }
              }

              if (changeScene) {
                nextScene();
              }
            }
          }
        } else {
          instruments.current[i].currentStep++;
        }
      }
    }
  };

  const loadApp = async () => {
    await Tone.start();
    instruments.current.push(drums());
    newScene();
    newScene();
    newScene();
    Tone.Transport.scheduleRepeat(repeatFunction, "64n");
    setLoaded(true);
  };

  return (
    <nav className="flex items-center justify-center bg-slate-800 p-1">
      {loaded ? (
        <TransportControls />
      ) : (
        <button
          onClick={loadApp}
          className="rounded border border-slate-500 bg-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-600"
        >
          START APP
        </button>
      )}
    </nav>
  );
};

export default Header;
