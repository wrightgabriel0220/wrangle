import { Button } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import SearchBar from "./SearchBar";
import TagSelector from "./TagSelector";
import AddProjectModal from "../modals/AddProjectModal";
import { ProjectTag } from "../../types";
import { Form, Formik } from "formik";
import Database from "@tauri-apps/plugin-sql";

interface ToolbarProps {
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTags: React.Dispatch<React.SetStateAction<ProjectTag[]>>;
  fetchAppData: () => void;
  tags: ProjectTag[];
  db: Database;
}

export default function Toolbar({
  setIsModalOpen,
  setModalContent,
  fetchAppData,
  tags,
}: ToolbarProps) {
  return (
    <Formik
      initialValues={{ searchQuery: "", tags: [] }}
      onSubmit={(res) => {
        console.log("result: ", res);
      }}
    >
      <Form id="toolbar">
        <SearchBar />
        <TagSelector
          name="toolbarTagSelector"
          tags={tags}
          fetchAppData={fetchAppData}
        />
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setModalContent(
              <AddProjectModal tags={tags} fetchAppData={fetchAppData} />
            );
          }}
          height="30px"
          backgroundColor="#83B073"
          borderRadius="100%"
        >
          <PlusIcon width="100%" height="100%" />
        </Button>
      </Form>
    </Formik>
  );
}
