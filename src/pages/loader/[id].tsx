import { useRouter } from "next/router";
import { AiOutlineLoading } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { api } from "~/utils/api";
import { type ContextType, AppContext } from "~/context";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 text-lg text-slate-300">
        <AiOutlineLoading className="animate-spin fill-slate-300 text-4xl" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

const Loader = () => {
  const router = useRouter();
  const { loadProject, projectLoaded } = useContext(AppContext) as ContextType;

  if (!router || typeof router.query.id !== "string") return <Loading />;

  const project = api.project.getProjectById.useQuery({
    id: router.query.id,
  }).data;

  useEffect;

  useEffect(() => {
    if (project) {
      loadProject(project);
    }
  }, [project]);

  if (projectLoaded) router.push("/studio");

  return <Loading />;
};

export default Loader;
