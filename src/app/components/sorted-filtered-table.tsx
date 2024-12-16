import { TGetListCommonParams } from "app/api/api";
import { TableContainer } from "app/components/table-container";
import React, { ReactElement, useEffect, useState } from "react";
import {
  FieldValues,
  useForm,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";

type ColumnDefinition<T> = {
  header: string;
  FilterElement: (reg: UseFormRegisterReturn) => ReactElement;
  DataElement: (entry: T) => ReactElement;
};

export type ColumnDefinitions<T> = { [key: string]: ColumnDefinition<T> };

export type TableProps<T extends object> = {
  onEntityClick?: (entity: T) => void;
  columnDefinitions: ColumnDefinitions<T>;
  entities: T[];
  isFilterEnabled: boolean;
  // page, sort or filters changed
  optionsChanged: (newOptions: TGetListCommonParams<T>) => void;
};

export default function SortedFilteredTable<T extends { id: string }>(
  props: TableProps<T>
) {
  // we have several properties to describe each column.
  // The main one is property key. It is used as a key for
  // filter and sort request.
  // Column has header, filter and data body.
  // Sort solely relies on property key.
  // Filters must return filter value. Property key is taken from
  // column definition

  const [sort, setSort] = useState<string | null>(null);

  const { register, watch } = useForm();
  const filters = watch();

  useEffect(() => {
    let options = {};
    if (sort != null) {
      options = { ...options, sort };
    }

    if (props.isFilterEnabled) {
      const filtersWithoutEmpty = Object.fromEntries<string>(
        Object.entries(filters).filter(
          ([key, value]) => value != undefined && (value.length > 0 || value)
        )
      );
      options = { ...options, filters: filtersWithoutEmpty };
    }

    props.optionsChanged(options);
  }, [...Object.values(filters), sort, props.isFilterEnabled]);

  return (
    <TableContainer>
      <thead>
        <tr>
          {generateHeaderCellsWithSort<T>({
            onSortChange: setSort,
            sortKey: sort,
            columns: props.columnDefinitions,
          })}
        </tr>
        {props.isFilterEnabled ? (
          <tr>
            {generateFilterCells({
              columns: props.columnDefinitions,
              register,
            })}
          </tr>
        ) : (
          <></>
        )}
      </thead>
      <tbody>
        {props.entities.map((entity) => (
          <Row
            columnDefinitions={props.columnDefinitions}
            onEntityClick={props.onEntityClick}
            entity={entity}
            key={entity.id}
          ></Row>
        ))}
      </tbody>
    </TableContainer>
  );
}

type TTableHeaderProps<T> = {
  columns: ColumnDefinitions<T>;
  sortKey: string | null;
  onSortChange: (newSort: string | null) => void;
};

function generateHeaderCellsWithSort<T>({
  columns,
  sortKey,
  onSortChange,
}: TTableHeaderProps<T>) {
  const headerCells: React.JSX.Element[] = [];

  for (const columnKey in columns) {
    const isCurrentSortColumn = sortKey === columnKey;
    const sortIcon = <img src="./resources/chevron-down.svg" />;

    let cell = (
      <th
        key={columnKey}
        onClick={() => onSortChange(isCurrentSortColumn ? null : columnKey)}
      >
        {columns[columnKey].header}
        {isCurrentSortColumn ? sortIcon : <></>}
      </th>
    );

    headerCells.push(cell);
  }

  return headerCells;
}

export type TTableFilterProps<T> = {
  columns: ColumnDefinitions<T>;
  register: UseFormRegister<FieldValues>;
};

function generateFilterCells<T>({ columns, register }: TTableFilterProps<T>) {
  const cells = [];

  for (const columnKey in columns) {
    const column = columns[columnKey];
    let cell = column.FilterElement(register(columnKey));
    cells.push(<th key={columnKey}>{cell}</th>);
  }

  return cells;
}

type RowProps<T extends object> = {
  entity: T;
} & Pick<TableProps<T>, "onEntityClick" | "columnDefinitions">;

function Row<T extends object>({
  entity,
  columnDefinitions,
  onEntityClick,
}: RowProps<T>) {
  const cells = [];
  for (const columnKey in columnDefinitions) {
    const column = columnDefinitions[columnKey];
    const cell = column.DataElement(entity);
    cells.push(<td key={columnKey}>{cell}</td>);
  }

  return <tr onClick={() => onEntityClick?.(entity)}>{cells}</tr>;
}

export function formatDateAndTime(calculatedAt: number) {
  return new Date(calculatedAt).toLocaleString("ru-RU");
}
