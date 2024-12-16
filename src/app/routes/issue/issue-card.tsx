import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { colors, fullColors } from "app/styles/colors";
import BigText from "app/components/bigText";
import {
  ActionChip,
  ActionChipInput,
  BorderlessChip,
  Chip,
  Circle,
} from "app/components/chip";
import { Divider as MDivider } from "@mui/material";
import {
  Card,
  Divider,
  InLine,
  InLineSmallGaps,
  VDivider,
} from "app/components/detailsCard";
import { IssueDataObject, IssueTagDataObject } from "app/api/generated/ApiImpl";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import api from "app/api/api";

import { RgbColorPicker, RgbColor } from "react-colorful";

import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { createPortal } from "react-dom";

export const IssueFieldLabel = styled.div`
  color: ${fullColors.gray_245};
`;

const ColorModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: ${fullColors.dark0_hard}90;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type IssueTitleProps = {
  id: number;
  title: string;
  onClick?: () => void;
  onTitleChange?: (newTitle: string) => void;
};
function IssueTitle({ id, title, onClick, onTitleChange }: IssueTitleProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.value = title;
    }
  }, [titleInputRef, isEditingTitle]);

  return (
    <BigText style={{ cursor: "pointer", width: "100%" }} onClick={onClick}>
      <InLine>
        <span style={{ color: colors.backgroundLighter }}>{id}</span>
        {isEditingTitle ? (
          <ActionChipInput
            ref={titleInputRef}
            onBlur={async (event) => {
              const newTitle = event.target.value;
              if (newTitle.length > 0 && newTitle != title) {
                onTitleChange?.(newTitle);
              }
              setIsEditingTitle(false);
            }}
          />
        ) : (
          <span onClick={() => setIsEditingTitle(true)}>{title}</span>
        )}
      </InLine>
    </BigText>
  );
}

type IssueTagsProps = {
  tags: IssueDataObject["tags"];
  issueId: number;
  onTagChange?: () => void;
};
export const removeChipStyles = {
  height: "1.3125rem",
  cursor: "pointer",
  ":hover": { color: fullColors.neutral_red },
  transition: "color 0.2s",
};
function IssueTags({ tags, issueId, onTagChange }: IssueTagsProps) {
  const [color, setColor] = useState<(RgbColor & { id: number }) | null>(null);

  const [nameEditTagId, setNameEditTagId] = useState<{
    id: number;
    value: string;
  } | null>(null);

  const [allTags, setAllTags] = useState<IssueTagDataObject[]>([]);
  const allTagsElements = allTags.map((tag) => {
    return (
      <BorderlessChip
        key={tag.id}
        onClick={() => {
          api.linkIssueToTag(issueId, tag.id!).then(() => {
            onTagChange?.();
          });
        }}
      >
        <Circle circleSize="1rem" color={tag.color} />
        {tag.name}
      </BorderlessChip>
    );
  });

  const tagIds = useMemo(() => new Set(tags.map((tag) => tag.id!)), [tags]);

  const fetchAllTags = useCallback(async () => {
    // 10k tags per request should be sufficient to fetch all tags
    setAllTags(
      (await api.getTags(0, 10000)).data.filter((item) => !tagIds.has(item.id!))
    );
  }, [tagIds]);

  useEffect(() => {
    fetchAllTags();
  }, []);

  return (
    <>
      <IssueFieldLabel>Tags</IssueFieldLabel>
      <InLineSmallGaps>
        {tags.map((tag) => (
          <Chip key={tag.id!}>
            <Circle
              circleSize="1rem"
              color={tag.color}
              onClick={() => {
                setColor({ ...hexToRgb(tag.color), id: tag.id! });
              }}
            />
            {nameEditTagId != null && nameEditTagId.id == tag.id! ? (
              <ActionChipInput
                value={nameEditTagId.value}
                onChange={({ target: { value } }) =>
                  setNameEditTagId({ id: tag.id!, value })
                }
                onBlur={async () => {
                  await api.updateTag({ ...tag, name: nameEditTagId.value });
                  onTagChange?.();
                }}
              />
            ) : (
              <span
                onClick={() =>
                  setNameEditTagId({ id: tag.id!, value: tag.name })
                }
              >
                {tag.name}
              </span>
            )}
            <ClearRoundedIcon
              sx={removeChipStyles}
              onClick={async () => {
                await api.unlinkFromTag(issueId, tag.id!);
                onTagChange?.();
              }}
            />
          </Chip>
        ))}
        <ActionChip
          onChange={() => {}}
          onBlur={async (value) => {
            if (value.length > 0) {
              const newTag = await api.createTag({
                name: value,
                color: generateRgb(),
              });
              await api.linkIssueToTag(issueId, newTag.data.id!);
            }
            await fetchAllTags();
            onTagChange?.();
          }}
          items={allTagsElements}
          isCorrect={true}
        />
        {color ? (
          createPortal(
            <ColorModalContainer
              onClick={async (event) => {
                if (event.target == event.currentTarget) {
                  const tag = tags.find((tag) => tag.id! == color.id)!;
                  await api.updateTag({ ...tag, color: rgbToHex(color) });
                  setColor(null);
                  onTagChange?.();
                }
              }}
            >
              <RgbColorPicker
                color={color}
                onChange={(event) =>
                  setColor((current) => ({ ...current!, ...event }))
                }
              />
            </ColorModalContainer>,
            document.body
          )
        ) : (
          <></>
        )}
      </InLineSmallGaps>
    </>
  );
}

