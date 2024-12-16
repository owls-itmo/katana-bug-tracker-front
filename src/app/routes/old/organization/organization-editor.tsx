import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import BigText from "app/components/bigText";
import { FieldInput } from "app/components/field";
import GenericButton from "app/components/button";
import { organization_api, TOrganization } from "app/api/old/organizations";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Description, Divider } from "app/components/detailsCard";

export default function OrganizationEditor({
  isEditMode,
}: {
  isEditMode: boolean;
}) {
  const { register, handleSubmit, setValue } = useForm();

  const nav = useNavigate();

  const params = useParams();
  useEffect(() => {
    if (isEditMode) {
      organization_api.getById(params.id!).then((organization) => {
        setValue("fullName", organization.fullName);
        setValue("annualTurnover", organization.annualTurnover);
        setValue("employeesCount", organization.employeesCount);
        setValue("officialAddress", organization.officialAddress.zipCode);
        setValue("rating", organization.rating);
        setValue("postalAddress", organization.postalAddress.zipCode);
        setValue("isEditableByAdmins", organization.isEditableByAdmins);
      });
    }
  }, []);

  return (
    <Card className="rounded">
      <BigText>{isEditMode ? "Edit" : "New"} Organization</BigText>
      <Divider />
      <Description>
        <div>Allow admins to edit this</div>
        <input type="checkbox" {...register("isEditableByAdmins")} />
        <div>Company name</div>
        <FieldInput {...register("fullName")} />
        <div>Annual turnover</div>
        <FieldInput
          {...register("annualTurnover", {
            valueAsNumber:
              true /* validate: (n) => !Number.isNaN(n) && Number.isFinite(n) */,
          })}
        />
        <div>Employees count</div>
        <FieldInput
          {...register("employeesCount", {
            valueAsNumber:
              true /* validate: (n) => !Number.isNaN(n) && Number.isFinite(n) */,
          })}
        />
        <div>Official Address ZipCode</div>
        <FieldInput
          {...register("officialAddress", {
            valueAsNumber:
              true /* validate: (n) => !Number.isNaN(n) && Number.isFinite(n) */,
          })}
        />
        <div>Rating</div>
        <FieldInput
          {...register("rating", {
            valueAsNumber:
              true /* validate: (n) => !Number.isNaN(n) && Number.isFinite(n) */,
          })}
        />
        <div>Postal Address ZipCode</div>
        <FieldInput
          {...register("postalAddress", {
            valueAsNumber:
              true /* validate: (n) => !Number.isNaN(n) && Number.isFinite(n) */,
          })}
        />
      </Description>

      <GenericButton
        className="rounded"
        onClick={handleSubmit((data) => {
          let result = null;
          const processedData: TOrganization = {
            ...data as TOrganization,
            officialAddress: { zipCode: data.officialAddress },
            postalAddress: { zipCode: data.postalAddress },
          };


          if (isEditMode) {
            result = organization_api.update(params.id!, processedData);
          } else {
            result = organization_api.create(processedData);
          }

          result.then(() => nav(`..`, { relative: "path" }));
        })}
      >
        <BigText>Submit</BigText>
      </GenericButton>
    </Card>
  );
}
