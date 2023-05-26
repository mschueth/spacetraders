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

import {getWaypointProps} from "../core/generateGameData"

import { Waypoint } from "../types/generated/waypoint"
import { System } from "../types/generated/system"
import WaypointInfoCard from "../components/WaypointInfoCard";

const sx = {
  circle: {
    display: 'flex',
    width: '50px',
    height: '50px',
    background:'linear-gradient(127deg,rgba(0,0,0,.75),transparent,transparent),linear-gradient(336deg, rgba(0,0,255,.75), transparent 70%)',
    backgroundColor: 'white',
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

function wpName(name:string){
  return (name.split('-').slice(-1))[0];
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

  const starSx = {
    ...sx.circle,
    width: `${factor*10}px`,
    height: `${factor*10}px`,
    left: `${((boundry?.x.diff||0)/2)*factor - factor}px`,
    top: `${dimensions.height + 80+((boundry?.y.diff||0)/2)*factor - factor}px`,
    boxShadow: `inset 0 0 ${factor*2}px #000`,
    border: '1px solid #000',
    backgroundColor: (system?.type||'').split('_')[0],
    background:'linear-gradient(127deg,rgba(250,250,250,.75),transparent,transparent),linear-gradient(336deg, rgba(255, 234, 0,.75),transparent, transparent 70%)',
  }

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
        <Tooltip title={toWordFirstCharUpper(system.type)+' '+wpName(system.symbol)}>
          <Box sx={starSx}></Box>
        </Tooltip>
        {waypoints.map(wp=>{
          const selected = waypointSymbol === wp.symbol;
          const wpp = getWaypointProps(wp);
          const size = wpp.size.factor*factor;
          const wpSx = {
            ...sx.circle,
            backgroundColor: badgeColor(wpName(wp.type)),
            width: `${size*10}px`,
            height: `${size*10}px`,
            left: `${((wp.x)+(boundry?.x.offset||0)-5)*factor - size}px`,
            top: `${dimensions.height + 100+((wp.y)+(boundry?.y.offset||0)-5)*factor - size}px`,
            boxShadow: `inset 0 0 ${size*2}px #000`,
            border: selected?`${size/2}px solid #fff`:'1px solid #000',
          }
          return (
            <Tooltip title={toWordFirstCharUpper(wp.type)+' '+wpName(wp.symbol)}>
              <Box sx={wpSx} onClick={()=>{setWaypointSymbol(wp.symbol)}}></Box>
            </Tooltip>
          )
        })}
      </Box>
      {waypoints.filter(wp=>waypointSymbol===wp.symbol).map(wp=>{return (<WaypointInfoCard waypoint={wp} />)})}
    </Box>
  );
}