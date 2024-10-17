import { Flex } from "@chakra-ui/react";
import { FieldArray, FieldArrayRenderProps } from "formik";
import TagSelector from "../TagSelector/TagSelector";
import { Tag } from "../../../bindings";
import TagBar from "../Toolbar/TagBar";

interface TagSelectorFieldProps {
  addSelectedItem: (id: string) => void;
  fetchAppData: () => void;
  removeSelectedItem: (id: string) => void;
  selectedItems: string[];
  tags: Tag[];
  name: string;
}

export default function TagSelectorField({
  addSelectedItem,
  fetchAppData,
  removeSelectedItem,
  selectedItems,
  tags,
  name,
}: TagSelectorFieldProps) {
  return (
    <Flex direction="column">
      <FieldArray
        name="tags"
        render={(fieldArrayHelpers: FieldArrayRenderProps) => (
          <TagSelector
            name={name}
            addSelectedItem={(item: string) => {
              fieldArrayHelpers.push(tags.find((tag) => tag.name === item));
              addSelectedItem(item);
            }}
            fetchAppData={fetchAppData}
            removeSelectedItem={(item: string) => {
              const targetID = fieldArrayHelpers.form.values.tags.find(
                (tag: Tag) => tag.name === item
              );
              fieldArrayHelpers.remove(targetID);
              removeSelectedItem(item);
            }}
            selectedItems={selectedItems}
            tags={tags}
          />
        )}
      />
      <TagBar
        tags={selectedItems.map(
          (selectedTag) => tags.find((tag) => selectedTag === tag.name)!
        )}
      />
    </Flex>
  );
}
