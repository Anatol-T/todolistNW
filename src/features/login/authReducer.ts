import { Dispatch } from 'redux'
import { SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../../app/app-reducer'
import {authAPI, AuthPayloadType, securityAPI} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setTodolistsAC, SetTodolistsActionType} from "../TodolistsList/todolists-reducer";
import {ThunkDispatch} from "redux-thunk";

const initialState = {
  isLoggedIn: false,
  captchaUrl: ""
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    case "login/SET-CAPTCHA":
      return {...state, captchaUrl: action.captchaUrl}
    default:
      return state
  }
}
// actions
export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) =>
  ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export type SetCaptchaACType = ReturnType<typeof setCaptchaAC>
const setCaptchaAC = (captchaUrl: string) => {
  return {
    type: "login/SET-CAPTCHA",
    captchaUrl
  } as const
}

// thunks
export const loginTC = (data: AuthPayloadType) => (dispatch: ThunkDispatch<any, any, any>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setCaptchaAC(""))
        dispatch(setAppStatusAC('succeeded'))
      } else if (res.data.resultCode === 10) {
        dispatch(getCaptchaURLTC())
        dispatch(setAppStatusAC('idle'))
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
export const logoutTC = () => (dispatch: Dispatch<AuthActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setTodolistsAC([]))
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {

      handleServerNetworkError(error, dispatch)
    })
}
export const getCaptchaURLTC = () => (dispatch:Dispatch) => {
  //dispatch(getUserDataAC())
  securityAPI.getCaptcha()
    .then(res => {
      dispatch(setCaptchaAC(res.data.url))
    })
}
// types
export type AuthActionsType = SetIsLoggedInACType | SetAppStatusACType | SetAppErrorACType
| SetTodolistsActionType | SetCaptchaACType
