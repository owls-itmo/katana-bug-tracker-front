import api from "app/api/api";
import { CommentDataObject, IssueDataObject } from "app/api/generated/ApiImpl";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IssuesContainer } from "./issues-list";
import { IssueCard } from "./issue-card";
import { Comment, CommentThread } from "./comment";
import BigText from "app/components/bigText";

export function IssueView() {
  const { issueId, commentId } = useParams();
  const [issue, setIssue] = useState<IssueDataObject>();

  const updateIssue = useCallback(async () => {
    const issueResponse = await api.getIssue(+issueId!);
    setIssue(issueResponse.data);
  }, [setIssue, issueId])

  useEffect(() => {updateIssue()}, [issueId, commentId]);

  if (!issue) {
    return "Issue is loading";
  }

  return (
    <IssuesContainer>
      <IssueCard issue={issue} onUpdate={updateIssue} />
      <BigText>Comments</BigText>
      <CommentThread rootCommentId={+(commentId ?? issue.comment.id!)} />
    </IssuesContainer>
  );
}
