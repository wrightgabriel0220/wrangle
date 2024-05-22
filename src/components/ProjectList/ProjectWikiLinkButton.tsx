import { Box, Link } from "@chakra-ui/react";
import { BookOpenIcon } from "@heroicons/react/20/solid";
import { Project } from "../../types";

interface ProjectWikiLinkButton {
  project: Project;
}

export default function ProjectWikiLinkButton({
  project,
}: ProjectWikiLinkButton) {
  const isWikiDisabled = !project.wikiType;

  if (isWikiDisabled) {
    return (
      <Box
        className="project-wiki-link"
        width="50px"
        height="50px"
        marginRight="30px"
      >
        <BookOpenIcon fill="#000000" />
      </Box>
    );
  }

  return (
    <Link
      href={project.wikiURL}
      className="project-wiki-link"
      fontWeight="bolder"
      fontSize="large"
      width="50px"
      height="50px"
      marginRight="30px"
    >
      <BookOpenIcon fill="#FFFFFF" />
    </Link>
  );
}
