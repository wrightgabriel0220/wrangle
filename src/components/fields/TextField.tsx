import { Box, FormLabel } from "@chakra-ui/react";
import { Field } from "formik";

interface TextFieldProps {
  name: string;
  isHidden?: boolean;
  label?: string;
  labelColor?: string;
}

export default function TextField({
  name,
  label,
  labelColor = "#000000",
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
        <FormLabel htmlFor={name} color={labelColor}>
          {label ?? name}
        </FormLabel>
        <Field type="text" name={name} aria-label={name} id={name} />
    </Box>
  );
}
