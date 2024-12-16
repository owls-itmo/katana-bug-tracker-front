import React from "react";
import Button from "app/components/button";
import { changeRole } from "app/api/users";
import { getUserData } from "app/auth/auth";

export default function UserPanel() {
  return (
    <Button className="rounded" onClick={() => changeRole(getUserData()?.displayedUsername!, "Admin")}>
      Request role change for Admin role
    </Button>
  );
}
