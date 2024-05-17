import { Badge, Flex } from "@chakra-ui/react";
import { ProjectTag } from "../../types";

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
        <Badge
          key={tag.id}
          backgroundColor={tag.color}
          borderRadius="15px"
          p="3px"
          px="10px"
        >
          {tag.name}
        </Badge>
      ))}
    </Flex>
  );
}
