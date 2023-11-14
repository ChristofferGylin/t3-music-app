import { useState } from "react";
import IconButton from "../IconButton";
import { AiOutlineDelete } from "react-icons/ai";
import Ptag from "./Ptag";
import ModalScreen from "../UI/ModalScreen";
import DialogBox from "../UI/DialogBox";
import DialogButton from "../UI/DialogButton";
import { type User } from "@prisma/client";
import Link from "next/link";

const UserItem = ({
  user,
  deleteCallback,
}: {
  user: User;
  deleteCallback: (id: string) => void;
}) => {
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
              <h1 className="text-xl">DELETE USER</h1>
              <p>
                Are you sure you want to delete this user? This can not be
                undone.
              </p>
              <div className="flex justify-center gap-4">
                <DialogButton
                  title="Delete"
                  callback={() => {
                    deleteCallback(user.id);
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
        <Link
          className="grid h-full w-full grid-cols-2 items-center justify-start gap-4 text-slate-300 visited:text-slate-300 sm:grid-cols-[1fr_1fr_3rem] md:grid-cols-[1fr_1fr_1fr_3rem] lg:grid-cols-[1fr_1fr_1fr_1fr_3rem]"
          href={`/admin/users/${user.id}`}
        >
          <Ptag>{user.name}</Ptag>
          <Ptag>{user.email}</Ptag>
          <Ptag twClasses="hidden lg:flex">
            {new Date(user.updated).toLocaleDateString()},{" "}
            {new Date(user.updated).toLocaleTimeString()}
          </Ptag>
          <Ptag twClasses={"hidden md:flex"}>
            {new Date(user.created).toLocaleDateString()},{" "}
            {new Date(user.created).toLocaleTimeString()}
          </Ptag>
          <Ptag twClasses={"hidden sm:flex"}>{user.role}</Ptag>
        </Link>
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

export default UserItem;
