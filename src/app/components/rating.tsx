import React from "react"
import styled from "@emotion/styled";

import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";


const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

type RatingProps = {ratio: number, onUp: () => void, onDown: () => void}
export function Rating({ratio, onUp, onDown}: RatingProps) {
  return (
    <RatingContainer>
      <ArrowDownwardRoundedIcon onClick={onDown} />
      {ratio}
      <ArrowUpwardRoundedIcon onClick={onUp} />
    </RatingContainer>
  );
}
