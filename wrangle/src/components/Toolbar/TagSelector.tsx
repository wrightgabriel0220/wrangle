import { Box } from "@chakra-ui/react";
import { Field } from "formik";
import { ProjectTag } from "../../types";

interface TagSelectorProps {
  name: string;
  tags: ProjectTag[];
}

export default function TagSelector({ name, tags }: TagSelectorProps) {
  return (
    <Box display="flex" justifyContent="space-between" width="50%" my="10px">
      <label htmlFor={name}>Tags</label>
      <Box color="black">
        <Field as="select" name={name}>
          {tags.map((tag) => (
            <option value={tag.id}>{tag.name}</option>
          ))}
        </Field>
      </Box>
    </Box>
  );
}
