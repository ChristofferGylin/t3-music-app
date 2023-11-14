import ProjectsContainer from "~/components/Admin/ProjectsContainer";
import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";

const Projects = () => {
  const queryClient = useQueryClient();
  const userProjects = api.admin.getUserProjects.useQuery().data;
  const projectQKey = getQueryKey(
    api.admin.getUserProjects,
    undefined,
    "query",
  );
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
          <h1>Projects</h1>
        </div>
        <ProjectsContainer
          projects={userProjects}
          deleteCallback={handleDelete}
        ></ProjectsContainer>
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

export default Projects;
