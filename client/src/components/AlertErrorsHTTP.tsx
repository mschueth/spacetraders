
import * as React from 'react';
import {
  Alert,AlertTitle,
  List,ListItem,ListItemIcon,ListItemText,
}  from '@mui/material';

import {

    DangerousTwoTone,
    ReportProblemTwoTone,
} from '@mui/icons-material';

import { 
    ErrorMessageHTTP,
  } from "../types/gameType";

export default function AlertErrorsHTTP(props:{ErrorMessageHTTP:ErrorMessageHTTP}){
    const keys = Object.keys(props.ErrorMessageHTTP.error.data)

    if(keys.length === 0){
        return (<Alert severity="error"><AlertTitle>Error ({props.ErrorMessageHTTP?.error?.code})</AlertTitle>{props.ErrorMessageHTTP?.error?.message || "Unknown error with the API."}</Alert>)
    }

    return (
        <div>
            {keys.map((key)=>{
                const data = props.ErrorMessageHTTP.error.data[key];
                return (
                    <Alert severity="error" key={`AlertErrorsHTTP-${key}`} style={{margin:10}}>
                        <AlertTitle>{key.toUpperCase()}</AlertTitle>
                        <List>
                            {data.map((d,i)=>(
                                <ListItem style={{padding:0, margin:0}}>
                                    <ListItemIcon style={{padding:0, margin:0}}>
                                        <ReportProblemTwoTone color="error" />
                                    </ListItemIcon>
                                    <ListItemText primary={d} key={`AlertErrorsHTTP-${key}-li-${i}`} style={{padding:0, margin:0}} />
                                </ListItem>
                            ))}
                        </List>
                    </Alert>
                )
            })}
        </div>
    )

}
