import { TLocation } from "app/api/old/locations";
import BigText from "app/components/bigText";
import { Card, Divider, Description } from "app/components/detailsCard";
import { NavBar, NavGroup } from "app/components/navbar";
import { formatDateAndTime } from "app/components/sorted-filtered-table";
import React from "react";

export type LocationDetailsProps = {
  location: TLocation;
} & React.PropsWithChildren;

export default function LocationDetails({
  location,
  children,
}: LocationDetailsProps) {
  return (
    <Card className="rounded">
      <NavBar style={{ paddingBottom: "0.5rem" }}>
        <BigText>Location</BigText>
        <NavGroup>{children ?? <></>}</NavGroup>
      </NavBar>
      <Divider />
      <Description>
        <div>Id</div>
        <div>{location.id}</div>
        <div>Owner</div>
        <div>{location.owner.login}</div>
        <div>Admins can Edit</div>
        <div>{location.isEditableByAdmins.toString()}</div>
        <div>Created at</div>
        <div>{formatDateAndTime(location.creationDate)}</div>
      </Description>
      <Divider />
      <Description>
        <div>X</div>
        <div>{location.x}</div>
        <div>Y</div>
        <div>{location.y}</div>
        <div>Z</div>
        <div>{location.z}</div>
        <div>Name</div>
        <div>{location.name}</div>
      </Description>
    </Card>
  );
}
