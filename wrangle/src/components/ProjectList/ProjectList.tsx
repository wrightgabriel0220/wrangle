import { Project as ProjectType, View } from "../../types";
import Project from "./Project";

interface ProjectListProps {
  projects: ProjectType[];
  activeView: View;
  searchQuery: string;
}

export default function ProjectList({
  activeView,
  projects,
  searchQuery,
}: ProjectListProps) {
  return (
    <div id="project-list">
      {activeView.name} View
      <div>
        {projects
          .filter((project) => project.name.includes(searchQuery))
          .map((project) => (
            <Project key={project.id} project={project} />
          ))}
      </div>
    </div>
  );
}
