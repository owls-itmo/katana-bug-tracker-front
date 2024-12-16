import styled from "@emotion/styled";
import React, { createContext, useContext, useEffect, useState } from "react";
import Header from "./routes/header";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { setupInterceptors } from "./api/api";
import useGlobalErrors from "./hooks/useGlobalErrors";
import BigText from "./components/bigText";
import GenericButton from "./components/button";
import { colors } from "./styles/colors";

const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0.5rem;
  min-height: 100%;
`;

export default function Root() {
  const [isInterceptorReady, setReady] = useState(false);

  const nav = useNavigate();
  const { put } = useGlobalErrors();
  useEffect(() => {
    const cleanup = setupInterceptors(nav, put);
    setReady(true);
    return cleanup;
  }, []);

  return (
    <>
      <Header
        firstAuthor={{ first: "Костя", last: "Тернавский" }}
        secondAuthor={{ first: "Кирилл", last: "Афанасьев" }}
        group="P3306"
        variant={"Katána Bug Tracker"}
      ></Header>
      <Main>
        {isInterceptorReady && <Outlet />}
      </Main>
    </>
  );
}
