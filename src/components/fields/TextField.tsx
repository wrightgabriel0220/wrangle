import { Box } from "@chakra-ui/react";
import { Field } from "formik";

interface TextFieldProps {
  name: string;
  isHidden?: boolean;
  label?: string;
}

export default function TextField({
  name,
  label,
  isHidden = false,
}: TextFieldProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="50%"
      my="10px"
      hidden={isHidden}
    >
      <label htmlFor={name}>{label ?? name}</label>
      <Field type="text" name={name} />
    </Box>
  );
}
