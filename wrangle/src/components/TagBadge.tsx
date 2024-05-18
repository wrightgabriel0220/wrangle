import { Badge } from "@chakra-ui/react";
import { ProjectTag } from "../types";

interface TagBadgeProps {
  tag: ProjectTag;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <Badge
      key={tag.id}
      backgroundColor={tag.color}
      borderRadius="15px"
      p="3px"
      px="10px"
    >
      {tag.name}
    </Badge>
  );
}
