import Image from "next/image";
import { signIn } from "next-auth/react";

const WelcomeScreen = () => {
  return (
    <div>
      <h1>Welcome to PlinkPlonk!</h1>
      <Image
        src={"/images/plinkplonk-logo.png"}
        width={400}
        height={400}
        alt="The PlinkPlonk logo"
      />
      <p>
        <button
          onClick={() => {
            signIn();
          }}
        >
          Sign in
        </button>{" "}
        to start making music
      </p>
    </div>
  );
};

export default WelcomeScreen;
