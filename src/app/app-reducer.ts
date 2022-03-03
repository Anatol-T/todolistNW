import {Dispatch} from "redux";
import {AuthActionsType, setIsLoggedInAC} from "../features/login/authReducer";
import {authAPI} from "../api/todolists-api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
    case "APP/SET-ERROR":
      return {...state, ...action.payload}
    case "APP/SET-INITIALIZED":
      return {...state, isInitialized: action.isInitialized}
    default:
      return state
  }
}

export type AppActionsType = SetAppStatusACType | SetAppErrorACType | SetIsInitializedActionType | AuthActionsType

export type SetIsInitializedActionType = ReturnType<typeof setIsInitialized>
export const setIsInitialized = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: "APP/SET-STATUS",
    payload: {status}
  } as const
}

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: null | string) => {
  return {
    type: "APP/SET-ERROR",
    payload: {error}
  } as const
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me()
    .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true));
        }
      }
    ).finally(()=>{
    dispatch(setIsInitialized(true))
  })

}
