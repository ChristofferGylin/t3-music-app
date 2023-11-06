import { Project } from "@prisma/client";

const ProjectsContainer = ({ projects }: { projects?: Project[] }) => {
  return (
    <div>
      <ul>
        {projects &&
          projects.map((project) => {
            return <li key={project.id}>{project.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default ProjectsContainer;
