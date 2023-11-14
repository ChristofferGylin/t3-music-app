import { type ContextType, AppContext } from "~/context";
import { type PropsWithChildren, useContext, useState, useEffect } from "react";
import ProjectItem from "./ProjectsItem";
import Ptag from "./Ptag";
import Loading from "../LoadingPage/Loading";
import type ProjectWithUserEmail from "~/types/ProjectWithUser";

type ProjectsContainerType = PropsWithChildren & {
  projects?: ProjectWithUserEmail[];
  deleteCallback: (id: string) => void;
};

const titles = ["Name", "Updated", "Created", "User"];

const ProjectsContainer = ({
  projects,
  deleteCallback,
  children,
}: ProjectsContainerType) => {
  const {} = useContext(AppContext)! as ContextType;
  const [order, setOrder] = useState("desc");
  const [sortOn, setSortOn] = useState("updated");
  const [sorted, setSorted] = useState<ProjectWithUserEmail[]>([]);
  const [updateTime, setUpdateTime] = useState(false);

  useEffect(() => {
    setUpdateTime(false);

    let projs: ProjectWithUserEmail[];

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
  }, [projects, sortOn, order, updateTime]);

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
      <ul className="relative z-0 mb-4 h-full w-full overflow-auto">
        <li
          key="projectsTitlesKey"
          className="sticky left-0 top-0 grid h-12 w-full grid-cols-projects border-b border-slate-500 bg-slate-700 py-2 text-slate-300 shadow"
        >
          <div className="grid h-full w-full grid-cols-1 items-center justify-start gap-4 xs:grid-cols-[1fr_11.5rem] sm:grid-cols-[1fr_9rem_9rem] md:grid-cols-4 lg:grid-cols-[1fr_1fr_9rem_9rem]">
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

              if (title === "User") {
                twClasses = "hidden md:flex";
              }

              twClasses += " sm:text-base";

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
            return (
              <ProjectItem
                key={project.id}
                project={project}
                deleteCallback={deleteCallback}
              />
            );
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
