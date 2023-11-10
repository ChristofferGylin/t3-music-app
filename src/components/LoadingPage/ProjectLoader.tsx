import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { api } from "~/utils/api";
import { type ContextType, AppContext } from "~/context";

type ProjectLoaderProps = {
  projectId: string;
};

const ProjectLoader = ({ projectId }: ProjectLoaderProps) => {
  const router = useRouter();
  const { loadProject, projectLoaded } = useContext(AppContext)! as ContextType;

  const project = api.project.getProjectById.useQuery({
    id: projectId,
  }).data;

  useEffect(() => {
    if (project) {
      loadProject(project);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  useEffect(() => {
    if (projectLoaded && router && typeof window !== "undefined") {
      void router.push("/studio");
    }
  }, [projectLoaded, router]);

  return <></>;
};

export default ProjectLoader;
