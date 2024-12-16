import { IssueDataObject } from "app/api/generated/ApiImpl";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import api from "app/api/api";
import usePages from "app/hooks/usePages";
import Pager from "app/components/pager";
import { IssueCard } from "./issue-card";
import { NavBar } from "app/components/navbar";
import BigText from "app/components/bigText";
import Button from "app/components/button";
import { useNavigate } from "react-router-dom";

const ISSUES_PER_PAGE = 50;
const DEFAULT_PAGE = 1;

export const IssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 2rem;
  align-items: center;
`;

const PagerContainer = styled.div`
  width: auto;
`;

export default function IssueList() {
  const nav = useNavigate()
  
  const [issues, setIssues] = useState<IssueDataObject[]>([]);
  const { page, setPage } = usePages({ defaultPage: DEFAULT_PAGE });
  const [noneEmptyPage, setNoneEmptyPage] = useState(DEFAULT_PAGE);

  useEffect(() => {
    fetchAllIssues();
  }, [page]);

  return (
    <IssuesContainer>
      <NavBar><BigText>Issues</BigText><Button className="rounded" onClick={() => nav("/issue/create")}>
        <img src="/resources/add.svg" style={{height: "100%", width: "auto"}} />
        </Button></NavBar>
      {issues.map((issue) => (
        <IssueCard issue={issue} key={issue.id} onUpdate={fetchAllIssues} />
      ))}
      <PagerContainer>
        <Pager page={page} onPageChange={setPage} totalPages={undefined} />
      </PagerContainer>
    </IssuesContainer>
  );

  async function fetchAllIssues() {
    const issues = await api.getIssues(page - 1, ISSUES_PER_PAGE);
    if (issues.data.length != 0) {
      setNoneEmptyPage((current) => Math.max(current, page));
    } else {
      setPage(noneEmptyPage);
    }

    setIssues(issues.data);
  }
}
