import { getUserData, isAuthorized } from "app/auth/auth";
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export type ProtectedRouteProps = React.PropsWithChildren<{ adminsOnly?: boolean}>

export default function ProtectedRoute({children, adminsOnly}: ProtectedRouteProps) {
  // const isAuthorized = useIsAuthorized()
  const nav = useNavigate()

  if (!isAuthorized()) {
    useEffect(() => {
      nav("/login")
    }, [])
    return <></>
  }

  if (adminsOnly && getUserData()?.role != "Admin") {
    useEffect(() => {
      nav("/")
    }, [])
    return <></>
  }

  return children


}



