import { useFormikContext } from "formik";
import TextField from "./TextField";
import { Project } from "../../types";

export default function ProjectWikiURLField() {
  const { values } = useFormikContext<Project>();

  return (
    <TextField
      name="wikiURL"
      label="Wiki URL"
      isHidden={values.wikiType !== "WEB"}
    />
  );
}
