import { db } from "../db/database";
import { tagsSchema } from "../db/schema";
import { ProjectTag } from "../types";
import Combobox from "./Combobox/Combobox";
import { useMultipleSelection } from "downshift";

interface TagSelectorProps {
  name: string;
  tags: ProjectTag[];
  fetchAppData: () => void;
  selectedItems: string[];
  addSelectedItem: (item: string) => void;
  removeSelectedItem: (item: string) => void;
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const createTag = (name: string, fetchAppData: () => void) => {
  return db
    .insert(tagsSchema)
    .values({
      name,
      color: getRandomColor(),
    })
    .then(() => fetchAppData())
    .catch((err) => console.error("createTagError: ", err));
};

export default function TagSelector({
  tags,
  fetchAppData,
  selectedItems,
  addSelectedItem,
  removeSelectedItem,
}: TagSelectorProps) {
  const {
    selectedItems: internalSelectedItems,
    addSelectedItem: internalAddSelectedItem,
  } = useMultipleSelection<string>();

  return (
    <Combobox
      label="Tags"
      addItemButtonText="Add new tag "
      placeholder="Search tags..."
      options={tags.map((tag) => tag.name)}
      createItem={(itemName) => {
        createTag(itemName, fetchAppData);
      }}
      selectedItems={selectedItems ?? internalSelectedItems}
      addSelectedItem={addSelectedItem ?? internalAddSelectedItem}
      removeSelectedItem={removeSelectedItem}
    />
  );
}
