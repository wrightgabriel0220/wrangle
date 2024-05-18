import { Box, Flex } from "@chakra-ui/react";
import { useCombobox } from "downshift";
import { useCallback, useState } from "react";
import ComboboxInput from "./ComboboxInput";
import ComboboxList from "./ComboboxList";

interface ComboboxProps {
  label?: string;
  options: string[];
  createItem: (itemName: string) => void;
  placeholder?: string;
  addItemButtonText?: string;
  selectedItems: string[];
  addSelectedItem: (item: string) => void;
  removeSelectedItem: (item: string) => void;
}

export default function Combobox({
  label,
  options,
  createItem,
  placeholder,
  addItemButtonText,
  selectedItems,
  addSelectedItem,
  removeSelectedItem,
}: ComboboxProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [visibleValues, setVisibleValues] = useState<string[]>(options);

  const {
    isOpen,
    highlightedIndex,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    onSelectedItemChange: (changes) => {
      addSelectedItem(changes.selectedItem);
      setVisibleValues(
        options.filter(
          (option) =>
            !selectedItems.includes(option) &&
            option.startsWith(changes.inputValue ?? "")
        )
      );
    },
    onInputValueChange: (changes) => {
      setInputValue(changes.inputValue);
      setVisibleValues(
        options.filter((option) => option.startsWith(changes.inputValue))
      );
    },
    items: visibleValues,
  });

  const clearSelectedItems = useCallback(() => {
    console.log("CLEARING");
    selectedItems.forEach((item) => removeSelectedItem(item));
  }, [selectedItems, removeSelectedItem]);

  return (
    <Flex direction="column" align="center">
      <label {...getLabelProps()} color="white">
        {label}
      </label>
      <Flex direction="column" flex="1 1 auto">
        <ComboboxInput
          getInputProps={getInputProps}
          getToggleButtonProps={getToggleButtonProps}
          clearSelectedItems={clearSelectedItems}
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
