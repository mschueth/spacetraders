
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
  } from "../types/game";

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
                    <Alert severity="error" key={`AlertErrorsHTTP-${key}`}>
                        <AlertTitle>{key}</AlertTitle>
                        <List>
                            {data.map((d,i)=>(
                                <ListItem>
                                    <ListItemIcon style={{padding:0}}>
                                        <ReportProblemTwoTone color="error" />
                                    </ListItemIcon>
                                    <ListItemText primary={d} key={`AlertErrorsHTTP-${key}-li-${i}`} style={{paddingLeft:0}} />
                                </ListItem>
                            ))}
                        </List>
                    </Alert>
                )
            })}
        </div>
    )

}
