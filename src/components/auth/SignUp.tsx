"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Control, useForm } from "react-hook-form";
import { z as zod } from "zod";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../utill/firebase";
import WithFormInput from "../../Forms/widgets/WithFormInput";
import WithFormSelect from "../../Forms/widgets/WithFormSelect";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const schema = zod.object({
  userName: zod.string().min(1, { message: "First name is required" }),
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
  userType: zod.string().min(1, { message: "UserType is required" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  userName: "",
  email: "",
  password: "",
  userType: "",
} satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const control: Control<Values> = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  }).control;

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        if (userCredential.user) {
          await updateProfile(userCredential.user, {
            displayName: values.userName,
          });
        }
        setIsPending(false);
      } catch (error) {
        const firebaseError = error as FirebaseError;
        setError("root", {
          type: "server",
          message: firebaseError?.message ?? "",
        });
        setIsPending(false);
      }
    },
    [setError]
  );

  return (
    <div className="flex justify-center items-center p-5">
      <Stack spacing={3} width={600}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <WithFormInput
              control={control}
              label={"User Name"}
              errors={errors}
              type={"userName"}
            />
            <WithFormInput
              control={control}
              label={"Email"}
              errors={errors}
              type={"email"}
            />
            <WithFormInput
              control={control}
              label={"Password"}
              errors={errors}
              type={"password"}
              inpType="password"
            />
            <WithFormSelect
              control={control}
              label={"User Type"}
              errors={errors}
              type={"userType"}
              options={[
                { label: "Team Lead", value: "TL" },
                { label: "Developer", value: "DEV" },
                { label: "Viewer", value: "VWR" },
              ]}
            />

            {errors.root ? (
              <Alert color="error">{errors.root.message}</Alert>
            ) : null}
            <Button disabled={isPending} type="submit" variant="contained">
              Sign up
            </Button>
            <div className="flex justify-center items-center">
              <Typography color="text.secondary" variant="body2">
                Already have an account?
              </Typography>
              <Button type="button" variant="text">
                <Link to="/signin">Sign In</Link>
              </Button>
            </div>
          </Stack>
        </form>
      </Stack>
    </div>
  );
}
