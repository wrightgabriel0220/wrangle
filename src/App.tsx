import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Toolbar from "./components/Toolbar/Toolbar";
import { Alert, ChakraBaseProvider } from "@chakra-ui/react";
import { View } from "./types";
import { Project, Tag } from "../bindings.ts";
import ProjectList from "./components/ProjectList/ProjectList";
import BaseModal from "./components/BaseModal/BaseModal.tsx";
import { createTauRPCProxy } from "../bindings.ts";

const allProjectsView: View = {
  id: "-1",
  name: "All Projects",
  filepath: "",
  color: "000000",
};

const taurpc = await createTauRPCProxy();

function App() {
  const [selectedViewId, setSelectedViewId] = useState<string>(
    allProjectsView.id
  );
  const [views] = useState<View[]>([allProjectsView]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [errors] = useState<Error[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const fetchAppData = useCallback(() => {
    taurpc.get_projects().then((projects) => setProjects(projects));
    taurpc.get_tags().then((tags) => setTags(tags));
    taurpc.get_views();
  }, []);

  useEffect(() => {
    fetchAppData();
  }, []);

  const activeView =
    views.find((view) => view.id === selectedViewId) ?? allProjectsView;

  return (
    <ChakraBaseProvider>
      <div className="container">
        <BaseModal
          isModalOpen={isModalOpen}
          modalContent={modalContent}
          onClose={() => {
            setIsModalOpen(false);
            setModalContent(null);
          }}
        />
        <Sidebar
          appData={{ projects, tags, views }}
          views={views}
          selectedViewId={selectedViewId}
          setSelectedViewId={setSelectedViewId}
          setModalContent={setModalContent}
          setIsModalOpen={setIsModalOpen}
          deleteProject={(id: string) =>
            taurpc.delete_project(id).then(() => fetchAppData())
          }
          deleteTag={(_id: string) => taurpc.delete_tag()}
          deleteView={(_id: string) => taurpc.delete_view()}
        />
        <div id="ui-pane">
          <Toolbar
            setModalContent={setModalContent}
            setIsModalOpen={setIsModalOpen}
            setSearchQuery={setSearchQuery}
            setSelectedTags={setSelectedTags}
            searchQuery={searchQuery}
            tags={tags}
            fetchAppData={fetchAppData}
          />
          {errors.map((error, iter) => (
            <Alert
              key={`${error.name}-${iter}`}
              color="yellow"
              content={`${error.name}: ${error.message}`}
            />
          ))}
          <ProjectList
            projects={projects}
            activeView={activeView}
            searchQuery={searchQuery}
            selectedTags={selectedTags}
          />
        </div>
      </div>
    </ChakraBaseProvider>
  );
}

export default App;
