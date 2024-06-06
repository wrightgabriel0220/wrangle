import { Tag, createTauRPCProxy } from "../../bindings";
import Combobox from "./Combobox/Combobox";
import { useMultipleSelection } from "downshift";

const taurpc = await createTauRPCProxy();

interface TagSelectorProps {
  id?: string;
  name: string;
  tags: Tag[];
  fetchAppData: () => void;
  selectedItems: string[];
  addSelectedItem: (item: string) => void;
  removeSelectedItem: (item: string) => void;
}

export default function TagSelector({
  id,
  tags,
  fetchAppData,
  selectedItems,
  addSelectedItem,
  removeSelectedItem,
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
        taurpc.create_tag(itemName).then(() => {
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
