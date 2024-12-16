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
import { formatNationality, person_api, TPerson } from "app/api/old/persons";

const personColumnDefinitions: ColumnDefinitions<TPerson> = {
  id: {
    header: "ID",
    DataElement(entry) {
      return <>{entry.id.slice(0, entry.id.indexOf("-"))}</>;
    },
    FilterElement: (reg) => <>Unsupported</>,
  },
  eyeColor: {
    header: "Eye Color",
    DataElement(entry) {
      return <>{entry.eyeColor}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  hairColor: {
    header: "Hair Color",
    DataElement(entry) {
      return <>{entry.hairColor}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  weight: {
    header: "Weight",
    DataElement(entry) {
      return <>{entry.weight}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  location: {
    header: "Location",
    DataElement(entry) {
      return <>{entry.location.name}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  nationality: {
    header: "Nationality",
    DataElement(entry) {
      return <>{formatNationality(entry.nationality)}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
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

export type PersonTableProps = {
  onEntityClick?: (entity: TPerson) => void
}

export default function PersonTable({onEntityClick: onEntityClickProp}: PersonTableProps) {
  const [persons, setPersons] = useState<TPerson[]>([]);
  const [isFilterEnabled, setFilterEnabled] = useState(false);

  const nav = useNavigate();
  const { page, totalPages, setTotalPages, setPage } = usePages({
    paramName: undefined,
  });

  const onEntityClick = onEntityClickProp ?? ((entity) => nav(entity.id))

  function updatePersons(params: TGetListCommonParams<TPerson>) {
    params.page = page;

    person_api.getList(params).then((paged) => {
      setPersons(paged.items);
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
          <Button className="rounded" onClick={() => nav("/person/add")}>
            <img
              style={{ height: "100%", width: "auto" }}
              src="/resources/add.svg"
            ></img>
          </Button>
        </NavGroup>
      </NavBar>
      <SortedFilteredTable
        entities={persons}
        columnDefinitions={personColumnDefinitions}
        isFilterEnabled={isFilterEnabled}
        optionsChanged={updatePersons}
        onEntityClick={onEntityClick}
      />
    </>
  );
}
