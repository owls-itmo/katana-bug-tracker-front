import { ModificationLog } from "app/api/api";
import { worker_api, TWorker } from "app/api/old/workers";
import { getUserData } from "app/auth/auth";
import Button from "app/components/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModificationLogTable from "app/components/modificationLog";
import WorkerDetails from "./worker-details";

export default function WorkerDetailsPage() {
  const [worker, setWorker] = useState<TWorker>();
  const [modificationLog, setModificationLog] = useState<ModificationLog>([]);

  const nav = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    worker_api.getById(id!).then(setWorker);
    worker_api.getModificationLog(id!).then(setModificationLog);
  }, []);

  if (!worker) {
    return <></>;
  }

  const isOwner = worker.owner.login == getUserData()?.displayedUsername;
  const canEdit =
    isOwner || (worker.isEditableByAdmins && getUserData()?.role == "Admin");

  return (
    <>
      <WorkerDetails worker={worker}>
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
              worker_api.delete(id!).then(() => nav("/worker"));
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
      </WorkerDetails>
      <ModificationLogTable modificationLog={modificationLog} />
    </>
  );
}
