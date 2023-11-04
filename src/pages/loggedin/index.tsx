import { useSession } from "next-auth/react";
import SignInOutButton from "~/components/UI/SignInOutButton";

const LoggedIn = () => {
  const { data: session } = useSession();

  return (
    <div>
      <SignInOutButton />
      {session && session?.user ? (
        <div>You can see this because you are logged in</div>
      ) : (
        <div>You are not logged in.</div>
      )}
    </div>
  );
};

export default LoggedIn;
