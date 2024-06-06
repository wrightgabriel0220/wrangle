import { Box, Flex } from "@chakra-ui/react";
import {
  UseMultipleSelectionGetDropdownReturnValue,
  useCombobox,
} from "downshift";
import { useCallback, useRef, useState } from "react";
import ComboboxInput from "./ComboboxInput";
import ComboboxList from "./ComboboxList";

interface ComboboxProps {
  id?: string;
  label?: string;
  options: string[];
  createItem: (itemName: string) => void;
  placeholder?: string;
  addItemButtonText?: string;
  selectedItems: string[];
  addSelectedItem: (item: string) => void;
  removeSelectedItem: (item: string) => void;
  getDropdownProps: () => UseMultipleSelectionGetDropdownReturnValue;
}

export default function Combobox({
  id,
  label,
  options,
  createItem,
  placeholder,
  addItemButtonText,
  selectedItems,
  addSelectedItem,
  removeSelectedItem,
  getDropdownProps,
}: ComboboxProps) {
  const listRef = useRef();

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
    setInputValue: setDropshiftInputValue,
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
      setDropshiftInputValue("");
    },
    onInputValueChange: (changes) => {
      setInputValue(changes.inputValue);
      setVisibleValues(
        options.filter(
          (option) =>
            option.startsWith(changes.inputValue) &&
            !selectedItems.includes(option)
        )
      );
    },
    items: visibleValues,
  });

  const clearSelectedItems = useCallback(() => {
    selectedItems.forEach((item) => removeSelectedItem(item));
  }, [selectedItems, removeSelectedItem]);

  return (
    <Flex id={id} direction="column" align="center">
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
            getDropdownProps={getDropdownProps}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            createItem={createItem}
            setInputValue={setDropshiftInputValue}
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
