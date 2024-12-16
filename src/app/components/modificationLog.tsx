import { ModificationLog } from "app/api/api";
import React from "react";
import { TableContainer } from "./table-container";
import { formatDateAndTime } from "./sorted-filtered-table";

export type ModificationLogTableProps = {
  modificationLog: ModificationLog;
};

export default function ModificationLogTable({
  modificationLog,
}: ModificationLogTableProps) {
  return (
    <TableContainer>
      <thead>
        <tr>
          <th>Issuer</th>
          <th>Modified at</th>
        </tr>
      </thead>
      <tbody>
        {modificationLog.map((record) => (
          <tr key={record.id}>
            <td>{record.issuer.login}</td>
            <td>{formatDateAndTime(record.modification_timestamp)}</td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}
