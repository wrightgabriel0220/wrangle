import { Formik, Form } from "formik";
import { Project, Tag, createTauRPCProxy } from "../../../bindings";
import { Box, Button } from "@chakra-ui/react";
import TextField from "../fields/TextField";
import SelectField from "../fields/SelectField";
import ProjectWikiURLField from "../fields/ProjectWikiURLField";
import ProjectWikiFilepathField from "../fields/ProjectWikiFilepathField";
import { useMultipleSelection } from "downshift";
import TagSelectorField from "../fields/TagSelectorField";

const taurpc = await createTauRPCProxy();

interface AddProjectModalProps {
  tags: Tag[];
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
      backgroundColor="black"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <Formik<Project>
        initialValues={{
          id: "",
          manager_url: "",
          name: "",
          tags: [],
        }}
        onSubmit={(values) => {
          taurpc.create_project(values).then((newProject) => {
            console.log("NEW PROJECT: ", newProject);
            fetchAppData();
          });
        }}
      >
        <Form id="add-project-modal-form">
          <TextField name="name" label="Name" labelColor="#FFFFFF" />
          <TextField
            name="manager_url"
            label="Project Manager URL"
            labelColor="#FFFFFF"
          />
          <SelectField name="wikiType" label="Wiki Type" labelColor="#FFFFFF">
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
          <Button
            backgroundColor="green"
            type="submit"
            mt="30px"
            p="3px"
            px="20px"
            borderRadius="5px"
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}
