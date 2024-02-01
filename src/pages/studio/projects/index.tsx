import { useRouter } from "next/router";
import { AiOutlinePlusCircle } from "react-icons/ai";
import IconButton from "~/components/UI/IconButton";
import ProjectsContainer from "~/components/Projects/ProjectsContainer";
import ModalScreen from "~/components/UI/ModalScreen";
import { useState, useContext } from "react";
import DialogBox from "~/components/UI/DialogBox";
import DialogButton from "~/components/UI/DialogButton";
import TextInput from "~/components/UI/TextInput";
import { api } from "~/utils/api";
import { type ContextType, AppContext } from "~/context";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState<string>("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const userProjects = api.project.getUserProjects.useQuery().data;
  const projectQKey = getQueryKey(
    api.project.getUserProjects,
    undefined,
    "query",
  );
  const createProject = api.project.create.useMutation();
  const deleteProject = api.project.deleteProject.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectQKey,
      });
    },
  });

  const handleDelete = async (id: string) => {
    await deleteProject.mutateAsync({ id });
  };

  const { setLoaded, loadProject, loadApp, newScene } = useContext(
    AppContext,
  )! as ContextType;

  const handleCreate = async () => {
    setLoaded(false);
    loadApp();
    const newProject = await createProject.mutateAsync({
      name: newProjectName,
    });
    loadProject(newProject);
    newScene();
    setShowModal(false);
    void router.push("/studio");
  };

  return (
    <main className="h-full w-full bg-slate-700 pt-14">
      {showModal && (
        <ModalScreen
          close={() => {
            setShowModal(false);
          }}
        >
          <DialogBox classes="p-4">
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
      <div className="grid h-full w-full grid-rows-[3rem_auto] overflow-hidden p-2 xs:p-4 sm:p-8">
        <div className="flex items-center justify-between py-2">
          <h1>My projects</h1>
        </div>
        <ProjectsContainer
          projects={userProjects}
          deleteCallback={handleDelete}
        >
          <IconButton
            state={false}
            Icon={AiOutlinePlusCircle}
            callback={() => {
              setShowModal(true);
            }}
          />
        </ProjectsContainer>
      </div>
    </main>
  );
};

export default Projects;
