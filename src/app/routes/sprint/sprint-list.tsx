import api from "app/api/api";
import { ScrumSprintDataObject } from "app/api/generated/ApiImpl";
import React, { useCallback, useEffect, useState } from "react";
import { SprintCard } from "./sprint-card";
import styled from "@emotion/styled";
import { NavBar } from "app/components/navbar";
import Button from "app/components/button";
import { useNavigate } from "react-router-dom";
import BigText from "app/components/bigText";

export const SprintContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 2rem;
  align-items: center;
`;

export function SprintList() {
  const nav = useNavigate()
  
  const [sprints, setSprints] = useState<ScrumSprintDataObject[]>([]);

  const fetchSprints = useCallback(async () => {
    setSprints((await api.getSprints(0, 100)).data);
  }, []);

  useEffect(() => {
    fetchSprints();
  }, []);

  return (
    <SprintContainer>
      <NavBar>
        <BigText>Sprints</BigText>
        <Button className="rounded" onClick={() => nav(`/sprint/edit`)}>
          <img src="/resources/add.svg" style={{width: 'auto', height: "100%"}} />
        </Button>
      </NavBar>
      {sprints.map((sprint) => (
        <SprintCard sprint={sprint} />
      ))}
    </SprintContainer>
  );
}
