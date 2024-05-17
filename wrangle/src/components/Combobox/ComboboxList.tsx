import { Button, List, ListItem, forwardRef } from "@chakra-ui/react";
import {
  UseComboboxGetItemPropsReturnValue,
  UseComboboxGetMenuPropsReturnValue,
} from "downshift";
import { SelectOption } from "../../types";

interface ComboboxListProps {
  getMenuProps: () => UseComboboxGetMenuPropsReturnValue;
  getItemProps: (options: {
    item: SelectOption;
    index: number;
  }) => UseComboboxGetItemPropsReturnValue;
  createItem: (itemName: string) => void;
  isOpen: boolean;
  inputValue: string;
  options: SelectOption[];
  addItemButtonText: string;
  visibleValues: SelectOption[];
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
  isOpen,
  inputValue,
  options,
  addItemButtonText,
  visibleValues,
  highlightedIndex,
  createItem,
}: ComboboxListProps) {
  const isInputCreateValid =
    inputValue !== "" &&
    !options.map((option) => option.display).includes(inputValue);

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
    >
      {isInputCreateValid && (
        <Button
          onClick={() => {
            createItem(inputValue);
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
          {item.display}
        </ComboboxItem>
      ))}
    </List>
  );
}
