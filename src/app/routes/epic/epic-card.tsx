import { ScrumEpicDataObject, ScrumSprintDataObject } from "app/api/generated/ApiImpl";
import BigText from "app/components/bigText";
import { Chip } from "app/components/chip";
import { Card, Divider, InLine, InLineSmallGaps } from "app/components/detailsCard";
import { NavBar, NavGroup } from "app/components/navbar";
import { fullColors } from "app/styles/colors";
import React from "react";
import Markdown from "react-markdown";
import { IssueChip, IssueFieldLabel } from "../issue/issue-card";
import Button from "app/components/button";
import { useNavigate } from "react-router-dom";

type EpicCardProps = { epic: ScrumEpicDataObject };
export function EpicCard({ epic }: EpicCardProps) {
  const nav = useNavigate()

  return (
    <Card className="rounded">
      <NavBar>
        <NavGroup>
          <BigText>
            <InLine>
            <IssueFieldLabel>{epic.id}</IssueFieldLabel>
            {epic.name}
            </InLine>
          </BigText>
          <Chip
            style={{
              borderColor: fullColors.neutral_red,
              color: fullColors.neutral_red,
            }}
          >
            Deadline: {new Date(epic.deadline).toLocaleString()}
          </Chip>
        </NavGroup>
        <NavGroup>
          <Button className="rounded" onClick={() => nav(`/epic/edit/${epic.id!}`)}>
            <img src="/resources/edit.svg"/>
          </Button>
        </NavGroup>
      </NavBar>
      <Divider />
      <IssueFieldLabel>Sprints</IssueFieldLabel>
      <InLineSmallGaps>
        {epic.sprints.map((sprint) => (
          <Chip>
            <IssueFieldLabel>{sprint.id!}</IssueFieldLabel>
            {sprint.name}
          </Chip>
        ))}
      </InLineSmallGaps>
      <Markdown>{epic.description}</Markdown>
    </Card>
  );
}
