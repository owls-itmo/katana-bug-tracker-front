import { ModificationLog } from "app/api/api";
import { person_api, TPerson } from "app/api/old/persons";
import { getUserData } from "app/auth/auth";
import Button from "app/components/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModificationLogTable from "app/components/modificationLog";
import PersonDetails from "./person-details";

export default function PersonDetailsPage() {
  const [person, setPerson] = useState<TPerson>();
  const [modificationLog, setModificationLog] = useState<ModificationLog>([]);

  const nav = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    person_api.getById(id!).then(setPerson);
    person_api.getModificationLog(id!).then(setModificationLog);
  }, []);

  if (!person) {
    return <></>;
  }

  const isOwner = person.owner.login == getUserData()?.displayedUsername;
  const canEdit =
    isOwner || (person.isEditableByAdmins && getUserData()?.role == "Admin");

  return (
    <>
      <PersonDetails person={person}>
        {canEdit ? (
          <Button
            className="rounded"
            onClick={() => nav("edit", { relative: "path" })}
          >
            <img
              style={{ height: "100%", width: "auto" }}
              src="/resources/edit.svg"
            />
          </Button>
        ) : (
          <></>
        )}
        {isOwner ? (
          <Button
            className="rounded"
            onClick={() => {
              person_api.delete(id!).then(() => nav("/person"));
            }}
          >
            <img
              style={{ height: "100%", width: "auto" }}
              src="/resources/trash.svg"
            />
          </Button>
        ) : (
          <></>
        )}
      </PersonDetails>
      <ModificationLogTable modificationLog={modificationLog} />
    </>
  );
}
