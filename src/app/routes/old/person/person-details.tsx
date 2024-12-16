import { formatNationality, TPerson } from "app/api/old/persons";
import BigText from "app/components/bigText";
import { Card, Divider, Description } from "app/components/detailsCard";
import { NavBar, NavGroup } from "app/components/navbar";
import { formatDateAndTime } from "app/components/sorted-filtered-table";
import React from "react";
import LocationDetails from "../location/location-details";

export type PersonDetailsProps = {
  person: TPerson;
} & React.PropsWithChildren;

export default function PersonDetails({
  person,
  children,
}: PersonDetailsProps) {
  return (
    <Card className="rounded">
      <NavBar style={{ paddingBottom: "0.5rem" }}>
        <BigText>Person</BigText>
        <NavGroup>{children ?? <></>}</NavGroup>
      </NavBar>
      <Divider />
      <Description>
        <div>Id</div>
        <div>{person.id}</div>
        <div>Owner</div>
        <div>{person.owner.login}</div>
        <div>Admins can Edit</div>
        <div>{person.isEditableByAdmins.toString()}</div>
        <div>Created at</div>
        <div>{formatDateAndTime(person.creationDate)}</div>
      </Description>
      <Divider />
      <Description>
        <div>Eye color</div>
        <div>{person.eyeColor}</div>
        <div>Hair color</div>
        <div>{person.hairColor}</div>
        <div>Weight</div>
        <div>{person.weight}</div>
        <div>Nationality</div>
        <div>{formatNationality(person.nationality)}</div>
      </Description>
      <LocationDetails location={person.location} />
    </Card>
  );
}
