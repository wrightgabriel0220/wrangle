import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface BaseModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  modalContent: React.ReactNode;
}

export default function BaseModal({
  isModalOpen,
  onClose,
  modalContent,
  ...props
}: BaseModalProps) {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      size="30px"
      orientation="vertical"
    >
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropBlur="5px"
        backdropBrightness="80%"
        {...props}
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
          >X</ModalCloseButton>
        </ModalHeader>
        <ModalBody height="100%">{modalContent}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
