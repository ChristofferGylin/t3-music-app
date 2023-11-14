import { type PropsWithChildren, useState, useEffect } from "react";
import Ptag from "./Ptag";
import Loading from "../LoadingPage/Loading";
import { type User } from "@prisma/client";
import UserItem from "./UserItem";

type UsersContainerType = PropsWithChildren & {
  users?: User[];
  deleteCallback: (id: string) => void;
};

const titles = ["Name", "Email", "Updated", "Created", "Role"];

const UsersContainer = ({
  users,
  deleteCallback,
  children,
}: UsersContainerType) => {
  const [order, setOrder] = useState("desc");
  const [sortOn, setSortOn] = useState("created");
  const [sorted, setSorted] = useState<User[]>([]);
  const [updateTime, setUpdateTime] = useState(false);

  useEffect(() => {
    setUpdateTime(false);

    let usrs: User[];

    setSorted((old) => {
      if (users) {
        usrs = users;
      } else usrs = [...old];

      return usrs.sort((a, b) => {
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
            if (!a.name) {
              sorterA = "";
            } else {
              sorterA = a.name;
            }
            if (!b.name) {
              sorterB = "";
            } else {
              sorterB = b.name;
            }
            break;
          case "email":
            if (!a.email) {
              sorterA = "";
            } else {
              sorterA = a.email;
            }
            if (!b.email) {
              sorterB = "";
            } else {
              sorterB = b.email;
            }
            break;
          case "role":
            sorterA = a.role;
            sorterB = b.role;
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
  }, [users, sortOn, order, updateTime]);

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
          <div className="grid h-full w-full grid-cols-2 items-center justify-start gap-4 sm:grid-cols-[1fr_1fr_3rem] md:grid-cols-[1fr_1fr_1fr_3rem] lg:grid-cols-[1fr_1fr_1fr_1fr_3rem]">
            {titles.map((title) => {
              let selected = false;
              let twClasses = "flex";

              if (title.toLowerCase() === sortOn) {
                selected = true;
              }

              if (title === "Created") {
                twClasses = "hidden md:flex";
              }

              if (title === "Updated") {
                twClasses = "hidden lg:flex";
              }

              if (title === "Role") {
                twClasses = "hidden sm:flex";
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
        {users ? (
          sorted.map((user) => {
            return (
              <UserItem
                key={user.id}
                user={user}
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

export default UsersContainer;
