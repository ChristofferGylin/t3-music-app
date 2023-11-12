import { type Project } from "@prisma/client";
import { type ContextType, AppContext } from "~/context";
import { useContext } from "react";
import { useRouter } from "next/router";

const ProjectsContainer = ({ projects }: { projects?: Project[] }) => {
  const router = useRouter();
  const { setLoaded, loadApp } = useContext(AppContext)! as ContextType;

  return (
    <div>
      <ul>
        {projects?.map((project) => {
          return (
            <li key={project.id} className="w-full text-slate-300">
              <button
                onClick={() => {
                  setLoaded(false);
                  loadApp();
                  void router.push(`/loader/${project.id}`);
                }}
              >
                {project.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectsContainer;
