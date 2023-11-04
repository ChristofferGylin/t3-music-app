import { AiOutlinePlusCircle } from "react-icons/ai";
import IconButton from "~/components/IconButton";
import ProjectsContainer from "~/components/Projects/ProjectsContainer";

const Projects = () => {
  return (
    <main className="w-full">
      <div>
        <IconButton
          state={false}
          Icon={AiOutlinePlusCircle}
          callback={() => {
            console.log("new project");
          }}
        />
      </div>
      <ProjectsContainer />
    </main>
  );
};

export default Projects;
