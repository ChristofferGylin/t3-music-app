import { useRouter } from "next/router";
import { AiOutlinePlusCircle } from "react-icons/ai";
import IconButton from "~/components/IconButton";
import ProjectsContainer from "~/components/Projects/ProjectsContainer";

const Projects = () => {
  const router = useRouter();
  return (
    <main className="w-full pt-14">
      <div>
        <IconButton
          state={false}
          Icon={AiOutlinePlusCircle}
          callback={() => {
            console.log("new project");
            router.push("/studio");
          }}
        />
      </div>
      <ProjectsContainer />
    </main>
  );
};

export default Projects;
