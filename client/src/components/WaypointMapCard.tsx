import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
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
    background:'linear-gradient(rgba(0,0,0,.75),transparent)',
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

function splitInHalf(str:string){
  let i = str.length / 2
  return [str.substring(0,i),str.substring(i)].join(' ')
}

export default function WaypointMapCard(props:{waypoints:Waypoint[], system:System}) {

    const waypoints = props.waypoints;
    const system = props.system;
    let boundry:{
      x:{
        min:number
        max:number
        offset:number
      },
      y:{
        min:number
        max:number
        offset:number
      }
    }|undefined = undefined;

    waypoints.forEach(wp=>{
      if(!!boundry){
        if(boundry.x.min > wp.x){
          boundry.x.min = wp.x
          boundry.x.offset=(wp.x<0)?Math.abs(wp.x):0
        }
        if(boundry.x.max < wp.x){
          boundry.x.max = wp.x
        }
        if(boundry.y.min > wp.y){
          boundry.y.min = wp.y
          boundry.y.offset=(wp.y<0)?Math.abs(wp.y):0
        }
        if(boundry.y.max < wp.y){
          boundry.y.max = wp.y
        }
      }else{
        boundry={
          x:{
            min:wp.x,
            max:wp.x,
            offset:(wp.x<0)?Math.abs(wp.x):0,
          },
          y:{
            min:wp.y,
            max:wp.y,
            offset:(wp.y<0)?Math.abs(wp.y):0,
          }
        }
      }
    })

    console.log(boundry)

    return (
        <Box key={`faction-card-${system.symbol}`} sx={{ width: '100%', position:'relative'}}>
          {waypoints.map(wp=>{
            function wpName(name:string){
              return (name.split('-').slice(-1))[0];
            }
            const wpSx = {
              ...sx.circle,
              backgroundColor: badgeColor(wpName(wp.type)),
              left: `${((wp.x)+(boundry?.x.offset||0))*5}px`,
              top: `${50+((wp.y)+(boundry?.y.offset||0))*5}px`,
            }
            return (
              <Box sx={wpSx}><Box fontSize="small" sx={sx.text}>{wpName(wp.symbol)}</Box></Box>
            )
          })}
      </Box>
    );
  }