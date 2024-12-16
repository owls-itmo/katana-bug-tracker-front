import { ScrumSprintDataObject } from "app/api/generated/ApiImpl";
import BigText from "app/components/bigText";
import { Chip } from "app/components/chip";
import {
  Card,
  Divider,
  InLine,
  InLineSmallGaps,
  VDivider,
} from "app/components/detailsCard";
import { NavBar, NavGroup } from "app/components/navbar";
import { fullColors } from "app/styles/colors";
import React from "react";
import Markdown from "react-markdown";
import { IssueChip, IssueFieldLabel, Vertical } from "../issue/issue-card";
import Button from "app/components/button";
import { useNavigate } from "react-router-dom";

type SprintCardProps = { sprint: ScrumSprintDataObject };
export function SprintCard({ sprint }: SprintCardProps) {
  const nav = useNavigate()
  
  return (
    <Card className="rounded">
      <NavBar>
        <NavGroup>
          <BigText>
            <InLine>
              <IssueFieldLabel>{sprint.id}</IssueFieldLabel>
              {sprint.name}
            </InLine>
          </BigText>
          <Chip>Created at: {new Date(sprint.createdAt).toLocaleString()}</Chip>
          <Chip
            style={{
              borderColor: fullColors.neutral_red,
              color: fullColors.neutral_red,
            }}
          >
            Deadline: {new Date(sprint.deadline).toLocaleString()}
          </Chip>
        </NavGroup>
        <NavGroup>
          <Button className="rounded" onClick={() => nav(`/sprint/edit/${sprint.id!}`)}>
            <img
              src="/resources/edit.svg"
              style={{ height: "100%", width: "auto" }}
            />
          </Button>
        </NavGroup>
      </NavBar>
      <Divider />
      <InLine>
        <Vertical>
          <IssueFieldLabel>Epic</IssueFieldLabel>
          <Chip>
            <IssueFieldLabel>{sprint.relatedEpic.id!}</IssueFieldLabel>
            {sprint.relatedEpic.name}
          </Chip>
        </Vertical>
        <VDivider />
        <Vertical>
          <IssueFieldLabel>Issues</IssueFieldLabel>
          <InLineSmallGaps>
            {sprint.issues.map((issue) => (
              <IssueChip id={issue.id!} title={issue.title} />
            ))}
          </InLineSmallGaps>
        </Vertical>
      </InLine>

      <Markdown>{sprint.description}</Markdown>
    </Card>
  );
}
