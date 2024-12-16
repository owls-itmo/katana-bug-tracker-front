import React, { useEffect, useState } from "react";
import { location_api, TLocation } from "app/api/old/locations";
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

const locationColumnDefinitions: ColumnDefinitions<TLocation> = {
  id: {
    header: "ID",
    DataElement(entry) {
      return <>{entry.id.slice(0, entry.id.indexOf("-"))}</>;
    },
    FilterElement: (reg) => <>Unsupported</>,
  },
  name: {
    header: "Location name",
    DataElement(entry) {
      return <>{entry.name}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  x: {
    header: "X",
    DataElement(entry) {
      return <>{entry.x}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  y: {
    header: "Y",
    DataElement(entry) {
      return <>{entry.y}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  z: {
    header: "Z",
    DataElement(entry) {
      return <>{entry.z}</>;
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
      return <img src="/resources/check.svg" hidden={!entry.isEditableByAdmins} />
    },
    FilterElement: (reg) => <>Unsupported</>,
  },
};

export type LocationTableProps = {
  onEntityClick?: (entity: TLocation) => void
}

export default function LocationTable({onEntityClick: onEntityClickProp}: LocationTableProps) {
  const [locations, setLocations] = useState<TLocation[]>([]);
  const [isFilterEnabled, setFilterEnabled] = useState(false);

  const nav = useNavigate();
  const { page, totalPages, setTotalPages, setPage } = usePages({ paramName: undefined });

  const onEntityClick = onEntityClickProp ?? ((entity) => nav(entity.id))

  function updateLocations(params: TGetListCommonParams<TLocation>) {
    params.page = page;

    location_api.getList(params).then((paged) => {
      setLocations(paged.items);
      setTotalPages(paged.totalPages)
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
          <Button className="rounded" onClick={() => nav("/location/add")}>
            <img
              style={{ height: "100%", width: "auto" }}
              src="/resources/add.svg"
            ></img>
          </Button>
        </NavGroup>
      </NavBar>
      <SortedFilteredTable
        entities={locations}
        columnDefinitions={locationColumnDefinitions}
        isFilterEnabled={isFilterEnabled}
        optionsChanged={updateLocations}
        onEntityClick={onEntityClick}
      />
    </>
  );
}
