import { Button } from "@chakra-ui/react";
import { View } from "../../types";
import SidebarTab from "./SidebarTab";
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { ReactNode, useCallback } from "react";
import CreateViewModal from "../modals/CreateViewModal";

interface SidebarProps {
  views: View[];
  selectedViewId: string;
  setSelectedViewId: React.Dispatch<React.SetStateAction<string>>;
  setModalContent: React.Dispatch<React.SetStateAction<ReactNode>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const versionNumber = 0.31;

export default function Sidebar({
  views,
  selectedViewId,
  setSelectedViewId,
  setIsModalOpen,
  setModalContent,
}: SidebarProps) {
  const openCreateViewModal = useCallback(() => {
    setModalContent(<CreateViewModal />);
    setIsModalOpen(true);
  }, [setIsModalOpen, setModalContent]);

  return (
    <div id="sidebar">
      <div id="sidebar-header">
        <span id="sidebar-header-logo">WRANGLE</span>
        <span id="sidebar-header-version-number">{versionNumber}</span>
      </div>
      <div id="sidebar-body">
        <div id="sidebar-tabs-list">
          {views.map((view) => (
            <SidebarTab
              key={view.id}
              view={view}
              icon={<CheckCircleIcon width={"30px"} color={`#${view.color}`} />}
              isActive={view.id === selectedViewId}
              setSelectedViewId={setSelectedViewId}
            />
          ))}
        </div>
        <Button
          onClick={openCreateViewModal}
          width="100%"
          height="10"
          backgroundColor="#828282"
        >
          <PlusIcon height="100%" />
        </Button>
      </div>
    </div>
  );
}
