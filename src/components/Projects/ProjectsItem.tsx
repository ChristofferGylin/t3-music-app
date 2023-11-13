import { type Project } from "@prisma/client";
import { useRouter } from "next/router";
import { useContext } from "react";
import { type ContextType, AppContext } from "~/context";
import IconButton from "../IconButton";
import { AiOutlineDelete } from "react-icons/ai";
import Ptag from "./Ptag";

const ProjectItem = ({ project }: { project: Project }) => {
  const router = useRouter();
  const { setLoaded, loadApp } = useContext(AppContext)! as ContextType;
  return (
    <li className="grid-cols-projects grid w-full text-slate-300 odd:bg-slate-800/20 hover:bg-slate-800/50 hover:text-slate-200">
      <button
        className="grid h-full w-full grid-cols-3 items-center justify-start"
        onClick={() => {
          setLoaded(false);
          loadApp();
          void router.push(`/loader/${project.id}`);
        }}
      >
        <Ptag>{project.name}</Ptag>
        <Ptag>
          {new Date(project.updated).toLocaleDateString()},{" "}
          {new Date(project.updated).toLocaleTimeString()}
        </Ptag>
        <Ptag>
          {new Date(project.created).toLocaleDateString()},{" "}
          {new Date(project.created).toLocaleTimeString()}
        </Ptag>
      </button>
      <div className="flex w-full items-center justify-center">
        <IconButton
          Icon={AiOutlineDelete}
          callback={() => {
            console.log("delete");
          }}
        />
      </div>
    </li>
  );
};

export default ProjectItem;
