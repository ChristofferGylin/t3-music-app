import { useSession } from "next-auth/react";
import WelcomeScreen from "~/components/LandingPage/WelcomeScreen";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";

export default function Home() {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <WelcomeScreen />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session && session.user) {
    return {
      redirect: {
        destination: "/studio/projects",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
