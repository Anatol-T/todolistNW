import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {FilterValuesType} from '../todolists-reducer'
import {useDispatch} from 'react-redux'
import {fetchTasksTC} from '../tasks-reducer'

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';
import {RequestStatusType} from "../../../app/app-reducer";
import ButtonGroup from "@mui/material/ButtonGroup";

type PropsType = {
  id: string
  title: string
  entityStatus: RequestStatusType
  tasks: Array<TaskType>
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTask: (taskId: string, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  filter: FilterValuesType

}

export const Todolist = React.memo(function (props: PropsType) {

  const {addTask, id, changeFilter, changeTodolistTitle} = props

  const dispatch = useDispatch()
  useEffect(() => {
    const thunk = fetchTasksTC(id)
    dispatch(thunk)
  }, [])

  const addTaskHandler = useCallback((title: string) => {
    addTask(title, id)
  }, [addTask, id])

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const changeTodolistTitleHandler = useCallback((title: string) => {
    changeTodolistTitle(id, title)
  }, [id, changeTodolistTitle])

  const onAllClickHandler = useCallback(() => changeFilter('all', id), [id, changeFilter])
  const onActiveClickHandler = useCallback(() => changeFilter('active', id), [id, changeFilter])
  const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [id, changeFilter])


  let tasksForTodolist = props.tasks

  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
  }
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
  }

  return <div>
    <h3><EditableSpan value={props.title} onChange={changeTodolistTitleHandler} disabled={props.entityStatus === "loading"}/>
      <IconButton onClick={removeTodolist} disabled={props.entityStatus === "loading"}>
        <DeleteForeverOutlined color="primary" sx={{fontSize: 35}}/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTaskHandler} disabled={props.entityStatus === "loading"}/>
    <div>
      {
        tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.id}
                                        removeTask={props.removeTask}
                                        changeTaskTitle={props.changeTaskTitle}
                                        changeTaskStatus={props.changeTaskStatus}
        />)
      }
    </div>
    <div style={{paddingTop: '10px'}}>
      <ButtonGroup size="small" variant="contained" color={"inherit"}>
        <Button color={props.filter === 'all' ? "primary" : "inherit"}
                onClick={onAllClickHandler}>All
        </Button>
        <Button color={props.filter === 'active' ? "primary" : "inherit"}
                onClick={onActiveClickHandler}
        >Active
        </Button>
        <Button color={props.filter === 'completed' ? "primary" : "inherit"}
                onClick={onCompletedClickHandler}>Completed
        </Button>
      </ButtonGroup>
    </div>
  </div>
})


