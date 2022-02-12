import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST',
  id: string
}
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE',
  id: string
  title: string
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string
  filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodosActionType

const initialState: Array<TodolistDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
  {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case "SET-TODOS": {
      return action.todolists.map((m) => ({...m, filter: 'all'}))
    }
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [{
        id: action.todolist.id,
        title: action.todolist.title,
        filter: 'all',
        addedDate: action.todolist.addedDate,
        order: action.todolist.order
      }, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title;
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.filter;
      }
      return [...state]
    }
    default:
      return state;
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist:TodolistType) => {
  return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodosAC = (todolists: TodolistType[]) => {
  return {type: 'SET-TODOS', todolists} as const
}
export type SetTodosActionType = ReturnType<typeof setTodosAC>


export const setTodosThunk = (dispatch: Dispatch) => {
  todolistsAPI.getTodolists()
    .then((res) => {
      dispatch(setTodosAC(res.data))
    })
}
export const addTodolistTC = (title: string)=> (dispatch: Dispatch) => {
  todolistsAPI.createTodolist(title)
    .then((res)=>{
      dispatch(addTodolistAC(res.data.data.item))
    })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistsAPI.deleteTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC(todolistId))
      }
    })
}
export const changeTodolistTitleTC = (todolistId: string, title:string) => (dispatch: Dispatch) => {
  todolistsAPI.updateTodolist(todolistId, title)
    .then((res)=>{
      if (res.data.resultCode === 0) {
        dispatch(changeTodolistTitleAC(todolistId, title))
      }
    })
}