import { View } from "../../types";
import { Project as ProjectType, Tag } from "../../../bindings";
import Project from "./Project";
import { Box } from "@chakra-ui/react";

interface ProjectListProps {
  projects: ProjectType[];
  activeView: View;
  searchQuery: string;
  selectedTags: Tag[];
}

export default function ProjectList({
  projects,
  searchQuery,
  selectedTags,
}: ProjectListProps) {
  return (
    <Box id="project-list" py="10px">
      <div>
        {projects
          .filter((project) =>
            project.name?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .filter((project) =>
            selectedTags.every((selectedTag) =>
              project.tags.includes(selectedTag)
            )
          )
          .map((project) => (
            <Project key={project.id} project={project} />
          ))}
      </div>
    </Box>
  );
}
