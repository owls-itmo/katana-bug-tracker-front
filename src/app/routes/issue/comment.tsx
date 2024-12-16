import React, { useEffect, useState } from "react";
import { Card, Divider, InLine } from "app/components/detailsCard";
import {
  CommentDataObject,
  CommentRatingInfoObject,
} from "app/api/generated/ApiImpl";
import Markdown from "react-markdown";
import { Rating } from "app/components/rating";
import { Chip } from "app/components/chip";
import { colors } from "app/styles/colors";
import api from "app/api/api";
import styled from "@emotion/styled";
import { NavBar, NavGroup } from "app/components/navbar";
import Button from "app/components/button";
import { useNavigate } from "react-router-dom";

import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

type CommentProps = {
  comment: CommentDataObject;
  onUpdate: () => void;
  hideReplyButton?: true;
};
export function Comment({ comment, onUpdate, hideReplyButton }: CommentProps) {
  const nav = useNavigate();

  return (
    <Card className="rounded">
      <NavBar>
        <InLine>
          {comment.user.displayName}
          <Chip>
            Created at: {new Date(comment.creationTime).toLocaleString()}
          </Chip>
          {comment.lastModified ? (
            <Chip
              style={{ borderColor: colors.success, color: colors.success }}
            >
              Modified: {new Date(comment.lastModified).toLocaleString()}
            </Chip>
          ) : (
            <></>
          )}
        </InLine>
        <NavGroup>
          {hideReplyButton ? (
            <></>
          ) : (
            <Button
              className="rounded"
              onClick={() => nav(`/comment/reply/${comment.id}`)}
            >
              <ReplyRoundedIcon />{" "}
            </Button>
          )}
          <Button
            className="rounded"
            onClick={() => nav(`/comment/${comment.id!}/edit`)}
          >
            <img
              src="/resources/edit.svg"
              style={{ height: "100%", width: "auto" }}
            />
          </Button>
        </NavGroup>
      </NavBar>
      <Divider />
      <Markdown>{comment.content}</Markdown>
      <Divider />
      <Rating
        onDown={async () => {
          await api.createRating({ commentId: comment.id!, rating: "DISLIKE" });
          onUpdate();
        }}
        onUp={async () => {
          await api.createRating({ commentId: comment.id!, rating: "LIKE" });
          onUpdate();
        }}
        ratio={calcRatio(comment.ratings)}
      />
    </Card>
  );
}

function calcRatio(reactions: CommentRatingInfoObject[]) {
  let ratio = 0;
  for (const reaction of reactions) {
    switch (reaction.rating) {
      case "LIKE":
        ratio += 1;
        break;
      case "DISLIKE":
        ratio -= 1;
        break;
    }
  }

  return ratio;
}

const SubThread = styled.div`
  display: flex;
  flex-direction: column;
  align-self: end;
  width: 80%;
`;

export type CommentThreadProps = { rootCommentId: number };
export function CommentThread({ rootCommentId }: CommentThreadProps) {
  const [rootComment, setRootComment] = useState<CommentDataObject>();
  const [childComments, setChildComments] = useState<CommentDataObject[]>([]);

  async function fetchComments() {
    const commentResponse = await api.getComment(rootCommentId);
    setRootComment(commentResponse.data);

    const childIDsOrdered = commentResponse.data.subThread.map(
      (child) => child.id!
    );

    const childComments = (
      await Promise.all(childIDsOrdered.map((id) => api.getComment(id)))
    ).map((response) => response.data);
    const childrenMapped = new Map(
      childComments.map((child) => [child.id!, child])
    );

    const childrenOrdered: CommentDataObject[] = [];
    for (const id of childIDsOrdered) {
      childrenOrdered.push(childrenMapped.get(id)!);
    }

    setChildComments(childrenOrdered);
  }

  useEffect(() => {
    fetchComments();
  }, [rootCommentId]);

  if (!rootComment) {
    return "Loading comments";
  }

  return (
    <>
      <Comment comment={rootComment} onUpdate={fetchComments} />
      <SubThread>
        {childComments.map((child) => (
          <Comment hideReplyButton onUpdate={fetchComments} comment={child} key={child.id!} />
        ))}
      </SubThread>
    </>
  );
}
