import { Flex, Heading, IconButton, List, ListItem } from "@chakra-ui/react";
import { AppData } from "../../types";
import { Project, Tag } from "../../../bindings";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface MasterDataModalProps {
  data: AppData;
  deleteProject: (id: string) => void;
  deleteTag: (id: string) => void;
  deleteView: (id: string) => void;
}

interface DatalistEntryProps {
  item: Project | Tag;
  deleteItem: () => void;
}

const DatalistEntry = ({ item, deleteItem }: DatalistEntryProps) => {
  return (
    <ListItem display="flex" justifyContent="space-between">
      {item.name}
      <IconButton
        color="red"
        onClick={deleteItem}
        aria-label="delete item"
        icon={<XMarkIcon width="30px" />}
      />
    </ListItem>
  );
};

export default function MasterDataModal({
  data,
  deleteProject,
  deleteTag,
}: MasterDataModalProps) {
  return (
    <Flex
      backgroundColor="black"
      color="white"
      height="100%"
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      overflowY="auto"
    >
      <Flex direction="column" backgroundColor="#001166" width="50%">
        <Heading fontWeight="boldest" fontSize="x-large">
          Projects
        </Heading>
        <List>
          {data.projects.map((project) => (
            <DatalistEntry
              item={project}
              deleteItem={() => deleteProject(project.id)}
            />
          ))}
        </List>
      </Flex>

      <Flex direction="column" backgroundColor="#001166" width="50%">
        <Heading fontWeight="boldest" fontSize="x-large">
          Project Tags
        </Heading>
        <List>
          {data.tags.map((tag) => (
            <DatalistEntry item={tag} deleteItem={() => deleteTag(tag.id)} />
          ))}
        </List>
      </Flex>

      {/* <Flex direction="column" backgroundColor="#001166" width="50%">
        <Heading fontWeight="boldest" fontSize="x-large">
          Views
        </Heading>
        <List>
          {data.views.map((view) => (
            <DatalistEntry item={view} deleteItem={() => deleteView(view.id)} />
          ))}
        </List>
      </Flex> */}
    </Flex>
  );
}
