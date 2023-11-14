import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { type ContextType, AppContext } from "~/context";
import IconButton from "../IconButton";
import { AiOutlineDelete } from "react-icons/ai";
import Ptag from "./Ptag";
import ModalScreen from "../UI/ModalScreen";
import DialogBox from "../UI/DialogBox";
import DialogButton from "../UI/DialogButton";
import type ProjectWithUserEmail from "~/types/ProjectWithUser";

const ProjectItem = ({
  project,
  deleteCallback,
}: {
  project: ProjectWithUserEmail;
  deleteCallback: (id: string) => void;
}) => {
  const router = useRouter();
  const { setLoaded, loadApp } = useContext(AppContext)! as ContextType;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <ModalScreen
          close={() => {
            setShowModal(false);
          }}
        >
          <DialogBox>
            <div className="flex flex-col gap-6">
              <h1 className="text-xl">DELETE PROJECT</h1>
              <p>
                Are you sure you want to delete this project? This can not be
                undone.
              </p>
              <div className="flex justify-center gap-4">
                <DialogButton
                  title="Delete"
                  callback={() => {
                    deleteCallback(project.id);
                    setShowModal(false);
                  }}
                />
                <DialogButton
                  title="Cancel"
                  callback={() => setShowModal(false)}
                />
              </div>
            </div>
          </DialogBox>
        </ModalScreen>
      )}
      <li className="grid h-10 w-full grid-cols-projects text-slate-300 odd:bg-slate-800/20 hover:bg-slate-800/50 hover:text-slate-200">
        <button
          className="grid h-full w-full grid-cols-1 items-center justify-start gap-4 xs:grid-cols-[2fr_1fr] sm:grid-cols-3 md:grid-cols-4"
          onClick={() => {
            setLoaded(false);
            loadApp();
            void router.push(`/loader/${project.id}`);
          }}
        >
          <Ptag>{project.name}</Ptag>
          <Ptag twClasses="hidden xs:flex">
            {new Date(project.updated).toLocaleDateString()},{" "}
            {new Date(project.updated).toLocaleTimeString()}
          </Ptag>
          <Ptag twClasses={"hidden sm:flex"}>
            {new Date(project.created).toLocaleDateString()},{" "}
            {new Date(project.created).toLocaleTimeString()}
          </Ptag>
          <Ptag twClasses={"hidden md:flex"}>{project.user.email}</Ptag>
        </button>
        <div className="flex w-full items-center justify-center">
          <IconButton
            Icon={AiOutlineDelete}
            callback={() => {
              setShowModal(true);
            }}
          />
        </div>
      </li>
    </>
  );
};

export default ProjectItem;
