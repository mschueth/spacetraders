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
import { System } from "../types/generated/system"

const sx = {
  circle: {
    display: 'flex',
    width: '50px',
    height: '50px',
    background:'linear-gradient(127deg,rgba(0,0,0,.75),transparent)',
    backgroundColor: 'green',
    borderRadius: '50%',
    boxShadow: 'inset 0 0 20px #000',
    border: '1px solid #000',
    position: 'absolute',
  },
  text: {
    margin:'auto',
  },
};
type Boundry = {
  x:{
    min:number
    max:number
    offset:number
    diff:number
  },
  y:{
    min:number
    max:number
    offset:number
    diff:number
  }
}

function getBoundry(waypoints:Waypoint[]): Boundry{
  var boundry:Boundry|undefined = undefined;
  waypoints.forEach(wp=>{
    if(!!boundry){
      if(boundry.x.min > wp.x){
        boundry.x.min = wp.x
        boundry.x.offset=(wp.x<0)?Math.abs(wp.x):0
        boundry.x.diff = boundry.x.max - boundry.x.min
      }
      if(boundry.x.max < wp.x){
        boundry.x.max = wp.x
        boundry.x.diff = boundry.x.max - boundry.x.min
      }
      if(boundry.y.min > wp.y){
        boundry.y.min = wp.y
        boundry.y.offset=(wp.y<0)?Math.abs(wp.y):0
        boundry.y.diff = boundry.y.max - boundry.y.min
      }
      if(boundry.y.max < wp.y){
        boundry.y.max = wp.y
        boundry.y.diff = boundry.y.max - boundry.y.min
      }
    }else{
      boundry={
        x:{
          min:wp.x,
          max:wp.x,
          offset:(wp.x<0)?Math.abs(wp.x):0,
          diff:0,
        },
        y:{
          min:wp.y,
          max:wp.y,
          offset:(wp.y<0)?Math.abs(wp.y):0,
          diff:0,
        }
      }
    }
  })
  return boundry || {x:{min:0,max:0,offset:0,diff:0},y:{min:0,max:0,offset:0,diff:0}}
}


export default function WaypointMapCard(props:{waypoints:Waypoint[], system:System}) {
  const waypoints = props.waypoints;
  const system = props.system;
  const ref = React.useRef<HTMLInputElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [waypointSymbol, setWaypointSymbol] = React.useState<string>();

  React.useEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight
      });
    }
  }, [waypointSymbol]);



  const boundry = getBoundry(waypoints);
  const factor = dimensions.width / Math.floor((Math.abs(boundry?.x?.diff || 100 )));

  return (
    <Box key={`faction-card-${system.symbol}`} sx={{ width: '100%',}}>
      <Box key={`faction-card-${system.symbol}-map`} sx={{ width: '100%', position:'relative'}}>
        <CardHeader
          sx={{margin:0, padding:0}}
          ref={ref}
          avatar={
            <Avatar sx={{ bgcolor: badgeColor(system?.symbol), border: "2px solid",}} aria-label="systemSymbol" variant="rounded">
              {nameAbr(system?.symbol)}
            </Avatar>
          }
          title={system?.symbol}
          subheader={toWordFirstCharUpper(system?.type||'Unknown')}
        />
        {waypoints.map(wp=>{
          function wpName(name:string){
            return (name.split('-').slice(-1))[0];
          }
          const selected = waypointSymbol === wp.symbol;
          const wpSx = {
            ...sx.circle,
            backgroundColor: badgeColor(wpName(wp.type)),
            width: `${factor*10}px`,
            height: `${factor*10}px`,
            left: `${((wp.x)+(boundry?.x.offset||0)-5)*factor}px`,
            top: `${dimensions.height + 80+((wp.y)+(boundry?.y.offset||0)-5)*factor}px`,
            boxShadow: `inset 0 0 ${factor*2}px #000`,
            border: selected?`${factor/2}px solid #fff`:'1px solid #000',
          }
          return (
            <Tooltip title={toWordFirstCharUpper(wp.type)+' '+wpName(wp.symbol)}>
              <Box sx={wpSx} onClick={()=>{setWaypointSymbol(wp.symbol)}}></Box>
            </Tooltip>
          )
        })}
      </Box>
    </Box>
  );
}