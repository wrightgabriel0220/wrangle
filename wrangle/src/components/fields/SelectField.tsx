import { Box } from "@chakra-ui/react";
import { Field } from "formik";

interface SelectFieldProps {
  name: string;
  children: React.ReactNode[];
  label?: string;
}

export default function SelectField({
  name,
  label,
  children,
}: SelectFieldProps) {
  return (
    <Box display="flex" justifyContent="space-between" width="50%" my="10px">
      <label htmlFor={name}>{label ?? name}</label>
      <Box color="black">
        <Field as="select" name={name}>
          {children}
        </Field>
      </Box>
    </Box>
  );
}
