import api from "app/api/api";
import { ScrumEpicDataObject } from "app/api/generated/ApiImpl";
import React, { useCallback, useEffect, useState } from "react";
import { EpicCard } from "./epic-card";
import styled from "@emotion/styled";
import { NavBar } from "app/components/navbar";
import BigText from "app/components/bigText";
import Button from "app/components/button";
import { useNavigate } from "react-router-dom";

export const EpicContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 2rem;
  align-items: center;
`;

export function EpicList() {
  const nav = useNavigate()
  const [epics, setEpics] = useState<ScrumEpicDataObject[]>([]);

  const fetchEpics = useCallback(async () => {
    setEpics((await api.getEpics(0, 100)).data);
  }, []);

  useEffect(() => {
    fetchEpics();
  }, []);

  return (
    <EpicContainer>
      <NavBar>
        <BigText>Epics</BigText>
        <Button className="rounded" onClick={() => nav(`/epic/edit`)}>
          <img src="/resources/add.svg" />
        </Button>
      </NavBar>
      {epics.map((epic) => (
        <EpicCard epic={epic} />
      ))}
    </EpicContainer>
  );
}