export const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

type IssueCardProps = {
  issue: IssueDataObject;
  onUpdate?: () => void;
  isEditMode?: boolean;
};
export function IssueCard({ issue, onUpdate, isEditMode }: IssueCardProps) {
  const nav = useNavigate();

  const [isParentInputCorrect, setIsParentInputCorrect] = useState(true);
  const [isChildIssueInputCorrect, setIsChildIssueInputCorrect] =
    useState(true);

  return (
    <Card className="rounded">
      <IssueTitle
        id={issue.id!}
        title={issue.title}
        onClick={() => nav(`/issue/${issue.id}/${issue.comment.id}`)}
        onTitleChange={async (newTitle) => {
          await api.updateIssue({ ...issue, title: newTitle });
          onUpdate?.();
        }}
      />
      <Divider />
      <IssueTags tags={issue.tags} issueId={issue.id!} onTagChange={onUpdate} />
      <InLine>
        <Vertical>
          <IssueFieldLabel>Parent issue</IssueFieldLabel>
          {issue.parentIssue ? (
            <IssueChip
              id={issue.parentIssue.id!}
              title={issue.parentIssue.title}
              onRemove={async (_id) => {
                await api.unlinkFromIssue(issue.id!);
                onUpdate?.();
              }}
            />
          ) : (
            <ActionChip
              isCorrect={isParentInputCorrect}
              onBlur={(parentIssueId) => {
                if (parentIssueId.length < 1) {
                  return;
                }

                const parsed = Number(parentIssueId);
                if (isNaN(parsed) || parsed <= 0) {
                  setIsParentInputCorrect(false);
                  return true;
                }

                setIsParentInputCorrect(true);

                (async () => {
                  await api.linkToIssue(issue.id!, +parentIssueId);
                  onUpdate?.();
                })();
              }}
            />
          )}
        </Vertical>
        <>
          <VDivider />
          <Vertical>
            <IssueFieldLabel>Sub issues</IssueFieldLabel>
            <InLineSmallGaps>
              {issue.subIssues.map((child) => (
                <IssueChip
                  key={child.id}
                  id={child.id!}
                  title={child.title}
                  onRemove={async (id) => {
                    await api.unlinkFromIssue(id);
                    onUpdate?.();
                  }}
                />
              ))}
              <ActionChip
                isCorrect={isChildIssueInputCorrect}
                onBlur={(childIssueId) => {
                  if (childIssueId.length < 1) {
                    return;
                  }

                  const parsed = Number(childIssueId);
                  if (isNaN(parsed) || parsed <= 0) {
                    setIsChildIssueInputCorrect(false);
                    return true;
                  }

                  setIsChildIssueInputCorrect(true);

                  (async () => {
                    await api.linkToIssue(+childIssueId, issue.id!);
                    onUpdate?.();
                  })();
                }}
              />
            </InLineSmallGaps>
          </Vertical>
        </>
      </InLine>
      <InLine>
        <div>
          <span style={{ color: fullColors.light4 }}>Rating:</span>{" "}
          {issue.ratio}
        </div>

        <VDivider />
        <InLineSmallGaps>
          <IssueFieldLabel>Sprint:</IssueFieldLabel>
          {issue.relatedSprint ? (
            <Chip>
              <IssueFieldLabel>{issue.relatedSprint.id!}</IssueFieldLabel>{" "}
              {issue.relatedSprint.name}
              <ClearRoundedIcon
                sx={removeChipStyles}
                onClick={async () => {
                  await api.unlinkFromSprint(issue.id!);
                  onUpdate?.();
                }}
              />
            </Chip>
          ) : (
            <ActionChip onBlur={(sprintId) => {
              if (sprintId.length < 1) {
                return;
              }

              const parsed = Number(sprintId);
              if (isNaN(parsed) || parsed <= 0) {
                setIsChildIssueInputCorrect(false);
                return true;
              }

              setIsChildIssueInputCorrect(true);

              (async () => {
                await api.linkToSprint(issue.id!, parsed)
                onUpdate?.();
              })();
            }} />
          )}
        </InLineSmallGaps>

        {issue.events.length > 0 ? (
          <>
            <VDivider />
            <InLineSmallGaps>
              <IssueFieldLabel>Events:</IssueFieldLabel>
              {issue.events.map((event) => (
                <Chip key={event.id}>
                  <span style={{ color: colors.backgroundLighter }}>
                    {event.id}
                  </span>{" "}
                  {event.name}{" "}
                  <span style={{ color: fullColors.neutral_green }}>
                    {new Date(event.date).toLocaleString()}
                  </span>{" "}
                  <ClearRoundedIcon
                    sx={removeChipStyles}
                    onClick={async () => {
                      await api.unlinkFromEvent(issue.id!, event.id!);
                      onUpdate?.();
                    }}
                  />
                </Chip>
              ))}
              <ActionChip />
            </InLineSmallGaps>
          </>
        ) : (
          <></>
        )}
      </InLine>
    </Card>
  );
}

