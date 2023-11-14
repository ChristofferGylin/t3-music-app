import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import UsersContainer from "~/components/Admin/UsersContainer";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import ProjectsContainer from "~/components/Admin/ProjectsContainer";

const Users = () => {
  const queryClient = useQueryClient();
  const users = api.admin.getLatestUsers.useQuery().data;
  const usersQKey = getQueryKey(api.admin.getAllUsers, undefined, "query");
  const deleteUser = api.admin.deleteUser.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: usersQKey,
      });
    },
  });

  const projects = api.admin.getLatestProjects.useQuery().data;
  const projectsQKey = getQueryKey(
    api.admin.getLatestProjects,
    undefined,
    "query",
  );

  const deleteProject = api.admin.deleteProject.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectsQKey,
      });
    },
  });

  const handleDeleteProject = async (id: string) => {
    await deleteProject.mutateAsync({ id });
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser.mutateAsync({ id });
  };

  return (
    <main className="h-full w-full bg-slate-700 pt-14">
      <div className="flex h-full w-full flex-col gap-4 overflow-hidden p-2 xs:p-4 sm:p-8">
        <div className="flex items-center justify-between py-2">
          <h1>Overview</h1>
        </div>
        <div className="flex w-full flex-col gap-4 rounded-md bg-slate-800 p-4">
          <h2>Latest registered users</h2>
          <div className="h-full overflow-hidden rounded bg-slate-700/40">
            <UsersContainer
              users={users}
              deleteCallback={handleDeleteUser}
            ></UsersContainer>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 rounded-md bg-slate-800 p-4">
          <h2>Latest projects</h2>
          <div className="h-full overflow-hidden rounded bg-slate-700/40">
            <ProjectsContainer
              projects={projects}
              deleteCallback={handleDeleteProject}
            />
          </div>
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

export default Users;
