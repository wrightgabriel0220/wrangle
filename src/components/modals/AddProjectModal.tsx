import { Formik, Form } from "formik";
import { Project, ProjectTag } from "../../types";
import { Box, Button } from "@chakra-ui/react";
import TextField from "../fields/TextField";
import SelectField from "../fields/SelectField";
import ProjectWikiURLField from "../fields/ProjectWikiURLField";
import ProjectWikiFilepathField from "../fields/ProjectWikiFilepathField";
import { useMultipleSelection } from "downshift";
import TagSelectorField from "../fields/TagSelectorField";

interface AddProjectModalProps {
  tags: ProjectTag[];
  fetchAppData: () => void;
}

export default function AddProjectModal({
  tags,
  fetchAppData,
}: AddProjectModalProps) {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useMultipleSelection<string>();

  return (
    <Box
      color="white"
      backgroundColor="black"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <Formik<Project>
        initialValues={{
          id: "",
          name: "",
          tags: [],
        }}
        onSubmit={(values) => {
          console.log("values: ", values);
        }}
      >
        <Form id="add-project-modal-form">
          <TextField name="name" label="Name" />
          <SelectField name="wikiType" label="Wiki Type">
            <option value="">N/A</option>
            <option value="MARKDOWN">Markdown</option>
            <option value="WEB">Web</option>
          </SelectField>
          <ProjectWikiURLField />
          <ProjectWikiFilepathField />
          <TagSelectorField
            name="addProjectTagSelector"
            addSelectedItem={addSelectedItem}
            tags={tags}
            fetchAppData={fetchAppData}
            selectedItems={selectedItems}
            removeSelectedItem={removeSelectedItem}
          />
          <Button backgroundColor="green" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}
