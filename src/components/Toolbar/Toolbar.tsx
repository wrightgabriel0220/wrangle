import { Box, Button, Flex } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import SearchBar from "./SearchBar";
import TagSelector from "../TagSelector";
import AddProjectModal from "../modals/AddProjectModal";
import { Tag } from "../../../bindings";
import { useMultipleSelection } from "downshift";
import TagBar from "./TagBar";

interface ToolbarProps {
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  searchQuery: string;
  fetchAppData: () => void;
  tags: Tag[];
}

export default function Toolbar({
  setIsModalOpen,
  setModalContent,
  fetchAppData,
  setSearchQuery,
  searchQuery,
  tags,
}: ToolbarProps) {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useMultipleSelection<string>();

  return (
    <Flex id="toolbar">
      <Flex width="100%" justifyContent="end" alignItems="center">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Box mx="5px">
          <TagSelector
            id="toolbar-tag-selector"
            name="toolbarTagSelector"
            tags={tags}
            fetchAppData={fetchAppData}
            selectedItems={selectedItems}
            addSelectedItem={addSelectedItem}
            removeSelectedItem={removeSelectedItem}
          />
        </Box>
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
    </Flex>
  );
}
