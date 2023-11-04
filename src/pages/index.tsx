import { useSession } from "next-auth/react";
import WelcomeScreen from "~/components/LandingPage/WelcomeScreen";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex h-full w-full items-center justify-center">
      <WelcomeScreen />
    </main>
  );
}
