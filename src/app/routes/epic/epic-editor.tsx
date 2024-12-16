import BigText from "app/components/bigText";
import { Card, Divider } from "app/components/detailsCard";
import Field, { FieldInput } from "app/components/field";
import React, { useCallback, useEffect, useState } from "react";
import { CommentTextarea } from "../issue/comment-editor";
import { useParams } from "react-router-dom";
import api from "app/api/api";
import { NavBar } from "app/components/navbar";
import Button from "app/components/button";
import { ScrumEpicDataObject } from "app/api/generated/ApiImpl";

export const TWO_WEEKS_IN_MILLISECONDS = 1000 * 60*60*24*14

export function EpicEditor() {
  const { epicId } = useParams();

  const [epic, setEpic] = useState<ScrumEpicDataObject | null>(null)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isNew = epicId == undefined;

  const fetchEpic = useCallback(async () => {
    if (epicId) {
      const epic = (await api.getEpic(+epicId)).data;
      setTitle(epic.name);
      setDescription(epic.description);
      setEpic(epic)
    }
  }, [epicId]);

  useEffect(() => {
    fetchEpic();
  }, [fetchEpic]);

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
              await api.createEpic({
                name: title,
                description,
                deadline: new Date(Date.now() + TWO_WEEKS_IN_MILLISECONDS).toISOString()
              });
            }

            if (epic) {
              await api.updateEpic({...epic, name: title, description})
              window.history.back()
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
