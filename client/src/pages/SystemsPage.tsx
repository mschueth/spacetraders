import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  CardHeader,
  CardContent,
  Avatar, 
  Link,
  Paper,
}  from '@mui/material';
import { GameData } from '../types/gameType';


import { 
  badgeColor, 
  nameAbr, 
  toWordFirstCharUpper,
} from "../util/formatUtil"


import { Waypoint } from "../types/generated/waypoint"
import { System } from "../types/generated/system"

import WaypointMapCard from '../components/WaypointMapCard';

const sx = {
  button: { 
    mt: 2, 
    mb: 2 
  },
  bodyText:{
  //  alignItems: "left", 
    padding: 2, 
  //  width:"100%"
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
    width: '100%',
  },
}
export default function SystemsPage(props:{gameData:GameData, setGameData:(gd:GameData)=>void}) {
  let system: System|undefined;
  let waypoints:Waypoint[]=[]

  if(props.gameData.systems){
    system=props.gameData.systems[0]
  }
  if(system){
    waypoints = waypoints.filter(wp=>wp.systemSymbol === system?.symbol);
  }
  console.log(system);
  console.log(waypoints);

  return (
    <Container component="main" maxWidth="sm" sx={{paddingTop: 2}}>
      <Paper  elevation={3}>
        <Box
          sx={sx.boxContent}
        >
          {system?(
            <WaypointMapCard waypoints={props.gameData.waypoints || []} system={system} />
          ):(<Box />)}
        </Box>
      </Paper>
    </Container>

  );
}