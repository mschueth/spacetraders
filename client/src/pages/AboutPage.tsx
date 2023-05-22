import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Button,
  TextField,
  Tab,Tabs,
  MenuItem,
  List,ListItem,
  Alert,AlertTitle,
  Paper,
  ListItemText,
  Grid,
}  from '@mui/material';

import { GameData } from '../types/gameType';
import {
  formatDateTime,
} from "../util/formatUtil"


const sx = {
  button: { 
    mt: 2, 
    mb: 2 
  },
  bodyText:{
    alignItems: "left", 
    padding: 2, 
    width:"100%"
  },
  boxContent:{  
    boxShadow: 3,
    borderRadius: 2,
    px: 4,
    py: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    elevation: 6,
  },
  list:{},
  listItemText:{},
  link:{},
  gridContainer:{},
  gridItem:{},
  gridItem12:{ marginTop: 15},
}

function DisplayField(props:{label:string,value:string}){
  return(
    <TextField
      label={props.label}
      sx={{textAlign:"right"}}
      disabled
      value={props.value}
      size="small"
    />
  )
}

export default function AboutPage(props:{gameData:GameData, setGameData:(gd:GameData)=>void}) {

  const gd = props.gameData
  return (
    <Container component="main" maxWidth="sm" sx={{paddingTop: 2}}>
      <Paper  elevation={3}>
        <Box
          sx={sx.boxContent}
        >
          <Grid container>
            <Grid item xs={12} style={sx.gridItem12}>
              <Typography component="h1" variant="h4">
                Space Traders
              </Typography>
              <Typography component="h1" variant="body2">
                {gd.info?.description}
              </Typography>
            </Grid>
            <Grid item xs={12} style={sx.gridItem12}>
              <Typography component="h1" variant="h4">
                Status
              </Typography>
              <Typography component="h1" variant="body2">
                {gd.info?.status || 'Unknown server status. Backend system may be down.'}
              </Typography>
            </Grid>
            <Grid item xs={12} style={sx.gridItem12}>
              <Typography component="h1" variant="h4">
                Next Game Restart
              </Typography>
              <Typography component="h1" variant="body2">
                After a game restart, all progress is lost, and you must create a new account.
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{marginTop: 1}}>
            <Grid item xs={true} style={{verticalAlign:"middle", textAlign:"center"}}>
              <DisplayField 
                label="Frequency"
                value= {gd.info?.serverResets?.frequency || ''}
                /> 
            </Grid>
            <Grid item xs={true} style={{verticalAlign:"middle", textAlign:"center"}}>
              <DisplayField 
                label="Next"
                value={formatDateTime(gd.info?.serverResets?.next || '') || 'Unknown'}
                /> 
            </Grid>
            {((gd.info?.announcements?.length) || 0)>0?(
              <Grid item xs={12} style={sx.gridItem12}>
                <Typography component="h1" variant="h4">
                  Announcements
                </Typography>
                {gd.info?.announcements.map(an=>{
                  return (
                    <Box sx={{ marginTop: 2}}>
                      <Typography component="h1" variant="h5">{an.title}</Typography>
                      <Typography component="h1" variant="body2">{an.body}</Typography>
                    </Box>
                  )
                })}
              </Grid>
            ):(<div/>)}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}