import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodosActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  todolistId: string
  taskId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK',
  task: TaskType
  todolistId: string
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS',
  todolistId: string
  taskId: string
  status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE',
  todolistId: string
  taskId: string
  title: string
}
export type SetTasksActionType = {
  type: 'SET-TASKS'
  tasks: Array<TaskType>
  todolistId: string
}


type ActionsType = RemoveTaskActionType | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodosActionType
  | SetTasksActionType

const initialState: TasksStateType = {
  /*"todolistId1": [
      { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ],
  "todolistId2": [
      { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TODOS": {
      const copyState = {...state}
      action.todolists.forEach((tl) => {
        copyState[tl.id] = []
      })
      return copyState
    }
    case 'SET-TASKS': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = action.tasks
      return stateCopy
    }
    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
      return stateCopy;
    }
    case 'ADD-TASK': {
      return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId];
      state[action.todolistId] = todolistTasks
        .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
      return ({...state});
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      state[action.todolistId] = todolistTasks
        .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
      return ({...state});
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolist.id]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state};
      delete copyState[action.id];
      return copyState;
    }
    default:
      return state;
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType, todolistId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', task, todolistId}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
  return {type: 'SET-TASKS', tasks, todolistId}
}


export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistsAPI.getTasks(todolistId)
    .then((res) => {
      const tasks = res.data.items
      const action = setTasksAC(tasks, todolistId)
      dispatch(action)

    })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  todolistsAPI.deleteTask(todolistId, taskId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        const action = removeTaskAC(taskId, todolistId);
        dispatch(action);
      }
    })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTask(todolistId, title)
    .then((res) => {
      dispatch(addTaskAC(res.data.data.item, todolistId))
    })
}
export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const currentTask:TaskType = getState().tasks[todolistId].filter(f=> f.id === taskId)[0]

  const model: UpdateTaskModelType = {
    title: currentTask.title,
    status: status,
    deadline: currentTask.deadline,
    description: currentTask.description,
    priority: currentTask.priority,
    startDate: currentTask.startDate
  }
  todolistsAPI.updateTask(todolistId, taskId, model)
    .then(()=>{
      dispatch(changeTaskStatusAC(taskId, status,todolistId))
    })
}
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const currentTask:TaskType = getState().tasks[todolistId].filter(f=> f.id === taskId)[0]

    const model: UpdateTaskModelType = {
      title,
      status: currentTask.status,
      deadline: currentTask.deadline,
      description: currentTask.description,
      priority: currentTask.priority,
      startDate: currentTask.startDate
    }
    todolistsAPI.updateTask(todolistId, taskId, model)
      .then(()=>{
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
      })
  }
