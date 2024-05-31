import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Toolbar from "./components/Toolbar/Toolbar";
import { Alert, ChakraBaseProvider } from "@chakra-ui/react";
import { View } from "./types";
import { Project, Tag } from "../bindings.ts";
import ProjectList from "./components/ProjectList/ProjectList";
import BaseModal from "./components/BaseModal";
import { createTauRPCProxy } from "../bindings.ts";

const allProjectsView: View = {
  id: "-1",
  name: "All Projects",
  filepath: "",
  color: "000000",
};

const testView1: View = {
  id: "-2",
  name: "Test 1",
  filepath: "",
  color: "AAAAAA",
};

const testView2: View = {
  id: "-3",
  name: "Test 2",
  filepath: "",
  color: "FFFFFF",
};

const taurpc = await createTauRPCProxy();

function App() {
  const [selectedViewId, setSelectedViewId] = useState<string>(
    allProjectsView.id
  );
  const [views, setViews] = useState<View[]>([
    allProjectsView,
    testView1,
    testView2,
  ]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [errors] = useState<Error[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const fetchAppData = useCallback(() => {
    // db.select()
    //   .from(viewsSchema)
    //   .then((getViewsData: any[]) => setViews([...getViewsData]))
    //   .catch((err) => console.error("getViewsError: ", err));
    // db.query.projectsSchema
    //   .findMany({
    //     with: {
    //       projectsToTags: {
    //         with: {
    //           tags: true,
    //         },
    //       },
    //     },
    //   })
    //   .then((getProjectsData: any[]) => setProjects([...getProjectsData]))
    //   .catch((err) => console.error("getProjectsError: ", err));
    // db.select()
    //   .from(tagsSchema)
    //   .then((getTagsData: any[]) => setTags([...getTagsData]))
    //   .catch((err) => console.error("getTagsError: ", err));
    taurpc.get_projects().then((projects) => setProjects(projects));
    taurpc.get_tags().then((tags) => setTags(tags));
    taurpc.get_views();
  }, []);

  useEffect(() => {
    fetchAppData();
  }, []);

  // useEffect(() => {
  //   console.log("PROJECTS: ", projects);
  //   console.log("TAGS: ", tags);
  //   console.log("VIEWS: ", views);
  // }, [projects, tags, views]);

  const activeView =
    views.find((view) => view.id === selectedViewId) ?? allProjectsView;

  return (
    <ChakraBaseProvider>
      <div className="container">
        <BaseModal
          isModalOpen={isModalOpen}
          modalContent={modalContent}
          setIsModalOpen={setIsModalOpen}
          setModalContent={setModalContent}
        />
        <Sidebar
          appData={{ projects, tags, views }}
          views={views}
          selectedViewId={selectedViewId}
          setSelectedViewId={setSelectedViewId}
          setModalContent={setModalContent}
          setIsModalOpen={setIsModalOpen}
          deleteProject={(id: string) => taurpc.delete_project()}
          deleteTag={(id: string) => taurpc.delete_tag()}
          deleteView={(id: string) => taurpc.delete_view()}
        />
        <div id="ui-pane">
          <Toolbar
            setModalContent={setModalContent}
            setIsModalOpen={setIsModalOpen}
            setSearchQuery={setSearchQuery}
            setSelectedTags={setSelectedTags}
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