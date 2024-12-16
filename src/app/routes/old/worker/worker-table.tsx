import React, { useEffect, useState } from "react";
import SortedFilteredTable, {
  ColumnDefinitions,
  formatDateAndTime,
} from "app/components/sorted-filtered-table";
import { FieldInput } from "app/components/field";
import { TGetListCommonParams } from "app/api/api";
import Button from "app/components/button";
import { useNavigate } from "react-router-dom";
import { NavGroup, NavBar } from "app/components/navbar";
import Pager from "app/components/pager";
import usePages from "app/hooks/usePages";
import { worker_api, TWorker } from "app/api/old/workers";

const workerColumnDefinitions: ColumnDefinitions<TWorker> = {
  id: {
    header: "ID",
    DataElement(entry) {
      return <>{entry.id.slice(0, entry.id.indexOf("-"))}</>;
    },
    FilterElement: (reg) => <>Unsupported</>,
  },
  name: {
    header: "Name",
    DataElement(entry) {
      return <>{entry.name}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  coordinates: {
    header: "Coordinates",
    DataElement(entry) {
      return <>X: {entry.coordinates.x}<br/>Y: {entry.coordinates.y}</>;
    },
    FilterElement: (reg) => <>Unsupported</>,
  },
  organisation: {
    header: "Organisation",
    DataElement(entry) {
      return <>{entry.organization.fullName}</>;
    },
    FilterElement: (reg) => <>Unsupported</>,
  },
  person: {
    header: "Person",
    DataElement(entry) {
      return <>{entry.person.id}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  salary: {
    header: "Salary",
    DataElement(entry) {
      return <>{entry.salary}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  rating: {
    header: "Rating",
    DataElement(entry) {
      return <>{entry.rating}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  position: {
    header: "Position",
    DataElement(entry) {
      return <>{entry.position}</>;
    },
    FilterElement: (reg) => <>Unsupported</>,
  },
  status: {
    header: "Status",
    DataElement(entry) {
      return <>{entry.status}</>;
    },
    FilterElement: (reg) => <>Unsupported</>,
  },
  owner: {
    header: "Owner",
    DataElement(entry) {
      return <>{entry.owner.login}</>;
    },
    FilterElement: (reg) => <>Unsupported</>,
  },
  createdAt: {
    header: "Creation date",
    DataElement(entry) {
      return <>{formatDateAndTime(entry.creationDate)}</>;
    },
    FilterElement: (reg) => <>Unsupported</>,
  },
  isEditableByAdmins: {
    header: "Admins can edit",
    DataElement(entry) {
      return (
        <img src="/resources/check.svg" hidden={!entry.isEditableByAdmins} />
      );
    },
    FilterElement: (reg) => <>Unsupported</>,
  },
};

export default function WorkerTable() {
  const [workers, setWorkers] = useState<TWorker[]>([]);
  const [isFilterEnabled, setFilterEnabled] = useState(false);

  const nav = useNavigate();
  const { page, totalPages, setTotalPages, setPage } = usePages({
    paramName: undefined,
  });

  function updateWorkers(params: TGetListCommonParams<TWorker>) {
    params.page = page;

    worker_api.getList(params).then((paged) => {
      setWorkers(paged.items);
      setTotalPages(paged.totalPages);
    });
  }

  return (
    <>
      <NavBar>
        <NavGroup>
          <Pager page={page} onPageChange={setPage} totalPages={totalPages} />
        </NavGroup>
        <NavGroup>
          <Button
            className="rounded"
            onClick={() => setFilterEnabled((current) => !current)}
          >
            <img
              style={{ height: "100%", width: "auto" }}
              src="/resources/filter.svg"
            ></img>
          </Button>
          <Button className="rounded" onClick={() => nav("/worker/add")}>
            <img
              style={{ height: "100%", width: "auto" }}
              src="/resources/add.svg"
            ></img>
          </Button>
        </NavGroup>
      </NavBar>
      <SortedFilteredTable
        entities={workers}
        columnDefinitions={workerColumnDefinitions}
        isFilterEnabled={isFilterEnabled}
        optionsChanged={updateWorkers}
        onEntityClick={(entity) => nav(entity.id)}
      />
    </>
  );
}
