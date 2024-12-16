import styled from "@emotion/styled";
import { colors } from "app/styles/colors";
import React from "react";

export type FieldProps = React.PropsWithChildren<{ label: string }>;

const FieldStyled = styled.div`
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.label`
  min-width: 5rem;
`;

const Content = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export default function ({ children, label }: FieldProps) {
  return (
    <FieldStyled>
      <Label>{label}</Label>
      <Content>{children}</Content>
    </FieldStyled>
  );
}

export const FieldInput = styled.input`
  border-radius: 0.5rem;
  background-color: ${colors.backgroundDarker};
  padding: 0.5rem;
  transition: background-color 0.2s;
  width: 100%;
  field-sizing: content;
  min-width: 10rem;

  &.invalid {
    color: ${colors.errorAccent};
    transition: background-color 0.2s;
  }
`;
