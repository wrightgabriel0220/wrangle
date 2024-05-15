import { useFormikContext } from "formik";
import TextField from "./TextField";
import { Project } from "../../types";

export default function ProjectWikiFilepathField() {
  const { values } = useFormikContext<Project>();

  return (
    <TextField
      name="wikiFilepath"
      label="Wiki Root Folder Filepath"
      isHidden={values.wikiType !== "MARKDOWN"}
    />
  );
}
