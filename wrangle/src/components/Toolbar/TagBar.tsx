import { Flex } from "@chakra-ui/react";
import { ProjectTag } from "../../types";
import TagBadge from "../TagBadge";

interface TagBarProps {
  tags: ProjectTag[];
}

export default function TagBar({ tags }: TagBarProps) {
  return (
    <Flex
      id="tag-bar"
      backgroundColor="#2F2F2F"
      color="white"
      position="relative"
      zIndex="0"
      top={tags.length > 0 ? "0%" : "-80%"}
    >
      {tags.map((tag) => (
        <TagBadge tag={tag} />
      ))}
    </Flex>
  );
}
