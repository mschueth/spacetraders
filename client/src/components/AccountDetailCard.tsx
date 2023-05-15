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


import { AccountDetails } from "../types/game";

import { 
  badgeColor, 
  nameAbr, 
  numberWithCommas,
} from "../util/format"



export default function AccountDetailCard(props:{Account:AccountDetails}) {

    const accountDetails = props.Account;

    return (
        <Card elevation={6} id={`faction-card-${accountDetails.agent.symbol}`}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: badgeColor(accountDetails.agent.symbol) }} aria-label="faction">
              {nameAbr(accountDetails.agent.symbol)}
            </Avatar>
          }
          title={accountDetails.agent.symbol}
          subheader={`last known credits: ${numberWithCommas(accountDetails.agent.credits)}₡`}
        />
        <CardHeader
          title={accountDetails.faction.name}
          subheader={accountDetails.faction.headquarters}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {accountDetails.faction.description}
          </Typography>
        </CardContent>
        <CardContent style={{justifyContent: 'space-evenly'}}>
            {accountDetails.faction.traits.map(trait=>{return (
                <Tooltip title={trait.description}>
                    <Chip label={trait.name} color="primary" variant="outlined" />
                </Tooltip>
            )})}
        </CardContent>
      </Card>
    );
  }