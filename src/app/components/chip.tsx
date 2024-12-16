import styled from "@emotion/styled";
import { colors, fullColors } from "app/styles/colors";
import React, {
  CSSProperties,
  HTMLProps,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

export type CircleProps = {
  circleSize: string;
  color: string;
} & HTMLProps<HTMLDivElement>;
export function Circle({ circleSize, color, ...other }: CircleProps) {
  const CircleElement = styled.div`
    width: ${circleSize};
    height: ${circleSize};
    border-radius: ${circleSize};
    background-color: ${color};
    border: 0.05rem solid ${colors.backgroundDarker};
    justify-self: center;
  `;

  return <CircleElement {...other} />;
}

export const Chip = styled.div`
  display: flex;
  padding: 0.4rem 0.7rem;
  gap: 0.5rem;
  border-radius: 4em;
  align-items: center;
  border: solid 0.1rem ${fullColors.dark4};
`;

// on click - expand with input field
// user inputs issue id
// on blur - try to add parent/sub issue
// if issue does not exists - paint error and retain focus
// if everything is ok - lose focus

export const ActionChipInput = styled.input`
  background: none;
  height: 100%;
  field-sizing: content;
  min-width: 4rem;
  font-size: 1rem;
`;

const ActionChipContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1.125rem;
  padding: 0.4rem;
  border: dashed 0.1rem ${fullColors.dark4};
  gap: 0.2rem;
  background: ${fullColors.dark0};
  width: max-content;
  z-index: 1000;
`;

const BorderlessTransparentChip = styled.div`
  display: flex;
  gap: 0.5rem;
  border-radius: 4em;
  align-items: center;
`;

export const BorderlessChip = styled.div`
  display: flex;
  padding: 0.4rem 0.7rem;
  gap: 0.5rem;
  border-radius: 4em;
  align-items: center;

  &:hover {
    cursor: pointer;
    background: ${fullColors.dark1};
  }

  &:active {
    background: ${fullColors.dark2};
  }
`;

type ActionChipProps = {
  /** Fires, when input was touched and blurred, without selection of any item 
   * 
   * @returns `true` if focus should be preserved
  */
  onBlur?: (arg: string) => void | true | Promise<void>;
  /** Fires once in a while when user types. Useful for filtering */
  onChange?: (arg: string) => void;
  isCorrect?: boolean;
  items?: ReactElement[];
};
export function ActionChip({
  isCorrect = true,
  onBlur = () => {},
  items,
  onChange = () => {},
}: ActionChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  // const isInputting = true
  const [canBeCalled, setCanBeCalled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // when isInputting changes from true to false
  // await sometime and set callback
  // this avoid flickering of the dropdown menu

  function isClickOutside(event: MouseEvent) {
    return event.target && containerRef.current?.contains(event.target as Node);
  }

  const closeChip = useCallback(() => {
    if (inputRef.current) {
      if (onBlur(inputRef.current.value) === true) {
        return
      }
      inputRef.current.value = "";
    }
    setTimeout(() => setIsOpen(false), 200);
  }, [inputRef, containerRef]);

  const onBlurCallback = useCallback(
    (event: MouseEvent) => {
      if (isClickOutside(event)) {
        return;
      }

      closeChip();
    },
    [closeChip]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", onBlurCallback);
    }

    return () => document.removeEventListener("mousedown", onBlurCallback);
  }, [onBlurCallback, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setCanBeCalled(false);
      inputRef.current?.focus();
    } else {
      setTimeout(() => setCanBeCalled(true), 300);
    }
  }, [isOpen]);

  const inputtingStyles: CSSProperties = {
    position: "absolute",
  };
  const containerStyled = isOpen ? inputtingStyles : {};

  return (
    <div
      style={{
        position: "relative",
        height: "2.25rem",
        alignSelf: isOpen ? "start" : "",
        cursor: !isOpen ? "pointer" : "",
      }}
    >
      <ActionChipContainer
        style={{
          borderColor: isCorrect ? "" : fullColors.neutral_red,
          ...containerStyled,
        }}
        ref={containerRef}
      >
        <BorderlessTransparentChip>
          <AddCircleOutlineRoundedIcon
            sx={{
              color: isCorrect ? "" : fullColors.neutral_red,
              width: "1.3125rem",
              height: "1.3125rem",
            }}
            onClick={
              canBeCalled
                ? () => {
                    setIsOpen(true);
                  }
                : closeChip
            }
          />
          <ActionChipInput
            ref={inputRef}
            onChange={(event) => {
              onChange(event.target.value);
            }}
            hidden={!isOpen}
          />
        </BorderlessTransparentChip>
        {isOpen && items ? items : <></>}
      </ActionChipContainer>
    </div>
  );
}
