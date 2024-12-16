import styled from "@emotion/styled";
import { colors } from "app/styles/colors";

export const GenericButton = (background: string) => styled.div`
  background-color: ${background};
  padding: 0.7rem;
  font-size: 1rem;
  min-width: 3rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${colors.backgroundLighter};
    transition: background-color 0.2s;
  }

  &.active {
    background-color: ${colors.success};
    color: ${colors.accentContrast};
    transition: background-color 0.2s;
  }
`;

export default GenericButton(colors.backgroundDarker);


