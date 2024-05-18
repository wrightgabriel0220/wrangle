import { ProjectTag } from "../../types";
import Combobox from "../Combobox/Combobox";
import Database from "@tauri-apps/plugin-sql";
import { useMultipleSelection } from "downshift";

interface TagSelectorProps {
  name: string;
  tags: ProjectTag[];
  fetchAppData: () => void;
  selectedItems: string[];
  addSelectedItem: (item: string) => void;
  removeSelectedItem: (item: string) => void;
}

const db = await Database.load("sqlite:wrangle.db");

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const createTag = (name: string) => {
  return db
    ?.execute(
      "INSERT INTO project_tags (name, description, color) VALUES ($1, $2, $3)",
      [name, "", getRandomColor()]
    )
    .then((res) => console.log("insert res: ", res));
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
        createTag(itemName).then(() => fetchAppData());
      }}
      selectedItems={selectedItems ?? internalSelectedItems}
      addSelectedItem={addSelectedItem ?? internalAddSelectedItem}
      removeSelectedItem={removeSelectedItem}
    />
  );
}
