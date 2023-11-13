import { type Project } from "@prisma/client";
import { type ContextType, AppContext } from "~/context";
import { type PropsWithChildren, useContext, useState, useEffect } from "react";
import ProjectItem from "./ProjectsItem";
import Ptag from "./Ptag";
import IconButton from "../IconButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Loading from "../LoadingPage/Loading";

type ProjectsContainerType = PropsWithChildren & {
  projects?: Project[];
};

const titles = ["Name", "Updated", "Created"];

const ProjectsContainer = ({ projects, children }: ProjectsContainerType) => {
  const {} = useContext(AppContext)! as ContextType;
  const [order, setOrder] = useState("desc");
  const [sortOn, setSortOn] = useState("updated");
  const [sorted, setSorted] = useState<Project[]>([]);

  useEffect(() => {
    let projs: Project[];

    setSorted((old) => {
      if (projects) {
        projs = projects;
      } else projs = [...old];

      return projs.sort((a, b) => {
        let sorterA;
        let sorterB;

        switch (sortOn) {
          case "updated":
            sorterA = a.updated;
            sorterB = b.updated;
            break;
          case "created":
            sorterA = a.created;
            sorterB = b.created;
            break;
          case "name":
            sorterA = a.name;
            sorterB = b.name;
            break;
          default:
            sorterA = a.updated;
            sorterB = b.updated;
        }

        if (order === "desc") {
          if (sorterA < sorterB) return -1;
          if (sorterA > sorterB) return 1;
          return 0;
        } else {
          if (sorterA > sorterB) return -1;
          if (sorterA < sorterB) return 1;
          return 0;
        }
      });
    });
  }, [projects, sortOn, order]);

  const handleOrder = (name: string) => {
    const lowerCaseName = name.toLowerCase();

    if (sortOn !== lowerCaseName) {
      setSortOn(lowerCaseName);
    } else {
      setOrder((old) => {
        if (old === "desc") {
          return "asc";
        } else {
          return "desc";
        }
      });
    }
  };

  return (
    <div className="h-full overflow-hidden">
      <ul className="relative mb-4 h-full w-full overflow-auto">
        <li
          key="projectsTitlesKey"
          className="grid-cols-projects sticky left-0 top-0 z-0 grid h-12 w-full border-b border-slate-500 bg-slate-700 py-2 text-slate-300 shadow"
        >
          <div className="xs:grid-cols-[2fr_1fr] grid h-full w-full grid-cols-1 items-center justify-start gap-4 text-lg sm:grid-cols-3">
            {titles.map((title) => {
              let selected = false;
              let twClasses = "flex";

              if (title.toLowerCase() === sortOn) {
                selected = true;
              }

              if (title === "Created") {
                twClasses = "hidden sm:flex";
              }

              if (title === "Updated") {
                twClasses = "hidden xs:flex";
              }

              return (
                <Ptag
                  selected={selected}
                  twClasses={twClasses}
                  key={`title-${title}-Key`}
                >
                  <button
                    onClick={() => {
                      handleOrder(title);
                    }}
                  >
                    {title}
                  </button>
                </Ptag>
              );
            })}
          </div>
          <div className="flex w-full items-center justify-center">
            {children}
          </div>
        </li>
        {projects ? (
          sorted.map((project) => {
            return <ProjectItem key={project.id} project={project} />;
          })
        ) : (
          <li
            key="loadingSpinnerKey"
            className="flex h-3/4 w-full items-center justify-center"
          >
            <Loading />
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProjectsContainer;
