import { Project as ProjectType, View } from "../../types";
import Project from "./Project";

interface ProjectListProps {
  projects: ProjectType[];
  activeView: View;
}

export default function ProjectList({
  activeView,
  projects,
}: ProjectListProps) {
  return (
    <div id="project-list">
      {activeView.name} View
      <div>
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
