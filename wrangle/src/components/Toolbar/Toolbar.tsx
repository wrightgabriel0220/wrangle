import { Box, Button, Flex } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import SearchBar from "./SearchBar";
import TagSelector from "./TagSelector";
import AddProjectModal from "../modals/AddProjectModal";
import { ProjectTag } from "../../types";
import Database from "@tauri-apps/plugin-sql";
import { useMultipleSelection } from "downshift";
import TagBar from "./TagBar";

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
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useMultipleSelection<string>();

  console.log("selected tags in Toolbar: ", selectedItems);

  return (
    <Box>
      <Flex zIndex="2">
        <SearchBar />
        <TagSelector
          name="toolbarTagSelector"
          tags={tags}
          fetchAppData={fetchAppData}
          selectedItems={selectedItems}
          addSelectedItem={addSelectedItem}
          removeSelectedItem={removeSelectedItem}
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
      </Flex>
      <TagBar
        tags={selectedItems.map(
          (tagName) => tags.find((tag) => tag.name === tagName)!
        )}
      />
    </Box>
  );
}
