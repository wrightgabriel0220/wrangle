import { Box, Button } from "@chakra-ui/react";
import { AppData, View } from "../../types";
import SidebarTab from "./SidebarTab";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { ReactNode, useCallback } from "react";
import MasterDataModal from "../modals/MasterDataModal";

interface SidebarProps {
  appData: AppData;
  views: View[];
  selectedViewId: string;
  setSelectedViewId: React.Dispatch<React.SetStateAction<string>>;
  setModalContent: React.Dispatch<React.SetStateAction<ReactNode>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteProject: (id: string) => void;
  deleteTag: (id: string) => void;
  deleteView: (id: string) => void;
}

const versionNumber = 0.6;

export default function Sidebar({
  views,
  appData,
  deleteProject,
  deleteTag,
  deleteView,
  selectedViewId,
  setSelectedViewId,
  setIsModalOpen,
  setModalContent,
}: SidebarProps) {
  // const openCreateViewModal = useCallback(() => {
  //   setModalContent(<CreateViewModal />);
  //   setIsModalOpen(true);
  // }, [setIsModalOpen, setModalContent]);

  const openMasterDataModal = useCallback(() => {
    setModalContent(
      <MasterDataModal
        data={appData}
        deleteProject={deleteProject}
        deleteTag={deleteTag}
        deleteView={deleteView}
      />
    );
    setIsModalOpen(true);
  }, [setIsModalOpen, setModalContent, deleteProject, deleteTag, deleteView]);

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
        <Box>
          <Button
            onClick={openMasterDataModal}
            width="100%"
            height="10"
            backgroundColor="#828282"
            marginBottom="3px"
          >
            Master Data
          </Button>
          {/* <Button
            onClick={openCreateViewModal}
            width="100%"
            height="10"
            backgroundColor="#828282"
          >
            <PlusIcon height="100%" />
          </Button> */}
        </Box>
      </div>
    </div>
  );
}
