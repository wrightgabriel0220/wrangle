import { IconButton } from "@chakra-ui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface ComboboxClearButtonProps {
  clearSelectedItems: () => void;
}

export default function ComboboxClearButton({
  clearSelectedItems,
}: ComboboxClearButtonProps) {
  return (
    <IconButton
      onClick={clearSelectedItems}
      aria-label="clear combobox"
      icon={<XMarkIcon width="30px" />}
    />
  );
}
