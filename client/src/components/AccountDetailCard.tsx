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


import { AccountDetails } from "../types/gameType";

import { 
  badgeColor, 
  nameAbr, 
  numberWithCommas,
} from "../util/formatUtil"



export default function AccountDetailCard(props:{Account:AccountDetails}) {

    const accountDetails = props.Account;

    return (
        <Card elevation={6} key={`faction-card-${accountDetails?.agent?.symbol}`}>
        <Grid container sx={{width:'100%'}} key={`faction-card-${accountDetails?.agent?.symbol}-grid-head`}>
          <Grid item xs={true} style={{verticalAlign:"top"}} key={`faction-card-${accountDetails?.agent?.symbol}-${accountDetails?.faction?.symbol}-grid`}>
          <CardHeader 
            avatar={
              <Avatar sx={{ bgcolor: badgeColor(accountDetails?.faction?.symbol), border: "2px solid",}} aria-label="faction" variant="rounded">
                {nameAbr(accountDetails?.faction?.name)}
              </Avatar>
            }
            title={accountDetails?.faction?.name}
            subheader={accountDetails?.faction?.headquarters}
          />
          </Grid>
          <Grid item xs={true} style={{verticalAlign:"top"}} key={`faction-card-${accountDetails?.agent?.symbol}-grid`}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: badgeColor(accountDetails?.agent?.symbol), border: "2px solid", }} aria-label="faction" variant="rounded">
                  {nameAbr(accountDetails?.agent?.symbol)}
                </Avatar>
              }
              title={accountDetails?.agent?.symbol}
              subheader={`${numberWithCommas(accountDetails?.agent?.credits)}₡`}
            />
          </Grid>
        </Grid>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {accountDetails?.faction?.description}
          </Typography>
        </CardContent>
        <CardContent sx={{width:'100%'}}>
          <Grid container sx={{width:'100%'}} key={`faction-card-${accountDetails?.agent?.symbol}-grid-trait`}>
            {(accountDetails?.faction?.traits || []).map(trait=>{return (
              <Grid item xs={true} style={{verticalAlign:"middle", textAlign:"center"}} key={`faction-card-${accountDetails?.agent?.symbol}-${trait.name}-grid`}>
                <Tooltip title={trait.description}>
                    <Chip 
                       key={`faction-card-${accountDetails?.agent?.symbol}-${trait.name}-chip`}
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