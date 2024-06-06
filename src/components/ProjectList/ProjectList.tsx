import { View } from "../../types";
import { Project as ProjectType, Tag } from "../../../bindings";
import Project from "./Project";

interface ProjectListProps {
  projects: ProjectType[];
  activeView: View;
  searchQuery: string;
  selectedTags: Tag[];
}

export default function ProjectList({
  activeView,
  projects,
  searchQuery,
  selectedTags,
}: ProjectListProps) {
  return (
    <div id="project-list">
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
