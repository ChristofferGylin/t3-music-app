import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";
import createPatternDrums from "~/functions/createPatternDrums";
import * as Tone from "tone";
import drums, { DrumsType } from "~/instruments/drums/drums";

import { api } from "~/utils/api";
import Drums from "~/components/drums/Drums";
import { Scene } from "~/types/Scene";
import { useContext } from "react";
import { AppContext, ContextType } from "~/context";
import ScenesContainer from "~/components/ScenesContainer";

type InstrumentsType = Array<DrumsType>;

export default function Home() {
  const { scenesState } = useContext(AppContext) as ContextType;
  return (
    <>
      <main className=" flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <ScenesContainer />
      </main>
    </>
  );
}
