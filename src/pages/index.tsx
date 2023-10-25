import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";
import createPatternDrums from "~/functions/createPatternDrums";
import * as Tone from "tone";
import drums, { DrumsType } from "~/instruments/drums/drums";

import { api } from "~/utils/api";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const drummachine = useRef<DrumsType | null>(null);

  const pattern = createPatternDrums();

  const loadApp = async () => {
    await Tone.start();
    drummachine.current = drums();
    setLoaded(true);
  };

  if (!loaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <button onClick={loadApp} className="border border-slate-500 px-6 py-2">
          Load Drum Machine
        </button>
      </div>
    );
  }

  return (
    <>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {drummachine.current?.channels.map((channel) => {
            return (
              <button
                className="mx-4 my-2 border"
                onClick={() => {
                  channel.play();
                }}
              >
                {channel.name}
              </button>
            );
          })}
        </div>
      </main>
    </>
  );
}
