import { useRouter } from "next/router";
import { AiOutlinePlusCircle } from "react-icons/ai";
import IconButton from "~/components/IconButton";
import ProjectsContainer from "~/components/Projects/ProjectsContainer";
import ModalScreen from "~/components/UI/ModalScreen";
import { useState, useContext } from "react";
import DialogBox from "~/components/UI/DialogBox";
import DialogButton from "~/components/UI/DialogButton";
import TextInput from "~/components/UI/TextInput";
import { api } from "~/utils/api";
import { type ContextType, AppContext } from "~/context";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState<string>("");
  const router = useRouter();
  const createProject = api.project.create.useMutation();

  const { setLoaded, loadProject } = useContext(AppContext) as ContextType;

  const userProjects = api.project.getUserProjects.useQuery().data;

  const handleCreate = async () => {
    setLoaded(false);
    const newProject = await createProject.mutateAsync({
      name: newProjectName,
    });
    loadProject(newProject);
    setShowModal(false);
    router.push("/studio");
  };

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
              <TextInput
                name="name"
                placeholder="Name"
                value={newProjectName}
                change={(e) => {
                  setNewProjectName(e.target.value);
                }}
              />
              <div className="flex justify-center gap-4">
                <DialogButton title="Create" callback={handleCreate} />
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
      <ProjectsContainer projects={userProjects} />
    </main>
  );
};

export default Projects;
