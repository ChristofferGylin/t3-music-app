import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";

const Admin = () => {
  return (
    <>
      <div className="flex justify-center gap-8">
        You are logged in as admin.
      </div>
    </>
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

export default Admin;
