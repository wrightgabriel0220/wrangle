import { Flex, IconButton, Input } from "@chakra-ui/react";
import {
  UseComboboxGetInputPropsReturnValue,
  UseComboboxGetToggleButtonPropsReturnValue,
} from "downshift";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import ComboboxClearButton from "./ComboboxClearButton";

interface ComboboxInputProps {
  isOpen: boolean;
  getInputProps: () => UseComboboxGetInputPropsReturnValue;
  getToggleButtonProps: () => UseComboboxGetToggleButtonPropsReturnValue;
  placeholder: string;
  clearSelectedItems: () => void;
}

export default function ComboboxInput({
  isOpen,
  getInputProps,
  getToggleButtonProps,
  placeholder,
  clearSelectedItems,
}: ComboboxInputProps) {
  return (
    <Flex
      direction="row"
      alignItems="center"
      backgroundColor="white"
      borderRadius="10px"
      width="100%"
      overflowX="hidden"
    >
      <ComboboxClearButton clearSelectedItems={clearSelectedItems} />
      <Input
        {...getInputProps()}
        placeholder={placeholder ?? "Search..."}
        flex="0 0 auto"
        width="500px"
        mt="3px"
        p="5px 10px"
      />
      <IconButton
        {...getToggleButtonProps()}
        aria-label="toggle menu"
        border="none"
        dropShadow="none"
        backgroundColor="inherit"
        icon={
          isOpen ? <ArrowDownIcon width="30px" /> : <ArrowUpIcon width="30px" />
        }
      />
    </Flex>
  );
}
