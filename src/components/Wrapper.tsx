import { type PropsWithChildren } from "react";
import Head from "next/head";

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[calc(100vh)] w-full bg-slate-700">
      <Head>
        <title>PlinkPlonk - Make music in your browser!</title>
      </Head>
      {children}
    </div>
  );
};

export default Wrapper;
