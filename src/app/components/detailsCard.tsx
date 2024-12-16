import styled from "@emotion/styled";
import { colors } from "app/styles/colors";



export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 0.25rem solid ${colors.backgroundDarker};
  padding: 2rem;
  gap: 1rem;
`;

export const InLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.5rem;
  row-gap: 0.5rem;
  align-items: center
`

export const InLineSmallGaps = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.4rem;
  row-gap: 0.5rem;
  align-items: center
`

export const Divider = styled.hr`
  height: 0.1rem;
  background-color: ${colors.backgroundLighter};
`;


export const VDivider = styled.div`
  width: 0.1rem;
  align-self: stretch;
  border-radius: 1rem;
  background-color: ${colors.backgroundLighter};
`
