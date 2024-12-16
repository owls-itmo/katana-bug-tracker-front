import React from "react";
import emotionStyled from "@emotion/styled";
import { colors } from "app/styles/colors";

const tableContainerStyles = {
  display: "flex",
  width: "100%",
};

const ResultsTable = emotionStyled.table`
  border-collapse: collapse;
  overflow: hidden;
  width: 100%;
  border: 0.25rem solid ${colors.backgroundLight};

  & tr {
    border-bottom: 0.1rem solid ${colors.backgroundLight};
    cursor: pointer;
  }

  & th,
  & td {
    text-align: center;
  }

  & thead {
    border-bottom: 0.25rem solid ${colors.backgroundLight};

    & tr:first-child th:hover {
      background-color: ${colors.backgroundLighter};
    }

    & th {
      padding: 0.5rem;
      border-right: 0.2rem solid ${colors.backgroundLight};
      border-left: 0.2rem solid ${colors.backgroundLight};
    }
  }

  & tbody {
    & tr {
      &:hover {
        background-color: ${colors.backgroundLighter};
      }

      & td:first-child {
        width: 9rem;
      }

      &:last-child {
        border-bottom: none;
      }
    }

    & td {
      padding: 0.3rem;
    }
  }
`;

export function TableContainer({ children }: React.PropsWithChildren) {
  return (
    <results-container style={tableContainerStyles}>
      <ResultsTable>{children}</ResultsTable>
    </results-container>
  );
}
