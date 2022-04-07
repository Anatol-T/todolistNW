import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import Tooltip from "@mui/material/Tooltip";


type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
  disabled: boolean
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  console.log('EditableSpan called');
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  }
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
    ? <TextField
      value={title}
      size={"small"}
      style={{width: "200px"}}
      onChange={changeTitle}
      autoFocus
      disabled={props.disabled}
      onBlur={activateViewMode}/>
    : <Tooltip title="Double click to change" placement="top-end">
      <span onDoubleClick={activateEditMode}>{props.value}</span>
    </Tooltip>
});
