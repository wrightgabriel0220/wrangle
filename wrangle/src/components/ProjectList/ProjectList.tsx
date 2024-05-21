import { ProjectTag, Project as ProjectType, View } from "../../types";
import Project from "./Project";

interface ProjectListProps {
  projects: ProjectType[];
  activeView: View;
  searchQuery: string;
  selectedTags: ProjectTag[];
}

export default function ProjectList({
  activeView,
  projects,
  searchQuery,
  selectedTags,
}: ProjectListProps) {
  return (
    <div id="project-list">
      {activeView.name} View
      <div>
        {projects
          .filter((project) => project.name?.includes(searchQuery))
          .filter((project) =>
            selectedTags.every((selectedTag) =>
              project.tags.includes(selectedTag)
            )
          )
          .map((project) => (
            <Project key={project.id} project={project} />
          ))}
      </div>
    </div>
  );
}
