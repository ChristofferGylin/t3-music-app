import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";

const Instruments = () => {
  return (
    <main className="h-full w-full bg-slate-700 pt-14">
      <div className="grid h-full w-full grid-rows-[3rem_auto] overflow-hidden p-2 xs:p-4 sm:p-8">
        <div className="flex items-center justify-between py-2">
          <h1>Instruments</h1>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Instruments;
