import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comment } from "./comment";
import api from "app/api/api";
import { CommentDataObject } from "app/api/generated/ApiImpl";
import { Card, Divider } from "app/components/detailsCard";
import BigText from "app/components/bigText";
import { CommentTextarea } from "./comment-editor";
import { NavBar } from "app/components/navbar";
import Button from "app/components/button";

export function CommentReplyEditor() {
  const { toCommentId } = useParams();
  const [parentComment, setParentComment] = useState<CommentDataObject | null>(
    null
  );

  const [content, setContent] = useState("");

  async function fetchParentComment() {
    setParentComment((await api.getComment(+toCommentId!)).data);
  }

  useEffect(() => {
    fetchParentComment();
  }, [toCommentId]);

  return (
    <>
      {parentComment ? (
        <Comment hideReplyButton comment={parentComment} onUpdate={fetchParentComment} />
      ) : (
        "Loading"
      )}
      <Card className="rounded">
        <NavBar>
          <BigText>Reply</BigText>
          <Button
            className="rounded"
            onClick={async () => {
              await api.createReply({
                attachedFilesIds: [],
                content,
                parentCommentId: +toCommentId!
              });
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
          className="rounded"
          placeholder="Type some markdown"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </Card>
    </>
  );
}
