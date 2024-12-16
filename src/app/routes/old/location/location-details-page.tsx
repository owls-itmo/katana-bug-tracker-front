import { ModificationLog } from "app/api/api";
import { location_api, TLocation } from "app/api/old/locations";
import { getUserData } from "app/auth/auth";
import Button from "app/components/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModificationLogTable from "app/components/modificationLog";
import LocationDetails from "./location-details";

export default function LocationDetailsPage() {
  const [location, setLocation] = useState<TLocation>();
  const [modificationLog, setModificationLog] = useState<ModificationLog>([]);

  const nav = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    location_api.getById(id!).then(setLocation);
    location_api.getModificationLog(id!).then(setModificationLog);
  }, []);

  if (!location) {
    return <></>;
  }

  const isOwner = location.owner.login == getUserData()?.displayedUsername;
  const canEdit =
    isOwner || (location.isEditableByAdmins && getUserData()?.role == "Admin");

  return (
    <>
      <LocationDetails location={location}>
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
              location_api.delete(id!).then(() => nav("/location"));
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
      </LocationDetails>
      <ModificationLogTable modificationLog={modificationLog} />
    </>
  );
}
