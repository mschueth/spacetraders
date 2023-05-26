import * as React from 'react';
import {
  CardHeader,
  Avatar, 
  Tooltip,
  Box,
}  from '@mui/material';

import { 
  badgeColor, 
  nameAbr, 
  toWordFirstCharUpper,
} from "../util/formatUtil"


import { Waypoint } from "../types/generated/waypoint"

function wpName(name:string){
  return (name.split('-').slice(-1))[0];
}

export default function WaypointInfoCard(props:{waypoint:Waypoint}) {
  const wp = props.waypoint;

  return (
    <Box key={`faction-card-${wp.symbol}`} sx={{ width: '100%',}}>
      <Box key={`faction-card-${wp.symbol}-map`} sx={{ width: '100%', position:'relative'}}>
        <CardHeader
          sx={{margin:0, padding:0}}
          avatar={
            <Avatar sx={{ bgcolor: badgeColor(wpName(wp.type)), border: "2px solid",}} aria-label="systemSymbol" variant="rounded">
              {nameAbr(wp?.symbol)}
            </Avatar>
          }
          title={wp?.symbol}
          subheader={toWordFirstCharUpper(wp.type||'Unknown')}
        />
      </Box>
    </Box>
  );
}