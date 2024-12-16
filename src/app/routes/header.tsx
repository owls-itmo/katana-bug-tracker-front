import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { getUserData } from "app/auth/auth";
import { GenericButton } from "app/components/button";
import { colors } from "app/styles/colors";
import { fantasyFontName } from "app/styles/fonts";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserInfoAndActions from "./userInfo";
import { NavGroup } from "app/components/navbar";

export type HeaderProps = {
  secondAuthor: {
    first: string,
    last: string,
  },
  firstAuthor: {
    first: string;
    last: string;
  };
  group: string;
  variant: string;
};

const LighterButton = GenericButton(colors.background);

const StyledHeader = styled.div`
  font-size: 1.5rem;
  display: flex;
  width: 100%;
  background-color: ${colors.backgroundDarker};
  padding: 1rem;
  justify-content: space-between;
`;

const Author = styled.div`
  display: flex;
  font-family: "${fantasyFontName}";
  flex-direction: column;

  min-width: 25rem;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeaderButtonStyles = css`
  display: flex;
  text-align: center;
  align-items: center;
  cursor: pointer;
  padding: 0 2rem;

  &:hover {
    background-color: ${colors.backgroundLighter};
    transition: background-color 0.2s;
  }
`;

export default function Header({ firstAuthor, secondAuthor, group, variant }: HeaderProps) {
  const nav = useNavigate();

  return (
    <StyledHeader>
      <Author>
        <div>
          {" "}
          {firstAuthor.last} {firstAuthor.first}{" "}
        </div>
        <Info>
          <div> {group.toUpperCase()} </div>
          <div> {variant} </div>
        </Info>
      </Author>
      <Author>
        <div>
          {" "}
          {secondAuthor.last} {secondAuthor.first}{" "}
        </div>
        <Info>
          <div> {group.toUpperCase()} </div>
          <div> {variant} </div>
        </Info>
      </Author>
      <NavGroup>
        <LighterButton className="rounded" onClick={() => nav("epic")} >Epics</LighterButton>
        <LighterButton className="rounded" onClick={() => nav("sprint")} >Sprints</LighterButton>
        <LighterButton className="rounded" onClick={() => nav("issue")} >Issues</LighterButton>
      </NavGroup>
      <UserInfoAndActions />
    </StyledHeader>
  );
}
