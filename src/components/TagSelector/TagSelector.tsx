import { Tag } from "../../../bindings";
import Combobox from "../Combobox/Combobox";
import { useMultipleSelection } from "downshift";

interface TagSelectorProps {
  id?: string;
  name: string;
  tags: Tag[];
  fetchAppData: () => void;
  selectedItems: string[];
  addSelectedItem: (item: string) => void;
  removeSelectedItem: (item: string) => void;
  createTag: (tagName: string) => Promise<boolean>;
}

export default function TagSelector({
  id,
  tags,
  fetchAppData,
  selectedItems,
  addSelectedItem,
  removeSelectedItem,
  createTag
}: TagSelectorProps) {
  const {
    selectedItems: internalSelectedItems,
    addSelectedItem: internalAddSelectedItem,
    getDropdownProps,
  } = useMultipleSelection<string>();

  return (
    <Combobox
      id={id}
      label="Tags"
      addItemButtonText="Add new tag "
      placeholder="Search tags..."
      options={tags.map((tag) => tag.name)}
      createItem={(itemName) => {
        createTag(itemName).then(() => {
          fetchAppData();
        });
      }}
      getDropdownProps={getDropdownProps}
      selectedItems={selectedItems ?? internalSelectedItems}
      addSelectedItem={addSelectedItem ?? internalAddSelectedItem}
      removeSelectedItem={removeSelectedItem}
    />
  );
}
