import { Badge } from "@chakra-ui/react";
import { Tag } from "../../bindings";

interface TagBadgeProps {
  tag: Tag;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <Badge
      key={tag.id}
      backgroundColor={`#${tag.color}`}
      borderRadius="15px"
      p="3px"
      px="10px"
    >
      {tag.name}
    </Badge>
  );
}
