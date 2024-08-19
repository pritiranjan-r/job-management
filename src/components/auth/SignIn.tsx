"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import WithFormInput from "../../Forms/widgets/WithFormInput";
import { auth, db } from "../../utill/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FirebaseError } from "firebase/app";
import { RootState } from "../../store";
import { UserType } from "../../slices/authSlice";
import useUser from "../../hooks/useUser";

const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod.string().min(1, { message: "Password is required" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  email: "",
  password: "",
} satisfies Values;

export function SignInForm(): React.JSX.Element {
  const { user, userloading } = useUser();
  console.log(user);
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        console.log(userCredential.user);
        fetchUserById(userCredential.user.uid);
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

  if (userloading) {
    return <>Loading....</>;
  }
  if (user) {
    return <Navigate to={"/"} replace />;
  }

  async function fetchUserById(userId: string) {
    const userCollection = collection(db, "user_info"); // Replace "users" with your collection name
    const userQuery = query(userCollection, where("uid", "==", userId)); // Query where 'id' is '123'
    const querySnapshot = await getDocs(userQuery);

    const user = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      roles: doc.data().role, // User roles
      ...doc.data(), // All other data in the document
    }));
    console.log("======>", user);
  }

  return (
    <div className="flex w-full justify-center items-center p-5">
      <Stack spacing={4} width={600}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
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

            {errors.root ? (
              <Alert color="error">{errors.root.message}</Alert>
            ) : null}
            <Button disabled={isPending} type="submit" variant="contained">
              Sign in
            </Button>
            <div className="flex justify-center items-center">
              <Typography color="text.secondary" variant="body2">
                Don't have an account?
              </Typography>
              <Button type="button" variant="text">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </Stack>
        </form>
      </Stack>
    </div>
  );
}
