import { Box, LinkBox, LinkOverlay, Tag } from "@chakra-ui/react";
import { Project as ProjectType } from "../../../bindings";
import ProjectWikiLinkButton from "./ProjectWikiLinkButton";
import { open } from "@tauri-apps/api/shell";

interface ProjectProps {
  project: ProjectType;
}

export default function Project({ project }: ProjectProps) {
  return (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      width="98%"
      height="75px"
      marginLeft="5px"
      marginBottom="5px"
      borderRadius="15px"
      backgroundColor="blue"
      color="white"
      fontStyle="oblique"
      className="project"
      pl="10px"
    >
      {!project.manager_url ? (
        <Box flexGrow="1">{project.name}</Box>
      ) : (
        <LinkBox display="flex" justifyContent="start" flexGrow="1">
          <LinkOverlay
            href={project.manager_url}
            onClick={(event) => {
              event.preventDefault();
              open(project.manager_url);
            }}
          >
            {project.name}
          </LinkOverlay>
        </LinkBox>
      )}
      {project.tags?.map((tag) => (
        <Tag
          size="sm"
          variant="solid"
          backgroundColor={`#${tag.color}`}
          color="#000000"
          fontWeight="semibold"
          padding="2px 10px"
          borderRadius="full"
        >
          {tag.name}
        </Tag>
      ))}
      <ProjectWikiLinkButton project={project} />
    </Box>
  );
}
