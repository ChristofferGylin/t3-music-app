import { useContext, useState, useEffect } from "react";
import * as Tone from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import { AppContext, ContextType } from "~/context";
import TransportControls from "./TransportControls";
import BackButton from "./BackButton";
import { useRouter } from "next/router";
import HamburgerMenu from "./UI/HamburgerMenu/HamburgerMenu";
import { useSession } from "next-auth/react";
import SaveButton from "./UI/SaveButton";

const StudioHeader = () => {
  const [loaded, setLoaded] = useState(false);
  const {
    instruments,
    scenes,
    loop,
    currentScene,
    nextScene,
    currentStep,
    setCurrentStep,
  } = useContext(AppContext) as ContextType;

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.user) {
      if (typeof window !== "undefined") {
        router.push("/");
      }
    }
  }, [session, router]);

  const repeatFunction = (time: Time) => {
    if (instruments.current !== null && instruments.current !== undefined) {
      for (let i = 0; i < instruments.current.length; i++) {
        const currentInstrument = instruments.current[i];

        console.log("Instrument i:", i);
        console.log("currentStep global", currentStep.current);
        console.log("currentStep instrument", currentInstrument?.currentStep);

        if (currentInstrument && currentInstrument.new) {
          console.log("new instrument");

          if (currentStep.current !== 0) continue;

          currentInstrument.new = false;
          console.log("not new anymore");
        }

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

        const pattern = scenes.current[currentScene.current]?.patterns[i];
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
              const scene = scenes.current[currentScene.current];

              if (scene && currentStep.current >= scene.longestPattern) {
                nextScene();
              }
            }
          }
        } else {
          instruments.current[i]!.currentStep++;
        }
      }
      setCurrentStep({ next: true });
    }
  };

  const loadApp = async () => {
    await Tone.start();
    Tone.Transport.scheduleRepeat(repeatFunction, "64n");
    setLoaded(true);
  };

  return (
    <nav className="fixed right-0 top-0 grid h-14 w-full grid-cols-3 items-center bg-slate-900 p-1">
      {router.pathname !== "/" && <BackButton />}
      {loaded ? (
        <TransportControls />
      ) : (
        <button
          onClick={loadApp}
          className="col-start-2 rounded border border-slate-500 bg-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-600"
        >
          START APP
        </button>
      )}
      <div className="flex justify-self-end">
        <SaveButton />
        <HamburgerMenu />
      </div>
    </nav>
  );
};

export default StudioHeader;
