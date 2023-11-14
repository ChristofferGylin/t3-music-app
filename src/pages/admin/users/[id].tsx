import { api } from "~/utils/api";
//import { useQueryClient } from "@tanstack/react-query";
//import { getQueryKey } from "@trpc/react-query";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Loading from "~/components/LoadingPage/Loading";

const LoadingScreen = () => {
  return (
    <main className="flex h-full w-full items-center justify-center bg-slate-700 pt-14">
      <Loading />
    </main>
  );
};

const Users = () => {
  const router = useRouter();
  //const queryClient = useQueryClient();
  if (typeof router?.query?.id !== "string") return <LoadingScreen />;

  const user = api.admin.getUserById.useQuery({ id: router?.query?.id }).data;
  //const projectQKey = getQueryKey(api.admin.getUserById, undefined, "query");
  // const deleteUser = api.admin.deleteUser.useMutation({
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: projectQKey,
  //     });
  //   },
  // });

  // const handleDelete = async (id: string) => {
  //   await deleteUser.mutateAsync({ id });
  // };

  if (!user) return <LoadingScreen />;

  return (
    <main className="h-full w-full bg-slate-700 pt-14">
      <div className="flex h-full w-full flex-col overflow-hidden p-2 xs:p-4 sm:p-8">
        <div className="flex items-center justify-between">
          <h1>{user.name}</h1>
        </div>

        <p>{user.email}</p>
        <p>{user.role}</p>
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

export default Users;
