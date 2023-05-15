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
import { WidthFull } from '@mui/icons-material';


export default function FactionCard(props:{faction:Faction}) {

    const faction = props.faction;

    return (
        <Card elevation={6} id={`faction-card-${faction.symbol}`}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: badgeColor(faction.symbol) }} aria-label="faction">
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
          <Grid container>
            {faction.traits.map(trait=>{return (
              <Grid item xs="auto">
                <Tooltip title={trait.description}>
                    <Chip label={trait.name} color="primary" variant="outlined" />
                </Tooltip>
              </Grid>
            )})}
          </Grid>
        </CardContent>
      </Card>
    );
  }