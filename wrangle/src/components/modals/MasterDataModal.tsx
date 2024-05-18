import { Flex, Heading, List, ListItem } from "@chakra-ui/react";
import { AppData, Project, ProjectTag, View } from "../../types";

interface MasterDataModalProps {
  data: AppData;
}

interface DatalistEntryProps {
  item: Project | ProjectTag | View;
}

const DatalistEntry = ({ item }: DatalistEntryProps) => {
  return <ListItem>{item.name}</ListItem>;
};

export default function MasterDataModal({ data }: MasterDataModalProps) {
  console.log("data: ", data);

  return (
    <Flex
      backgroundColor="black"
      color="white"
      height="100%"
      direction="column"
      justifyContent="space-evenly"
    >
      <Flex direction="column" backgroundColor="#001166">
        <Heading fontWeight="boldest" fontSize="x-large">
          Projects
        </Heading>
        <List>
          {data.projects.map((project) => (
            <DatalistEntry item={project} />
          ))}
        </List>
      </Flex>

      <Flex direction="column" backgroundColor="#001166">
        <Heading fontWeight="boldest" fontSize="x-large">
          Project Tags
        </Heading>
        <List>
          {data.tags.map((tag) => (
            <DatalistEntry item={tag} />
          ))}
        </List>
      </Flex>

      <Flex direction="column" backgroundColor="#001166">
        <Heading fontWeight="boldest" fontSize="x-large">
          Views
        </Heading>
        <List>
          {data.views.map((view) => (
            <DatalistEntry item={view} />
          ))}
        </List>
      </Flex>
    </Flex>
  );
}
