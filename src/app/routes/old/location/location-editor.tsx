import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import BigText from "app/components/bigText";
import { FieldInput } from "app/components/field";
import GenericButton from "app/components/button";
import { location_api, TLocation } from "app/api/old/locations";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Description, Divider } from "app/components/detailsCard";

export default function LocationEditor({isEditMode}: {isEditMode: boolean}) {
  const { register, handleSubmit, setValue } = useForm();

  const nav = useNavigate()
  
  const params = useParams()
    useEffect(() => {
      if (isEditMode) {
        location_api.getById(params.id!).then((location) => {
          setValue('x', location.x)
          setValue('y', location.y)
          setValue('z', location.z)
          setValue('name', location.name)
          setValue('isEditableByAdmins', location.isEditableByAdmins)
        })  
      }
    }, [])


  return (
    <Card className="rounded">
      <BigText>{isEditMode ? "Edit" : "New" } Location</BigText>
      <Divider />
      <Description>
        <div>Allow admins to edit this</div>
        <input type="checkbox" {...register('isEditableByAdmins')} />
        <div>X</div>
        <FieldInput {...register('x', {valueAsNumber: true, /* validate: (n) => !Number.isNaN(n) && Number.isFinite(n) */})} />
        <div>Y</div>
        <FieldInput {...register('y', {valueAsNumber: true})} />
        <div>Z</div>
        <FieldInput {...register('z', {valueAsNumber: true})} />
        <div>Name</div>
        <FieldInput {...register('name')} />
      </Description>

      <GenericButton className="rounded" onClick={handleSubmit((data) => {
        let result = null
        if (isEditMode) {
          result = location_api.update(params.id!, data as TLocation)
        } else {
          result = location_api.create(data as TLocation)
        }

        result.then(() => nav(`..`, {relative: "path"}))
      })}><BigText>Submit</BigText></GenericButton>
    </Card>
  );
}
