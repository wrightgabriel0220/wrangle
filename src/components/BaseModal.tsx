import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface BaseModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalContent: React.ReactNode;
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

export default function BaseModal({
  isModalOpen,
  setIsModalOpen,
  modalContent,
  setModalContent,
}: BaseModalProps) {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setModalContent(null);
      }}
      size="30px"
      orientation="vertical"
    >
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropBlur="5px"
        backdropBrightness="80%"
      />
      <ModalContent margin="auto" height="95%" width="50%">
        <ModalHeader
          backgroundColor="#403D3D"
          display="flex"
          justifyContent="end"
          padding="10px 30px"
        >
          <ModalCloseButton
            p="5px"
            backgroundColor="#A8A8A8"
            borderRadius="full"
          />
        </ModalHeader>
        <ModalBody height="100%">{modalContent}</ModalBody>

        <ModalFooter backgroundColor="#2F2F2F" py="5px" pr="50px">
          <Button
            backgroundColor="red"
            mr={3}
            p="3px"
            onClick={() => {
              setIsModalOpen(false);
              setModalContent(null);
            }}
          >
            Close
          </Button>
          <Button backgroundColor="green" p="3px">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
