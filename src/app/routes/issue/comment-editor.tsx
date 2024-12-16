import BigText from "app/components/bigText"
import { Card, Divider } from "app/components/detailsCard"
import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { fullColors } from "app/styles/colors"
import { NavBar } from "app/components/navbar"
import Button from "app/components/button"
import { CommentDataObject } from "app/api/generated/ApiImpl"
import api from "app/api/api"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export const CommentTextarea = styled.textarea`
  background: ${fullColors.dark0};
  color: inherit;
  font-size: inherit;
  font-family: monospace;
  min-height: 25rem;
  padding: 0.7rem;
`

export function CommentEditor() {
  const { commentId } = useParams()
  const [comment, setComment] = useState<CommentDataObject | null>(null)

  async function fetchComment() {
    setComment((await api.getComment(+commentId!)).data)
  }
  
  useEffect(() => {
    fetchComment()
  }, [commentId])

  return <Card className="rounded">
    <NavBar>
    <BigText>Edit comment</BigText>
    <Button className="rounded" onClick={async () => {
      if (comment) {
        await api.updateComment(comment)
        window.history.back()
      }
    }}>
      <img src="/resources/check.svg" style={{height: '100%', width: "auto"}} />
    </Button>
    </NavBar>
    <Divider />
  <CommentTextarea value={comment?.content} onInput={(event) => {
    if (comment) {
      setComment(current => ({...current!, content: (event.target as HTMLTextAreaElement).value}));
    }
  }} className="rounded" placeholder="Type some markdown" />
  </Card>
}

