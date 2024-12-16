import { TWorker } from "app/api/old/workers";
import BigText from "app/components/bigText";
import { Card, Divider, Description } from "app/components/detailsCard";
import { NavBar, NavGroup } from "app/components/navbar";
import { formatDateAndTime } from "app/components/sorted-filtered-table";
import React from "react";
import PersonDetails from "../person/person-details";
import OrganizationDetails from "../organization/organization-details";

export type WorkerDetailsProps = {
  worker: TWorker;
} & React.PropsWithChildren;

export default function WorkerDetails({
  worker,
  children,
}: WorkerDetailsProps) {
  return (
    <Card className="rounded">
      <NavBar>
        <BigText>Worker</BigText>
        <NavGroup>{children ?? <></>}</NavGroup>
      </NavBar>
      <Divider />
      <Description>
        <div>Id</div>
        <div>{worker.id}</div>
        <div>Owner</div>
        <div>{worker.owner.login}</div>
        <div>Admins can Edit</div>
        <div>{worker.isEditableByAdmins.toString()}</div>
        <div>Created at</div>
        <div>{formatDateAndTime(worker.creationDate)}</div>
      </Description>
      <Divider />
      <Description>
        <div>Name</div>
        <div>{worker.name}</div>
        <div>Coordinates</div>
        <div>X: {worker.coordinates.x}<br />Y: {worker.coordinates.y}</div>
        <div>Salary</div>
        <div>{worker.salary}</div>
        <div>Rating</div>
        <div>{worker.rating}</div>
        <div>Position</div>
        <div>{worker.position}</div>
        <div>Status</div>
        <div>{worker.status}</div>
      </Description>
      <OrganizationDetails organization={worker.organization} />
      <PersonDetails person={worker.person} />
    </Card>
  );
}
