import BigText from "app/components/bigText";
import { Card, Divider, InLine } from "app/components/detailsCard";
import Field, { FieldInput } from "app/components/field";
import React, { useCallback, useEffect, useState } from "react";
import { CommentTextarea } from "../issue/comment-editor";
import { useParams } from "react-router-dom";
import api from "app/api/api";
import { NavBar } from "app/components/navbar";
import Button from "app/components/button";
import {
  ScrumEpicDataObject,
  ScrumEpicInfoObject,
  ScrumSprintDataObject,
} from "app/api/generated/ApiImpl";
import { IssueFieldLabel, removeChipStyles } from "../issue/issue-card";
import { ActionChip, Chip } from "app/components/chip";

import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { TWO_WEEKS_IN_MILLISECONDS } from "../epic/epic-editor";


export function SprintEditor() {
  const { sprintId } = useParams();

  const [sprint, setSprint] = useState<ScrumSprintDataObject | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [epic, setEpic] = useState<ScrumEpicInfoObject | null>(null);
  const [isEpicIdCorrect, setIsEpicIdCorrect] = useState(true)

  const isNew = sprintId == undefined;

  const fetchSprint = useCallback(async () => {
    if (sprintId) {
      const sprint = (await api.getSprint(+sprintId)).data;
      setEpic(sprint.relatedEpic);
      setTitle(sprint.name);
      setDescription(sprint.description);
      setSprint(sprint);
    }
  }, [sprintId]);

  useEffect(() => {
    fetchSprint();
  }, [fetchSprint]);

  return (
    <Card className="rounded">
      <NavBar>
        <BigText>
          <Field label="Title">
            <FieldInput
              value={title}
              onInput={(event) => {
                setTitle((event.target as HTMLInputElement).value);
              }}
            />
          </Field>
        </BigText>
        <Button
          className="rounded"
          onClick={async () => {
            if (isNew) {
              if (epic && title.length > 0) {
                await api.createSprint({
                  description,
                  name: title,
                  relatedEpicId: epic.id!,
                  deadline: new Date(Date.now() + TWO_WEEKS_IN_MILLISECONDS).toISOString()
                })
              }

              setIsEpicIdCorrect(false)
              return;
            }

            if (sprint) {
              await api.updateSprint({ ...sprint, name: title, description });
              window.history.back();
            }
          }}
        >
          <img
            src="/resources/check.svg"
            style={{ height: "100%", width: "auto" }}
          />
        </Button>
      </NavBar>
      <Divider />
      <IssueFieldLabel>Epic</IssueFieldLabel>
      <InLine>
        {epic ? (
          <Chip>
            <IssueFieldLabel>{epic.id!}</IssueFieldLabel>
            {epic.name}
            <ClearRoundedIcon sx={removeChipStyles} onClick={() => {
              setEpic(null)
            }} />
          </Chip>
        ) : (
          <ActionChip isCorrect={isEpicIdCorrect} onBlur={(epicIdString) => {
            if (epicIdString.length < 1) {
              return;
            }

            const parsed = Number(epicIdString);
            if (isNaN(parsed) || parsed <= 0) {
              setIsEpicIdCorrect(false);
              return true;
            }

            setIsEpicIdCorrect(true);

            (async () => {
              const epic = (await api.getEpic(parsed)).data
              setEpic(epic)
            })();
          }} />
        )}
      </InLine>
      <CommentTextarea
        value={description}
        className="rounded"
        placeholder="Type some markdown"
        onInput={(event) =>
          setDescription((event.target as HTMLTextAreaElement).value)
        }
      />
    </Card>
  );
}
