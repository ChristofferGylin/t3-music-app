import { useRouter } from "next/router";
import { AiOutlinePlusCircle } from "react-icons/ai";
import IconButton from "~/components/IconButton";
import ProjectsContainer from "~/components/Projects/ProjectsContainer";
import ModalScreen from "~/components/UI/ModalScreen";
import { useState } from "react";
import DialogBox from "~/components/UI/DialogBox";
import DialogButton from "~/components/UI/DialogButton";
import TextInput from "~/components/UI/TextInput";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  return (
    <main className="w-full pt-14">
      {showModal && (
        <ModalScreen
          close={() => {
            setShowModal(false);
          }}
        >
          <DialogBox>
            <div className="flex flex-col gap-6">
              <h1 className="text-xl">NEW PROJECT</h1>
              <TextInput name="name" placeholder="Name" />
              <div className="flex justify-center gap-4">
                <DialogButton
                  title="Create"
                  callback={() => setShowModal(false)}
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

      <div>
        <IconButton
          state={false}
          Icon={AiOutlinePlusCircle}
          callback={() => {
            setShowModal(true);
          }}
        />
      </div>
      <ProjectsContainer />
    </main>
  );
};

export default Projects;
