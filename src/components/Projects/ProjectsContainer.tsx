import { type Project } from "@prisma/client";
import { type ContextType, AppContext } from "~/context";
import { type PropsWithChildren, useContext } from "react";
import ProjectItem from "./ProjectsItem";
import Ptag from "./Ptag";
import IconButton from "../IconButton";
import { AiOutlinePlusCircle } from "react-icons/ai";

type ProjectsContainerType = PropsWithChildren & {
  projects?: Project[];
};

const ProjectsContainer = ({ projects, children }: ProjectsContainerType) => {
  const {} = useContext(AppContext)! as ContextType;

  return (
    <div>
      <ul>
        <li className="grid-cols-projects grid w-full border-b border-slate-500 py-2 text-slate-300">
          <div className="grid h-full w-full grid-cols-3 items-center justify-start text-lg">
            <Ptag>Name</Ptag>
            <Ptag>Updated</Ptag>
            <Ptag>Created</Ptag>
          </div>
          <div className="flex w-full items-center justify-center">
            {children}
          </div>
        </li>
        {projects?.map((project) => {
          return <ProjectItem key={project.id} project={project} />;
        })}
      </ul>
    </div>
  );
};

export default ProjectsContainer;
