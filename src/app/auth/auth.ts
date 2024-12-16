
// impossible to use hooks within router
// therefore can't use react context api 

// to store token
const KEY_USER_DATA = "user_data"

let preservedUserData: TPreservedUserData | null = JSON.parse(window.localStorage.getItem(KEY_USER_DATA)!);

export type TPreservedUserData = { token: string, displayedUsername: string }

export function setUserData(data: TPreservedUserData | null) {
  if (data == null) {
    window.localStorage.removeItem(KEY_USER_DATA)
  } else {
    window.localStorage.setItem(KEY_USER_DATA, JSON.stringify(data))
  }
  
  preservedUserData = data
}

export function getUserData() {
  return preservedUserData
}

export default function getUserToken() {
  return preservedUserData?.token
}

export function isAuthorized() {
  return preservedUserData?.token != null
}
