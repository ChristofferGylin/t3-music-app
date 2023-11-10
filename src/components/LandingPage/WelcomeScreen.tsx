import Image from "next/image";
import { signIn } from "next-auth/react";

const WelcomeScreen = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900">
      <Image
        className="hover:cursor-pointer"
        src={"/images/plinkplonk-logo.png"}
        width={400}
        height={400}
        alt="The PlinkPlonk logo"
        onClick={() => {
          void signIn();
        }}
      />
      <p className="text-2xl tracking-wide  text-slate-300">
        <button
          onClick={() => {
            void signIn();
          }}
          className="font-bold text-blue-500 hover:text-blue-400"
        >
          Sign in
        </button>{" "}
        to start making music!
      </p>
    </div>
  );
};

export default WelcomeScreen;
