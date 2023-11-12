import { useContext, useState, useEffect } from "react";
import * as Tone from "tone";
import { type Time } from "tone/build/esm/core/type/Units";
import { type ContextType, AppContext } from "~/context";
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
    appLoaded,
    loadAppNow,
    loadApp,
    appIsLoaded,
  } = useContext(AppContext)! as ContextType;

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.user) {
      if (typeof window !== "undefined") {
        void router.push("/");
      }
    }
  }, [session, router]);

  const repeatFunction = (time: Time) => {
    if (instruments.current !== null && instruments.current !== undefined) {
      let goToNext = false;
      for (let i = 0; i < instruments.current.length; i++) {
        const currentInstrument = instruments.current[i];

        if (currentInstrument && currentInstrument.new) {
          const calcStep = (step: number) => {
            if (step <= 63) {
              return step;
            } else {
              calcStep(step - 64);
            }
          };

          const instrumentStep = calcStep(currentStep.current);

          if (instrumentStep) {
            currentInstrument.currentStep = instrumentStep;
            currentInstrument.new = false;
          }
        }

        const step = instruments.current[i]?.currentStep;

        if (step === undefined) return;

        if (instruments.current[i]?.type === "drums") {
          const start =
            scenes.current[currentScene.current]?.patterns[i]?.pattern[step]
              ?.start;

          if (start === undefined) return;

          for (const playIndex of start) {
            if (playIndex === undefined || typeof playIndex !== "number") {
              return;
            }
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

        if (!pattern || !instrumentsArray) return;

        if (step >= pattern.length - 1) {
          if (instruments.current === null) return;
          instruments.current[i]!.currentStep = 0;

          if (i === instrumentsArray?.length - 1) {
            if (!loop.current) {
              const scene = scenes.current[currentScene.current];

              if (scene && currentStep.current >= scene.longestPattern - 1) {
                goToNext = true;
              }
            }
          }
        } else {
          instruments.current[i]!.currentStep++;
        }
      }

      if (goToNext) {
        nextScene();
      } else {
        setCurrentStep({ next: true });
      }
    }
  };

  const appLoader = async () => {
    await Tone.start();
    Tone.Transport.scheduleRepeat(repeatFunction, "64n");
    appIsLoaded();
  };

  if (loadAppNow && !appLoaded.current) {
    appLoaded.current = true;
    void appLoader();
  }

  return (
    <>
      <BackButton />
      {router.pathname !== "/projects" && <TransportControls />}

      <div className="flex justify-self-end">
        <SaveButton />
        <HamburgerMenu />
      </div>
    </>
  );
};

export default StudioHeader;
