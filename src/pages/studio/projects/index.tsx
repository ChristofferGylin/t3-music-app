import { useRouter } from "next/router";
import { AiOutlinePlusCircle } from "react-icons/ai";
import IconButton from "~/components/IconButton";
import ProjectsContainer from "~/components/Projects/ProjectsContainer";
import ModalScreen from "~/components/UI/ModalScreen";
import { useState } from "react";
import DialogBox from "~/components/UI/DialogBox";
import DialogButton from "~/components/UI/DialogButton";
import TextInput from "~/components/UI/TextInput";
import { api } from "~/utils/api";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState<string>("");
  const router = useRouter();
  const createProject = api.project.create.useMutation();

  const defaultChannels = JSON.stringify([
    {
      title: "Kick",
      url: "./samples/Electro1/1-Kick01.wav",
    },
    {
      title: "Snare 1",
      url: "./samples/Electro1/3-Snr01.wav",
    },
    {
      title: "Snare 2",
      url: "./samples/Electro1/4-Snr02.wav",
    },
    {
      title: "Clap",
      url: "./samples/Electro1/5-Clap01.wav",
    },
    {
      title: "Cl. Hat",
      url: "./samples/Electro1/6-ClHat01.wav",
    },
    {
      title: "Op. Hat",
      url: "./samples/Electro1/7-OpHat01.wav",
    },
    {
      title: "Cymbal",
      url: "./samples/Electro1/8-Cymbal01.wav",
    },
    {
      title: "Tom 1",
      url: "./samples/Electro1/9-Tom01.wav",
    },
    {
      title: "Tom 2",
      url: "./samples/Electro1/10-Tom02.wav",
    },
    {
      title: "Tom 3",
      url: "./samples/Electro1/11-Tom03.wav",
    },
    {
      title: "Tom 4",
      url: "./samples/Electro1/12-Tom04.wav",
    },
  ]);

  const createDefaultKit = api.instruments.createDrumsKit.useMutation();
  //createDefaultKit.mutate({ name: "default kit", channels: defaultChannels });

  // const kit = api.instruments.getDrumsKitById.useQuery({
  //   id: "clon5bxgj0000nv0sj2q7b81l",
  // });

  // if (kit) console.log(kit.data);

  const userProjects = api.project.getUserProjects.useQuery().data;

  const handleCreate = async () => {
    const newProject = await createProject.mutateAsync({
      name: newProjectName,
    });
    console.log(newProject);
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
