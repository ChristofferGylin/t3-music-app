import { useSession } from "next-auth/react";
import WelcomeScreen from "~/components/LandingPage/WelcomeScreen";
import ProjectsContainer from "~/components/LandingPage/ProjectsContainer";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex justify-center">
      {!session || !session.user ? <WelcomeScreen /> : <ProjectsContainer />}
    </main>
  );
}
