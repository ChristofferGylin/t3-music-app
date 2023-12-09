import { useContext, useEffect } from "react";
import * as Tone from "tone";
import { type Time } from "tone/build/esm/core/type/Units";
import { type ContextType, AppContext } from "~/context";
import TransportControls from "../Transport/TransportControls";
import BackButton from "../UI/BackButton";
import { useRouter } from "next/router";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { useSession } from "next-auth/react";
import SaveButton from "../UI/SaveButton";
import { type DrumsType } from "~/instruments/drums/drums";
import { type BassicType } from "~/instruments/bassic";
import { type PatternTypeKeys } from "~/types/Pattern";

const StudioHeader = () => {
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
        let currentInstrument = instruments.current[i];

        if (instruments.current[i]?.type === "drums") {
          currentInstrument = instruments.current[i] as DrumsType;
        }

        if (!currentInstrument) continue;

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

        const step = currentInstrument.currentStep;

        if (step === undefined) return;

        if (instruments.current[i]?.type === "drums") {
          currentInstrument = instruments.current[i] as DrumsType;
          const start =
            scenes.current[currentScene.current]?.patterns[i]?.pattern[step]
              ?.start;

          if (start === undefined) return;

          for (const playIndex of start) {
            if (playIndex === undefined || typeof playIndex !== "number") {
              return;
            }
            currentInstrument.channels[playIndex]?.play(time);
          }
        } else {
          currentInstrument = instruments.current[i] as BassicType;
          const currentPattern = scenes.current[currentScene.current]?.patterns[
            i
          ] as PatternTypeKeys;
          const start = currentPattern.pattern[step]?.start;

          if (start === undefined) return;

          for (let j = 0; j < start.length; j++) {
            if (currentInstrument.polyphony === "mono" && j > 0) break;

            const startObj = start[j];

            if (startObj === undefined) {
              continue;
            }
            currentInstrument.playAndStop(
              startObj.note,
              startObj.duration,
              time,
            );
          }
        }

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
      <BackButton root={["/studio", "/studio/projects"]} />
      {router.pathname !== "/studio/projects" && <TransportControls />}

      <div className="col-start-3 flex w-full justify-end justify-self-end">
        <SaveButton />
        <HamburgerMenu />
      </div>
    </>
  );
};

export default StudioHeader;
