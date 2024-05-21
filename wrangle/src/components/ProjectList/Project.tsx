import { Box, LinkBox, LinkOverlay, Tag } from "@chakra-ui/react";
import { Project as ProjectType } from "../../types";
import ProjectWarning from "./ProjectWarning";
import ProjectWikiLinkButton from "./ProjectWikiLinkButton";

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
    >
      {!project.dashboard && <ProjectWarning />}
      {!project.dashboard ? (
        <Box flexGrow="1">{project.name}</Box>
      ) : (
        <LinkBox display="flex" justifyContent="start" flexGrow="1">
          <LinkOverlay href={project.dashboard?.url}>
            {project.name}
          </LinkOverlay>
        </LinkBox>
      )}
      {project.tags?.map((projectTag) => (
        <Tag
          size="sm"
          variant="solid"
          backgroundColor={`#${projectTag.color}`}
          color="#000000"
          fontWeight="semibold"
          padding="2px 10px"
          borderRadius="full"
        >
          {projectTag.name}
        </Tag>
      ))}
      <ProjectWikiLinkButton project={project} />
    </Box>
  );
}
