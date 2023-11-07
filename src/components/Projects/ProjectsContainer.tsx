import { Project } from "@prisma/client";
import Link from "next/link";
import { AppContext, ContextType } from "~/context";
import { useContext } from "react";
import { useRouter } from "next/router";

const ProjectsContainer = ({ projects }: { projects?: Project[] }) => {
  const router = useRouter();
  const { setLoaded } = useContext(AppContext) as ContextType;

  return (
    <div>
      <ul>
        {projects &&
          projects.map((project) => {
            return (
              <li key={project.id} className="w-full text-slate-300">
                <button
                  onClick={() => {
                    setLoaded(false);
                    router.push(`/loader/${project.id}`);
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
