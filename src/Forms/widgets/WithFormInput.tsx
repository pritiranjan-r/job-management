import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Controller } from "react-hook-form";

const WithFormInput = ({
  errors,
  control,
  type,
  label,
  inpType = "text",
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  type: string;
  label: string;
  inpType?: string;
}) => {
  return (
    <Controller
      control={control}
      name={type}
      render={({ field }) => (
        <FormControl error={Boolean(errors?.userName)}>
          <InputLabel>{label}</InputLabel>
          <OutlinedInput {...field} label={label} type={inpType} />
          {errors[type] ? (
            <FormHelperText>{errors[type]?.message}</FormHelperText>
          ) : null}
        </FormControl>
      )}
    />
  );
};

export default WithFormInput;
