import "./App.css";
import Database from "@tauri-apps/plugin-sql";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
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
import { Project, View } from "./types";
import ProjectList from "./components/ProjectList";

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
  const [errors, setErrors] = useState<Error[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    try {
      db.select<View[]>("SELECT * FROM views").then((queryRes) => {
        setViews([allProjectsView, testView1, testView2, ...queryRes]);
      });
      db.select<Project[]>("SELECT * FROM projects").then((queryRes) => {
        setProjects(queryRes);
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
          />
          {errors.map((error, iter) => (
            <Alert
              key={`${error.name}-${iter}`}
              color="yellow"
              content={`${error.name}: ${error.message}`}
            />
          ))}
          <ProjectList projects={projects} activeView={activeView} />
        </div>
      </div>
    </ChakraBaseProvider>
  );
}

export default App;
