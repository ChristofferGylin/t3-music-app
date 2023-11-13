import { type Project } from "@prisma/client";
import { type ContextType, AppContext } from "~/context";
import { type PropsWithChildren, useContext } from "react";
import ProjectItem from "./ProjectsItem";
import Ptag from "./Ptag";
import IconButton from "../IconButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Loading from "../LoadingPage/Loading";

type ProjectsContainerType = PropsWithChildren & {
  projects?: Project[];
};

const ProjectsContainer = ({ projects, children }: ProjectsContainerType) => {
  const {} = useContext(AppContext)! as ContextType;

  return (
    <div className="h-full overflow-hidden">
      <ul className="relative mb-4 h-full w-full overflow-auto">
        <li
          key="projectsTitlesKey"
          className="grid-cols-projects sticky left-0 top-0 grid h-12 w-full border-b border-slate-500 bg-slate-700 py-2 text-slate-300 shadow"
        >
          <div className="grid h-full w-full grid-cols-3 items-center justify-start text-lg">
            <Ptag>Name</Ptag>
            <Ptag>Updated</Ptag>
            <Ptag>Created</Ptag>
          </div>
          <div className="flex w-full items-center justify-center">
            {children}
          </div>
        </li>
        {projects ? (
          projects.map((project) => {
            return <ProjectItem key={project.id} project={project} />;
          })
        ) : (
          <div className="mt-48">
            <Loading />
          </div>
        )}
      </ul>
    </div>
  );
};

export default ProjectsContainer;
