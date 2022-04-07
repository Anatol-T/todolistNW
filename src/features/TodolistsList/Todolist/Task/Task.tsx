import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { TaskStatuses, TaskType } from '../../../../api/todolists-api'
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const {task, todolistId} = props
    const onClickHandler = useCallback(() => props.removeTask(task.id, todolistId), [task.id, todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }, [task.id, todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(task.id, newValue, todolistId)
    }, [task.id, todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
            disabled={props.task.disabled}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} disabled={props.task.disabled}/>
        <IconButton onClick={onClickHandler} disabled={props.task.disabled}>
            <DeleteForeverOutlined/>
        </IconButton>
    </div>
})
