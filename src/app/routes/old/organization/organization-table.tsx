import React, { useState } from "react";
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
import { organization_api, TOrganization } from "app/api/old/organizations";

const organizationColumnDefinitions: ColumnDefinitions<TOrganization> = {
  id: {
    header: "ID",
    DataElement(entry) {
      return <>{entry.id.slice(0, entry.id.indexOf("-"))}</>;
    },
    FilterElement: (reg) => <>Unsupported</>,
  },
  fullName: {
    header: "Company name",
    DataElement(entry) {
      return <>{entry.fullName}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  annualTurnover: {
    header: "Annual turnover",
    DataElement(entry) {
      return <>{entry.annualTurnover}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  employeesCount: {
    header: "Employ count",
    DataElement(entry) {
      return <>{entry.employeesCount}</>;
    },
    FilterElement: (reg) => <FieldInput {...reg} placeholder="Filter" />,
  },
  officialAddress: {
    header: "Official address",
    DataElement(entry) {
      return <>ZipCode: {entry.officialAddress.zipCode}</>;
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
  postalAddress: {
    header: "Postal address",
    DataElement(entry) {
      return <>ZipCode: {entry.postalAddress.zipCode}</>;
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

export type OrganizationTableProps = {
  onEntityClick?: (entity: TOrganization) => void
}


export default function OrganizationTable({onEntityClick: onEntityClickProp}: OrganizationTableProps) {
  const [organizations, setOrganizations] = useState<TOrganization[]>([]);
  const [isFilterEnabled, setFilterEnabled] = useState(false);

  const nav = useNavigate();
  const { page, totalPages, setTotalPages, setPage } = usePages({ paramName: undefined });

  const onEntityClick = onEntityClickProp ?? ((entity) => nav(entity.id))

  function updateOrganizations(params: TGetListCommonParams<TOrganization>) {
    params.page = page;

    organization_api.getList(params).then((paged) => {
      setOrganizations(paged.items);
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
          <Button className="rounded" onClick={() => nav("/organization/add")}>
            <img
              style={{ height: "100%", width: "auto" }}
              src="/resources/add.svg"
            ></img>
          </Button>
        </NavGroup>
      </NavBar>
      <SortedFilteredTable
        entities={organizations}
        columnDefinitions={organizationColumnDefinitions}
        isFilterEnabled={isFilterEnabled}
        optionsChanged={updateOrganizations}
        onEntityClick={onEntityClick}
      />
    </>
  );
}
