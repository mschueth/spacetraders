import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

import {
    CancelTwoTone,
    CheckCircleTwoTone,
 } from '@mui/icons-material';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props:{open:boolean, title?:string, content?:string, children?:JSX.Element|JSX.Element[], onClose?:Function, onCancel?:Function, onConfirm?:Function}) {

  function onClose(){
    if(props.onClose){
        props.onClose();
    }
  }
  function onCancel(){
    if(props.onCancel){
        props.onCancel();
    }
  }
  function onConfirm(){
    if(props.onConfirm){
        props.onConfirm();
    }
  }

  const RenderChildren = ()=>{
    return (
        <div style={{marginTop:10}}>
            {props.children}
        </div>
    )
  }

  return (
    <Dialog
    open={props.open}
    onClose={onClose}
    PaperComponent={PaperComponent}
    aria-labelledby="draggable-dialog-title"
    >
    <DialogTitle style={{ cursor: 'move', verticalAlign:"center"}} id="draggable-dialog-title">
        {props.title||'Confirm'}
    </DialogTitle>
    <DialogContent>
        <DialogContentText>
            {props.content}
        </DialogContentText>
        <RenderChildren />
    </DialogContent>
    <DialogActions>
        {props.onCancel?(<Button onClick={onCancel} fullWidth variant="contained" color="error" startIcon={<CancelTwoTone/>}>Cancel</Button>):(<div/>)}
        {props.onConfirm?(<Button onClick={onConfirm} fullWidth variant="contained" color="success" startIcon={<CheckCircleTwoTone/>}>Confirm</Button>):(<div/>)}
    </DialogActions>
    </Dialog>
  );
}