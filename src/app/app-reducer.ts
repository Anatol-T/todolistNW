export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
    case "APP/SET-ERROR":
      return {...state, ...action.payload}
    default:
      return state
  }
}

export type AppActionsType = SetAppStatusACType | SetAppErrorACType

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
