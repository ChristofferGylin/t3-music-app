import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import UsersContainer from "~/components/Admin/UsersContainer";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";

const Users = () => {
  const queryClient = useQueryClient();
  const users = api.admin.getAllUsers.useQuery().data;
  const projectQKey = getQueryKey(api.admin.getAllUsers, undefined, "query");
  const deleteProject = api.admin.deleteProject.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectQKey,
      });
    },
  });

  const handleDelete = async (id: string) => {
    await deleteProject.mutateAsync({ id });
  };

  return (
    <main className="h-full w-full bg-slate-700 pt-14">
      <div className="grid h-full w-full grid-rows-[3rem_auto] overflow-hidden p-2 xs:p-4 sm:p-8">
        <div className="flex items-center justify-between py-2">
          <h1>Users</h1>
        </div>

        <UsersContainer
          users={users}
          deleteCallback={handleDelete}
        ></UsersContainer>
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
