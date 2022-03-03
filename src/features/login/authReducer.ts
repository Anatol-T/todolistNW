import { Dispatch } from 'redux'
import {AppActionsType, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../../app/app-reducer'
import {authAPI, AuthPayloadType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setTodolistsAC, SetTodolistsActionType} from "../TodolistsList/todolists-reducer";

const initialState = {
  isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}
// actions
export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) =>
  ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: AuthPayloadType) => (dispatch: Dispatch<AppActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
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

// types
export type AuthActionsType = SetIsLoggedInACType | SetAppStatusACType | SetAppErrorACType
| SetTodolistsActionType
