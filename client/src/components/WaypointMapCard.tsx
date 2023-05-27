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

import {
  getWaypointProps,
  getSystemProps,
} from "../core/generateGameData"

import { Waypoint } from "../types/generated/waypoint"
import { System } from "../types/generated/system"
import WaypointInfoCard from "../components/WaypointInfoCard";
import { toNumbersOnly } from "../util/validateUtil";

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
  const scale = dimensions.width / Math.floor((Math.abs(boundry?.x?.diff || 100 )));

  const syp = getSystemProps(system);
  const sySize = (syp.size.factor*scale)*15;

  const starSx = {
    ...sx.circle,
    zIndex: 1,
    backgroundColor: syp.gen.color,
    width: `${sySize}px`,
    height: `${sySize}px`,
    left: `${((boundry.x.diff||1)*scale - sySize)/2}px`, 
    top: `${100 + dimensions.height + ((boundry.y.diff||1)*scale - sySize)/2}px`, 
    boxShadow: `inset 0 0 ${sySize*0.1}px #000`,
    border: '1px solid #000',
    background:`linear-gradient(127deg,${syp.gen.shadow},transparent,transparent),linear-gradient(336deg, ${syp.gen.highlight}, transparent 70%)`,
    transform: `rotate(${syp.gen.rotation}deg)`, 
  }

  return (
    <Box key={`faction-card-${system.symbol}`} sx={{ width: '100%',}}>
      <Box key={`faction-card-${system.symbol}-map`} sx={{ width: '100%', position:'relative'}}>
        <CardHeader
          sx={{margin:0, padding:0}}
          ref={ref}
          avatar={
            <Avatar sx={{ 
                bgcolor: syp.gen.color, 
                background:`linear-gradient(127deg,${syp.gen.shadow},transparent,transparent),linear-gradient(336deg, ${syp.gen.highlight}, transparent 70%)`,
                border: "2px solid",
              }} aria-label="systemSymbol" variant="rounded">
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
          const size = (wpp.size.factor*scale)*10;
          const xOffset = (boundry?.x.offset||0)*scale;
          const yOffset = 100 + dimensions.height + (boundry?.y.offset||0)*scale;
          

          const wpSx = {
            ...sx.circle,
            zIndex: wpp.zindex,
            backgroundColor: wpp.gen.color,
            width: `${size}px`,
            height: `${size}px`,
            left: `${xOffset + (wp.x*scale - size/2)}px`, 
            top: `${yOffset + (wp.y*scale - size/2)}px`, 
            boxShadow: `inset 0 0 ${size*0.1}px #000`,
            border: selected?`${size/20}px solid #fff`:'1px solid #000',
            background:`linear-gradient(127deg,${wpp.gen.shadow},transparent,transparent),linear-gradient(336deg, ${wpp.gen.highlight}, transparent 70%)`,
            transform: `rotate(${wpp.gen.rotation}deg) translateX(${wpp.gen.adjustForOrbit(waypoints)*scale}px)`, 
            filter: `url(${process.env.PUBLIC_URL}/filter/shared.svg#roughpaper)`,
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