const initialState = {
  user: null,
  profile: null
}

const LOGGED_IN = 'LOGGED_IN',
      LOGGED_OUT = 'LOGGED_OUT',
      GET_PROFILE = 'GET_PROFILE'

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return {...state, user: action.payload}
    case LOGGED_OUT:
      return {...state, user: null}
    case GET_PROFILE:
      return {...state, profile: action.payload}
    default:
      return {...state}
  }
}

export function logIn (user) {
  return {
    type: LOGGED_IN,
    payload: user
  }
}

export function logOut (user) {
  return {
    type: LOGGED_OUT
  }
}

export function getProfile (profile) {
  return {
    type: GET_PROFILE,
    payload: profile
  }
}
