import {
  TOrganization,
} from "app/api/old/organizations";
import BigText from "app/components/bigText";
import { Card, Description, Divider } from "app/components/detailsCard";
import { NavGroup, NavBar } from "app/components/navbar";
import React from "react";

export type OrganizationDetailsProps = {
  organization: TOrganization;
} & React.PropsWithChildren;

export default function OrganizationDetails({organization, children}: OrganizationDetailsProps) {
  return (
    <>
      <Card className="rounded">
        <NavBar style={{ paddingBottom: "0.5rem" }}>
          <BigText>Organization</BigText>
          <NavGroup>{children ?? <></>}</NavGroup>
        </NavBar>
        <Divider />
        <Description>
          <div>Id</div>
          <div>{organization.id}</div>
          <div>Owner</div>
          <div>{organization.owner.login}</div>
          <div>Admins can Edit</div>
          <div>{organization.isEditableByAdmins.toString()}</div>
          <div>Created at</div>
          <div>{organization.creationDate}</div>
        </Description>
        <Divider />
        <Description>
          <div>Company name</div>
          <div>{organization.fullName}</div>
          <div>Annual turnover</div>
          <div>{organization.annualTurnover}</div>
          <div>Employees count</div>
          <div>{organization.employeesCount}</div>
          <div>Official address ZipCode</div>
          <div>{organization.officialAddress.zipCode}</div>
          <div>Rating</div>
          <div>{organization.rating}</div>
          <div>Postal address</div>
          <div>{organization.postalAddress.zipCode}</div>
        </Description>
      </Card>
    </>
  );
}
