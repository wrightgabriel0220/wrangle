import { Field } from "formik";
import { ProjectTag } from "../../types";
import Combobox from "../Combobox/Combobox";
import Database from "@tauri-apps/plugin-sql";

interface TagSelectorProps {
  name: string;
  tags: ProjectTag[];
  fetchAppData: () => void;
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
  console.log(`CREATING TAG "${name}" IN DB ${db}`);
  return db
    ?.execute(
      "INSERT INTO project_tags (name, description, color) VALUES ($1, $2, $3)",
      [name, "", getRandomColor()]
    )
    .then((res) => console.log("insert res: ", res));
};

export default function TagSelector({
  name,
  tags,
  fetchAppData,
}: TagSelectorProps) {
  return (
    // <Field name={name}>
    <Combobox
      label="Tags"
      addItemButtonText="Add new tag "
      placeholder="Search tags..."
      options={tags.map((tag) => ({ display: tag.name, value: tag.id }))}
      createItem={(itemName) => {
        createTag(itemName).then(() => fetchAppData());
      }}
    />
    // </Field>
  );
}
