import { Button, List, ListItem, forwardRef } from "@chakra-ui/react";
import {
  UseComboboxGetItemPropsReturnValue,
  UseComboboxGetMenuPropsReturnValue,
} from "downshift";

interface ComboboxListProps {
  getMenuProps: () => UseComboboxGetMenuPropsReturnValue;
  getItemProps: (options: {
    item: string;
    index: number;
  }) => UseComboboxGetItemPropsReturnValue;
  createItem: (itemName: string) => void;
  setInputValue: (input: string) => void;
  isOpen: boolean;
  inputValue: string;
  options: string[];
  addItemButtonText: string;
  visibleValues: string[];
  highlightedIndex: number;
}

interface ComboboxItemProps {
  itemIndex: number;
  highlightedIndex: number | null;
  children: React.ReactNode;
  value: any;
}

const ComboboxItem = forwardRef(
  ({
    itemIndex,
    highlightedIndex,
    value,
    children,
    ...props
  }: ComboboxItemProps) => {
    const isActive = itemIndex === highlightedIndex;

    return (
      <ListItem
        transition="background-color 220ms, color 200ms"
        bg={isActive ? "teal.100" : undefined}
        px="4px"
        py="2px"
        cursor="pointer"
        value={value}
        color="#000000"
        {...props}
      >
        {children}
      </ListItem>
    );
  }
);

export default function ComboboxList({
  getMenuProps,
  getItemProps,
  setInputValue,
  isOpen,
  inputValue,
  options,
  addItemButtonText,
  visibleValues,
  highlightedIndex,
  createItem,
}: ComboboxListProps) {
  const isInputCreateValid = inputValue !== "" && !options.includes(inputValue);

  return (
    <List
      {...getMenuProps()}
      flex="1"
      overflowY="auto"
      py="2px"
      position="absolute"
      display={isOpen ? "inline-block" : "none"}
      backgroundColor="#FFFFFF"
      width="100%"
      zIndex={999}
    >
      {isInputCreateValid && (
        <Button
          onClick={() => {
            createItem(inputValue);
            setInputValue("");
          }}
          backgroundColor="#FFFFFF"
          width="100%"
          justifyContent="start"
          p="10px"
        >
          {addItemButtonText ?? "Add new item "}"{inputValue}"
        </Button>
      )}
      {visibleValues.map((item, index) => (
        <ComboboxItem
          {...getItemProps({ item, index: index })}
          highlightedIndex={highlightedIndex}
          itemIndex={index}
          value={item}
        >
          {item}
        </ComboboxItem>
      ))}
    </List>
  );
}
