import React, { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";
import BigText from "app/components/bigText";
import { FieldInput } from "app/components/field";
import Button from "app/components/button";
import {
  EColor,
  ECountry,
  formatNationality,
  person_api,
  TPerson,
  UNKNOWN_NATIONALITY_LABEL,
} from "app/api/old/persons";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Description, Divider } from "app/components/detailsCard";
import Select, { OptionsOrGroups, Theme } from "react-select";
import { colors } from "app/styles/colors";
import LocationTable from "../location/location-table";

const COLOR_OPTIONS: { value: EColor; label: string }[] = [
  { value: "GREEN", label: "Green" },
  { value: "RED", label: "Red" },
  { value: "ORANGE", label: "Orange" },
  { value: "WHITE", label: "White" },
];

const NATIONALITY_OPTIONS: { value: ECountry | undefined; label: string }[] = [
  { value: undefined, label: UNKNOWN_NATIONALITY_LABEL },
  { value: "CHINA", label: "China" },
  { value: "GERMANY", label: "Germany" },
  { value: "SPAIN", label: "Spain" },
  { value: "NORTH_KOREA", label: "North Korea" },
];

const selectTheme = (theme: Theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: colors.accent,
      primary25: colors.backgroundLight,
      primary50: colors.accent,
      primary75: colors.accent,
      neutral0: colors.backgroundDarker,
      neutral5: colors.accent,
      neutral10: colors.accent,
      neutral20: colors.accent,
      neutral30: colors.accent,
      neutral40: colors.accent,
      neutral50: colors.backgroundLighter,
      neutral60: colors.accent,
      neutral70: colors.accent,
      neutral80: colors.accent,
      neutral90: colors.accent,
    },
  };
};

export default function PersonEditor({ isEditMode }: { isEditMode: boolean }) {
  const { register, handleSubmit, setValue, control, watch } = useForm();

  const nav = useNavigate();

  const params = useParams();
  useEffect(() => {
    if (isEditMode) {
      person_api.getById(params.id!).then((person) => {
        setValue("eyeColor", person.eyeColor);
        setValue("hairColor", person.hairColor);
        setValue("weight", person.weight);
        setValue("nationality", person.nationality);
        setValue("isEditableByAdmins", person.isEditableByAdmins);
        setValue("location", person.location.id);
      });
    }
  }, []);

  const locationId = watch("location")
  const isLocationSet = locationId != undefined

  return (
    <>
      <Card className="rounded">
        <BigText>{isEditMode ? "Edit" : "New"} Person</BigText>
        <Divider />
        <Description>
          <div>Allow admins to edit this</div>
          <input type="checkbox" {...register("isEditableByAdmins")} />
          <div>Location</div>
          <div style={{fontFamily: "monospace", color: isLocationSet ? colors.accent : colors.backgroundLighter}}>{locationId ?? "To select location, click the table below"}</div>
          <div>Eye color</div>
          <Controller
            name="eyeColor"
            control={control}
            render={(context) =>
                <Select
                  onBlur={context.field.onBlur}
                  onChange={(option) => context.field.onChange(option?.value)}
                  value={COLOR_OPTIONS.find(
                    (entity) => entity.value == context.field.value
                  )}
                  styles={{
                    container: (base: any) => ({ ...base, width: "100%" }),
                  }}
                  options={COLOR_OPTIONS}
                  isSearchable={false}
                  theme={selectTheme}
                />
            }
          />
          <div>Hair color</div>
          <Controller
            name="hairColor"
            control={control}
            render={(context) =>
                <Select
                  onBlur={context.field.onBlur}
                  onChange={(option) => context.field.onChange(option?.value)}
                  value={COLOR_OPTIONS.find(
                    (entity) => entity.value == context.field.value
                  )}
                  styles={{
                    container: (base: any) => ({ ...base, width: "100%" }),
                  }}
                  options={COLOR_OPTIONS}
                  isSearchable={false}
                  theme={selectTheme}
                />
            }
          />
          <div>Nationality</div>
          <Controller
            name="nationality"
            control={control}
            render={(context) =>
                <Select
                  onBlur={context.field.onBlur}
                  onChange={(option) => context.field.onChange(option?.value)}
                  value={NATIONALITY_OPTIONS.find(
                    (entity) => entity.value == context.field.value
                  )}
                  styles={{
                    container: (base: any) => ({ ...base, width: "100%" }),
                  }}
                  options={NATIONALITY_OPTIONS}
                  isSearchable={false}
                  theme={selectTheme}
                />
            }
          />
          <div>Weight</div>
          <FieldInput {...register("weight", { valueAsNumber: true })} />
        </Description>

        <Button
          className="rounded"
          onClick={handleSubmit((data) => {
            let result = null;
            if (isEditMode) {
              result = person_api.update(params.id!, data as TPerson);
            } else {
              result = person_api.create(data as TPerson);
            }

            result.then(() => nav(`..`, { relative: "path" }));
          })}
        >
          <BigText>Submit</BigText>
        </Button>
      </Card>
      <LocationTable onEntityClick={entity => setValue('location', entity.id)} />
    </>
  );
}
