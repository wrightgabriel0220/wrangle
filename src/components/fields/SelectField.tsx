import { Box, FormLabel } from "@chakra-ui/react";
import { Field } from "formik";

interface SelectFieldProps {
  name: string;
  children: React.ReactNode[];
  label?: string;
  labelColor?: string;
}

export default function SelectField({
  name,
  label,
  children,
  labelColor = "#000000",
}: SelectFieldProps) {
  return (
    <Box display="flex" justifyContent="space-between" width="50%" my="10px">
      <FormLabel htmlFor={name} color={labelColor}>
        {label ?? name}
      </FormLabel>
      <Box color="black">
        <Field as="select" name={name}>
          {children}
        </Field>
      </Box>
    </Box>
  );
}
