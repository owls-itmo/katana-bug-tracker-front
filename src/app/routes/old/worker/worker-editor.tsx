import React, { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import BigText from "app/components/bigText";
import { FieldInput } from "app/components/field";
import Button from "app/components/button";
import { worker_api, TWorker, EPosition, EStatus } from "app/api/old/workers";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Description, Divider } from "app/components/detailsCard";
import Select, { OptionsOrGroups, Theme } from "react-select";
import { colors } from "app/styles/colors";
import LocationTable from "../location/location-table";
import { NavGroup, NavBar } from "app/components/navbar";
import OrganizationTable from "../organization/organization-table";
import PersonTable from "../person/person-table";

const POSITION_OPTIONS: { value: EPosition; label: string }[] = [
  { value: "CLEANER", label: "Cleaner" },
  { value: "DIRECTOR", label: "Director" },
  { value: "ENGINEER", label: "Engineer" },
  { value: "LABORER", label: "Laborer" },
  { value: "LEAD_DEVELOPER", label: "Lead Developer" },
];

const STATUS_OPTIONS: { value: EStatus; label: string }[] = [
  { value: "HIRED", label: "Hired" },
  { value: "RECOMMENDED_FOR_PROMOTION", label: "Recommended for promotion" },
  { value: "REGULAR", label: "Regular" },
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

type TabSelect = "organization" | "person";

export default function WorkerEditor({ isEditMode }: { isEditMode: boolean }) {
  const { register, handleSubmit, setValue, control, watch } = useForm();

  const [currentTab, selectTab] = useState<TabSelect>("organization");

  const nav = useNavigate();

  const params = useParams();
  useEffect(() => {
    if (isEditMode) {
      worker_api.getById(params.id!).then((worker) => {
        setValue("name", worker.name);
        setValue("coordinates.x", worker.coordinates.x);
        setValue("coordinates.y", worker.coordinates.y);
        setValue("organization", worker.organization.id);
        setValue("salary", worker.salary);
        setValue("rating", worker.rating);
        setValue("position", worker.position);
        setValue("status", worker.status);
        setValue("person", worker.person.id);
        setValue("isEditableByAdmins", worker.isEditableByAdmins);
      });
    }
  }, []);

  const [organizationId, personId] = watch(["organization", "person"]);
  const isOrganizationSet = organizationId != undefined;
  const isPersonSet = personId != undefined;

  const table =
    currentTab == "organization" ? (
      <OrganizationTable
        onEntityClick={(entity) => setValue("organization", entity.id)}
      />
    ) : (
      <PersonTable onEntityClick={(entity) => setValue("person", entity.id)} />
    );

  return (
    <>
      <Card className="rounded">
        <BigText>{isEditMode ? "Edit" : "New"} Worker</BigText>
        <Divider />
        <Description>
          <div>Allow admins to edit this</div>
          <input type="checkbox" {...register("isEditableByAdmins")} />
          <div>Organization</div>
          <div
            style={{
              fontFamily: "monospace",
              color: isOrganizationSet
                ? colors.accent
                : colors.backgroundLighter,
            }}
          >
            {organizationId ?? "To select location, click the table below"}
          </div>
          <div>Person</div>
          <div
            style={{
              fontFamily: "monospace",
              color: isPersonSet ? colors.accent : colors.backgroundLighter,
            }}
          >
            {personId ?? "To select location, click the table below"}
          </div>
          <div>Status</div>
          <Controller
            name="status"
            control={control}
            render={(context) => (
              <Select
                onBlur={context.field.onBlur}
                onChange={(option) => context.field.onChange(option?.value)}
                value={STATUS_OPTIONS.find(
                  (entity) => entity.value == context.field.value
                )}
                styles={{
                  container: (base: any) => ({ ...base, width: "100%" }),
                }}
                options={STATUS_OPTIONS}
                isSearchable={false}
                theme={selectTheme}
              />
            )}
          />
          <div>Position</div>
          <Controller
            name="position"
            control={control}
            render={(context) => (
              <Select
                onBlur={context.field.onBlur}
                onChange={(option) => context.field.onChange(option?.value)}
                value={POSITION_OPTIONS.find(
                  (entity) => entity.value == context.field.value
                )}
                styles={{
                  container: (base: any) => ({ ...base, width: "100%" }),
                }}
                options={POSITION_OPTIONS}
                isSearchable={false}
                theme={selectTheme}
              />
            )}
          />
          <div>Name</div>
          <FieldInput {...register("name")} />
          <div>Salary</div>
          <FieldInput {...register("salary", { valueAsNumber: true })} />
          <div>Rating</div>
          <FieldInput {...register("rating", { valueAsNumber: true })} />
          <div>Coordinates X</div>
          <FieldInput {...register("coordinates.x", { valueAsNumber: true })} />
          <div>Coordinates Y</div>
          <FieldInput {...register("coordinates.y", { valueAsNumber: true })} />
        </Description>

        <Button
          className="rounded"
          onClick={handleSubmit((data) => {
            let result = null;
            if (isEditMode) {
              result = worker_api.update(params.id!, data as TWorker);
            } else {
              result = worker_api.create(data as TWorker);
            }

            result.then(() => nav(`..`, { relative: "path" }));
          })}
        >
          <BigText>Submit</BigText>
        </Button>
      </Card>
      <NavBar>
        <NavGroup>
          <Button className="rounded" onClick={() => selectTab("organization")}>
            <BigText>Organizations</BigText>
          </Button>
          <Button className="rounded" onClick={() => selectTab("person")}>
            <BigText>Persons</BigText>
          </Button>
        </NavGroup>
      </NavBar>
      {table}
    </>
  );
}
