import TextField from "./TextField";

export default function ProjectWikiURLField() {
  // const { values } = useFormikContext<Project>();

  return (
    <TextField
      name="wikiURL"
      label="Wiki URL"
      // isHidden={values.wikiType !== "WEB"}
      isHidden={true}
    />
  );
}
