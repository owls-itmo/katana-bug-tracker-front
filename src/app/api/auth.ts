import { setUserData, TPreservedUserData } from "app/auth/auth"
import api from "./api"
import { NavigateFunction } from "react-router-dom"
import { AuthRequestPayload, RegisterRequestPayload } from "./generated/ApiImpl"
import * as jose from "jose"

const DISPLAY_NAME_PAYLOAD_PROPERTY = "displayName";


export function registerAndLoginUser(nav: NavigateFunction) {
  return async (data: RegisterRequestPayload) => {
    const response = await api.register(data)

    setUserData(preservedFromToken(response.data.token))

    nav("/")
  }
}

export function logoutUser(nav: NavigateFunction) {
  return () => {
    setUserData(null)
    window.location.reload()
  }
}

export async function loginUser(data: AuthRequestPayload): Promise<undefined> {
  const sessionResponse = await api.login(data)

  setUserData(preservedFromToken(sessionResponse.data.token))

  // return 
}

function preservedFromToken(token: string): TPreservedUserData {
  const payload = jose.decodeJwt(token)

  return {
    token,
    displayedUsername: payload[DISPLAY_NAME_PAYLOAD_PROPERTY] as string,
  };
}


