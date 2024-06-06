import { Input } from "@chakra-ui/react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <Input
      placeholder="Search..."
      onChange={(event) => {
        setSearchQuery(event.target.value);
      }}
      value={searchQuery}
      width="50%"
      height="60%"
      mx="5px"
      p="20px"
      borderRadius="5px"
    />
  );
}
