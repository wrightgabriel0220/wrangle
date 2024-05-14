import "./App.css";
import Database from "@tauri-apps/plugin-sql";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Toolbar from "./components/Toolbar/Toolbar";
import {
  Alert,
  Button,
  ChakraBaseProvider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Project, ProjectTag, View } from "./types";
import ProjectList from "./components/ProjectList/ProjectList";

const db = await Database.load("sqlite:wrangle.db");

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

const TestTagAlpha: ProjectTag = {
  id: "-1",
  name: "alpha",
  description: "test tag alpha",
  color: "01FBAA",
};

const TestTagBeta: ProjectTag = {
  id: "-2",
  name: "beta",
  description: "test tag beta",
  color: "FF00BC",
};

const TestTagOmega: ProjectTag = {
  id: "-3",
  name: "omega",
  description: "test tag omega",
  color: "AB9A89",
};

const testProject1: Project = {
  id: "-1",
  name: "Test Project 1",
  wikiType: "WEB",
  wikiURL: "https://www.homiehublab.com/",
  tags: [TestTagAlpha],
};
const testProject2: Project = {
  id: "-2",
  name: "Test Project 2",
  tags: [TestTagAlpha, TestTagOmega],
};
const testProject3: Project = {
  id: "-3",
  name: "Test Project 3",
  tags: [TestTagBeta],
};
const testProject4: Project = {
  id: "-4",
  name: "Test Project 4",
  tags: [],
};
const testProject5: Project = {
  id: "-5",
  name: "Test Project 5",
  tags: [TestTagOmega],
};
const testProject6: Project = {
  id: "-6",
  name: "Test Project 6",
  tags: [],
};
const testProject7: Project = {
  id: "-7",
  name: "Test Project 7",
  tags: [],
};
const testProject8: Project = {
  id: "-8",
  name: "Test Project 8",
  tags: [],
};
const testProject9: Project = {
  id: "-9",
  name: "Test Project 9",
  tags: [],
};
const testProject10: Project = {
  id: "-10",
  name: "Test Project 10",
  tags: [],
};
const testProject11: Project = {
  id: "-11",
  name: "Test Project 11",
  tags: [],
};
const testProject12: Project = {
  id: "-12",
  name: "Test Project 12",
  tags: [],
};
const testProject13: Project = {
  id: "-13",
  name: "Test Project 13",
  tags: [],
};

function App() {
  const [selectedViewId, setSelectedViewId] = useState<string>(
    allProjectsView.id
  );
  const [views, setViews] = useState<View[]>([
    allProjectsView,
    testView1,
    testView2,
  ]);
  const [projects, setProjects] = useState<Project[]>([
    testProject1,
    testProject2,
    testProject3,
    testProject4,
    testProject5,
  ]);
  const [errors, setErrors] = useState<Error[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<ProjectTag[]>([]);

  useEffect(() => {
    try {
      db.select<View[]>("SELECT * FROM views").then((queryRes) => {
        setViews([allProjectsView, testView1, testView2, ...queryRes]);
      });
      db.select<Project[]>("SELECT * FROM projects").then((queryRes) => {
        setProjects([
          testProject1,
          testProject2,
          testProject3,
          testProject4,
          testProject5,
          testProject6,
          testProject7,
          testProject8,
          testProject9,
          testProject10,
          testProject11,
          testProject12,
          testProject13,
          ...queryRes,
        ]);
      });
    } catch (err) {
      setErrors(errors.concat(err as Error));
    }
  }, []);

  // useEffect(() => {
  //   console.log("MODALCONTENT: ", modalContent);
  //   console.log("ISMODALOPEN: ", isModalOpen);
  //   console.log("VIEWS: ", views);
  // }, [views, modalContent, isModalOpen]);

  const activeView =
    views.find((view) => view.id === selectedViewId) ?? allProjectsView;

  return (
    <ChakraBaseProvider>
      <div className="container">
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setModalContent(null);
          }}
        >
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropBlur="5px"
            backdropBrightness="80%"
          />
          <ModalContent>
            <ModalHeader
              display="flex"
              justifyContent="end"
              padding="10px 30px"
            >
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>{modalContent}</ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  setIsModalOpen(false);
                  setModalContent(null);
                }}
              >
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Sidebar
          views={views}
          selectedViewId={selectedViewId}
          setSelectedViewId={setSelectedViewId}
          setModalContent={setModalContent}
          setIsModalOpen={setIsModalOpen}
        />
        <div id="ui-pane">
          <Toolbar
            setModalContent={setModalContent}
            setIsModalOpen={setIsModalOpen}
            setSearchQuery={setSearchQuery}
            setSelectedTags={setSelectedTags}
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
