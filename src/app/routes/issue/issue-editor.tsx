import BigText from "app/components/bigText";
import { Card, Divider } from "app/components/detailsCard";
import Field, { FieldInput } from "app/components/field";
import React, { useCallback, useEffect, useState } from "react";
import { CommentTextarea } from "../issue/comment-editor";
import { useParams } from "react-router-dom";
import api from "app/api/api";
import { NavBar } from "app/components/navbar";
import Button from "app/components/button";
import { ScrumSprintDataObject } from "app/api/generated/ApiImpl";

export function IssueCreate() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
              await api.createIssue({
                attachedFilesIds: [],
                content: description,
                title,
              })
              window.history.back()
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
