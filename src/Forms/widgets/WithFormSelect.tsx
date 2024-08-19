import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, Control, FieldErrors, FieldValues } from "react-hook-form";

interface WithFormSelectProps<T extends FieldValues> {
  // Add extends FieldValues
  errors: FieldErrors<T>;
  control: Control<T>;
  type: Path<T>;
  label: string;
  options: { label: string; value: string | number }[];
}

function WithFormSelect<T extends FieldValues>({
  errors,
  control,
  type,
  label,
  options,
}: WithFormSelectProps<T>): JSX.Element {
  const errorMessage = errors[type]?.message;

  return (
    <Controller
      control={control}
      name={type}
      render={({ field }) => (
        <FormControl fullWidth error={!!errors[type]}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            labelId="select-label"
            id="select"
            value={field.value || ""}
            label={label}
            onChange={(e) => field.onChange(e.target.value)}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errorMessage && typeof errorMessage === "string" && (
            <FormHelperText>{errorMessage}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

export default WithFormSelect;
