import { ModificationLog } from "app/api/api";
import { organization_api, TOrganization } from "app/api/old/organizations";
import { getUserData } from "app/auth/auth";
import Button from "app/components/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModificationLogTable from "app/components/modificationLog";
import OrganizationDetails from "./organization-details";

export default function OrganizationDetailsPage() {
  const [organization, setOrganization] = useState<TOrganization>();
  const [modificationLog, setModificationLog] = useState<ModificationLog>([]);

  const nav = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    organization_api.getById(id!).then(setOrganization);
    organization_api.getModificationLog(id!).then(setModificationLog);
  }, []);

  if (!organization) {
    return <></>;
  }

  const isOwner = organization.owner.login == getUserData()?.displayedUsername;
  const canEdit =
    isOwner || (organization.isEditableByAdmins && getUserData()?.role == "Admin");

  return (
    <>
      <OrganizationDetails organization={organization}>
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
              organization_api.delete(id!).then(() => nav("/organization"));
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
      </OrganizationDetails>
      <ModificationLogTable modificationLog={modificationLog} />
    </>
  );
}
