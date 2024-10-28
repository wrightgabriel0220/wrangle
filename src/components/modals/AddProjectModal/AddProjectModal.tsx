import { Formik, Form, FormikHelpers } from "formik";
import { Project, Tag } from "../../../../bindings";
import { Box, Button } from "@chakra-ui/react";
import TextField from "../../fields/TextField";
import SelectField from "../../fields/SelectField";
import ProjectWikiURLField from "../../fields/ProjectWikiURLField";
import ProjectWikiFilepathField from "../../fields/ProjectWikiFilepathField";
import { useMultipleSelection } from "downshift";
import TagSelectorField from "../../fields/TagSelectorField";

interface AddProjectModalProps {
  tags: Tag[];
  fetchAppData: () => void;
  onSubmit: (value: Project, actions: FormikHelpers<Project>) => void;
  createTag: (tagName: string) => Promise<boolean>;
}

export default function AddProjectModal({
  tags,
  fetchAppData,
  onSubmit,
  createTag,
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
        onSubmit={onSubmit}
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
            createTag={createTag}
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
            name="submit"
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}
