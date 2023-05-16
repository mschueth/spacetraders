import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Chip,
  Grid,
  Typography,
  Tooltip,
  Avatar ,
}  from '@mui/material';

import { 
  badgeColor, 
  nameAbr, 
} from "../util/format"


import { Faction } from "../types/generated/faction"


export default function FactionCard(props:{faction:Faction}) {

    const faction = props.faction;

    return (
        <Card elevation={6} key={`faction-card-${faction.symbol}`}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: badgeColor(faction.symbol), border: "2px solid",}} aria-label="faction" variant="rounded">
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
        <CardContent>
          <Grid container key={`faction-card-${faction.symbol}-grid`}>
            {faction.traits.map(trait=>{return (
              <Grid item xs={true} style={{verticalAlign:"middle", textAlign:"center"}} key={`faction-card-${faction.symbol}-${trait.name}-grid`} >
                <Tooltip title={trait.description} >
                    <Chip 
                      key={`faction-card-${faction.symbol}-${trait.name}-chip`} 
                      label={trait.name} 
                      avatar={<Avatar alt="Natacha" sx={{ bgcolor: badgeColor(trait.name)}}>{nameAbr(trait.name)}</Avatar>}
                      variant="outlined" 
                      />
                </Tooltip>
              </Grid>
            )})}
          </Grid>
        </CardContent>
      </Card>
    );
  }