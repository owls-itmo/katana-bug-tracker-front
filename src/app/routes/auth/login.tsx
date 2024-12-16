import GenericButton from "app/components/button";
import Field, { FieldInput } from "app/components/field";
import React, { useEffect } from "react";
import { LoginContainer, MIN_LENGTH } from "./login-data";
import { useForm } from "react-hook-form";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "app/api/auth";
import { REDIRECT_TO_PARAM_NAME } from "app/api/api";
import getUserToken from "app/auth/auth";
import Title from "app/components/title";
import { AuthRequestPayload } from "app/api/generated/ApiImpl";

const SubmitButton = GenericButton.withComponent("input")

export default function Login() {
  const location = useLocation();
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<AuthRequestPayload>({
    mode: "onChange",
    defaultValues: {
      password: "",
      login: "",
    },
  });

  useEffect(() => {
    if (getUserToken()) {
      navigateTo("/");
      return;
    }
  });

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Field label="Login">
        <FieldInput
          required
          {...register("login", {
            minLength: MIN_LENGTH,
          })}
        />
      </Field>
      <Field label="Password">
        <FieldInput
          required
          type="password"
          {...register("password", {
            minLength: MIN_LENGTH,
          })}
        />
      </Field>
      <Link to="/signin">Do not have an account yet? Register now</Link>
      <SubmitButton
        className="rounded"
        type="submit"
        value="Login"
        style={{ width: "100%" }}
        onClick={handleSubmit(async (data) => {
          if (isValid && isDirty) {
            await loginUser(data);
            const to = new URLSearchParams(location.search).get(
              REDIRECT_TO_PARAM_NAME
            );
            if (!to) {
              navigateTo("/");
              return;
            }

            navigateTo(decodeURI(to));
          }
        })}
      />
    </LoginContainer>
  );
}
