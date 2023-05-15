import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Chip,
  colors, 
  Typography,
  Tooltip,
  Avatar ,
}  from '@mui/material';


import { Faction } from "../types/generated/faction"


export default function FactionCard(props:{faction:Faction}) {

    const faction = props.faction;

    const nameAbr = (name:string) => {
        return name.split(/[\s,\-,\_]+/).map(n=>n.slice(0,1)).join('')
    }

    return (
        <Card elevation={6} id={`faction-card-${faction.symbol}`}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: colors.red[500] }} aria-label="faction">
              {nameAbr(faction.name)}
            </Avatar>
          }
          title={faction.name}
          subheader={faction.headquarters}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {faction.description}
          </Typography>
        </CardContent>
        <CardContent style={{justifyContent: 'space-evenly'}}>
            {faction.traits.map(trait=>{return (
                <Tooltip title={trait.description}>
                    <Chip label={trait.name} color="primary" variant="outlined" />
                </Tooltip>
            )})}
        </CardContent>
      </Card>
    );
  }