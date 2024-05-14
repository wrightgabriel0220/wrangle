import { Button } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import SearchBar from "./SearchBar";
import TagSelector from "./TagSelector";
import AddProjectModal from "../modals/AddProjectModal";
import { ProjectTag } from "../../types";

interface ToolbarProps {
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTags: React.Dispatch<React.SetStateAction<ProjectTag[]>>;
}

export default function Toolbar({
  setIsModalOpen,
  setModalContent,
}: ToolbarProps) {
  return (
    <div id="toolbar">
      <SearchBar />
      <TagSelector />
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setModalContent(<AddProjectModal />);
        }}
        height="30px"
        backgroundColor="#83B073"
        borderRadius="100%"
      >
        <PlusIcon width="100%" height="100%" />
      </Button>
    </div>
  );
}
