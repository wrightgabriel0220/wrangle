import { Box, Tooltip } from "@chakra-ui/react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function ProjectWarning() {
  return (
    <Box
      height="100%"
      display="flex"
      backgroundColor="#000044"
      borderLeftRadius="15px"
      marginRight="10px"
    >
      <Tooltip
        color="white"
        backgroundColor="black"
        border="solid 3px white"
        label="You haven't created a dashboard for this project yet!"
      >
        <ExclamationCircleIcon fill="yellow" width="30px" />
      </Tooltip>
    </Box>
  );
}
