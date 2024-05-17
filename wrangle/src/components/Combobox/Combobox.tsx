import { Box, Flex } from "@chakra-ui/react";
import { useCombobox } from "downshift";
import { useState } from "react";
import { SelectOption } from "../../types";
import ComboboxInput from "./ComboboxInput";
import ComboboxList from "./ComboboxList";

interface ComboboxProps {
  label?: string;
  options: SelectOption[];
  createItem: (itemName: string) => void;
  placeholder?: string;
  addItemButtonText?: string;
}

export default function Combobox({
  label,
  options,
  createItem,
  placeholder,
  addItemButtonText,
}: ComboboxProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [visibleValues, setVisibleValues] = useState<SelectOption[]>(options);

  const {
    isOpen,
    highlightedIndex,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    onInputValueChange: (changes) => {
      setInputValue(changes.inputValue);
      setVisibleValues(
        options.filter((option) =>
          option.display.startsWith(changes.inputValue)
        )
      );
    },
    items: visibleValues,
  });

  return (
    <Flex direction="column" align="center">
      <label {...getLabelProps()}>{label}</label>
      <Flex direction="column" flex="1 1 auto">
        <ComboboxInput
          getInputProps={getInputProps}
          getToggleButtonProps={getToggleButtonProps}
          isOpen={isOpen}
          placeholder={placeholder ?? "Search..."}
        />
        <Box position="relative" top="20%">
          <ComboboxList
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            createItem={createItem}
            addItemButtonText={addItemButtonText ?? ""}
            highlightedIndex={highlightedIndex}
            inputValue={inputValue}
            isOpen={isOpen}
            options={options}
            visibleValues={visibleValues}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
