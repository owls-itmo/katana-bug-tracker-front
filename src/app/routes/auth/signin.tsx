import React from "react";
import { LoginContainer, MIN_LENGTH } from "./login-data";
import Field, { FieldInput } from "app/components/field";
import GenericButton from "app/components/button";
import { useForm } from "react-hook-form";
import { registerAndLoginUser } from "app/api/auth";
import Title from "app/components/title";
import { Link, useNavigate } from "react-router-dom";
import { RegisterRequestPayload } from "app/api/generated/ApiImpl";

export default function () {
  const nav = useNavigate()
  
  const {register, handleSubmit, formState: {isDirty, isValid}} = useForm<RegisterRequestPayload>({
    defaultValues: {
      password: "",
      username: "",
      displayName: "",
      email: "",
    }
  })
  
  return (
    <LoginContainer>
      <Title>Register</Title>
      <Field label="Login">
        <FieldInput {...register("username", {
          minLength: MIN_LENGTH
        })}/>
      </Field>
      <Field label="Displayed name">
        <FieldInput {...register("displayName", {
          minLength: MIN_LENGTH
        })}/>
      </Field>
      <Field label="password" >
        <FieldInput type="password" {...register("password", {minLength: MIN_LENGTH})}/>
      </Field>
      <Link to="/login" >Already have an account? Click to login</Link>
      <GenericButton className="rounded" style={{ width: "100%" }} onClick={handleSubmit(async (data) => {
        if (isDirty && isValid) {
         registerAndLoginUser(nav)(data)
        }
      })}>
        Sign in
      </GenericButton>
    </LoginContainer>
  );
}