type IssueChipProps = {
  id: number;
  title: string;
  onRemove?: (id: number) => void;
};
export function IssueChip({ id, title, onRemove }: IssueChipProps) {
  const nav = useNavigate();

  return (
    <Chip onClick={() => nav(`/issue/${id}`)} style={{ cursor: "pointer" }}>
      <span style={{ color: colors.backgroundLighter }}>{id!}</span>
      {title}
      {onRemove ? (
        <ClearRoundedIcon
          sx={removeChipStyles}
          onClick={(event) => {
            event.stopPropagation();
            onRemove(id);
          }}
        />
      ) : (
        <></>
      )}
    </Chip>
  );
}

function generateRgb() {
  const redFactor = Math.random();
  const greenFactor = Math.random();
  const blueFactor = Math.random();

  const r = factorToColor(redFactor);
  const g = factorToColor(greenFactor);
  const b = factorToColor(blueFactor);

  const color = rgbToHex({ r, g, b });

  return color;
}

function factorToColor(factor: number): number {
  return Math.floor(factor * 255);
}

function hexToRgb(color: string) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5), 16);

  return { r, g, b };
}

function rgbToHex({ r, g, b }: RgbColor) {
  return "#" + channelToHex(r) + channelToHex(g) + channelToHex(b);
}

function channelToHex(channel: number) {
  return channel.toString(16).padStart(2, "0");
}
