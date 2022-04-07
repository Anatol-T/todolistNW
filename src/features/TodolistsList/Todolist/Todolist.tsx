import React, { useCallback, useEffect } from 'react'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { Task } from './Task/Task'
import { TaskStatuses, TaskType } from '../../../api/todolists-api'
import { FilterValuesType } from '../todolists-reducer'
import { useDispatch } from 'react-redux'
import { fetchTasksTC } from '../tasks-reducer'

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
    console.log('Todolist called')

    const dispatch = useDispatch()
    useEffect(() => {
        const thunk = fetchTasksTC(props.id)
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle} disabled={props.entityStatus === "loading"}/>
            <IconButton onClick={removeTodolist} disabled={props.entityStatus === "loading"}>
                <DeleteForeverOutlined color="primary" sx={{fontSize: 35}}/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.entityStatus === "loading"}/>
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


