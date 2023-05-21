import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Chip,
  Grid,
  colors,
  Typography,
  Tooltip,
  Avatar ,
}  from '@mui/material';

import { 
  badgeColor, 
  nameAbr, 
} from "../util/formatUtil"


import { Faction } from "../types/generated/faction"
import { Contract, ContractTypeEnum } from "../types/generated/contract"

function contractTypeName(type:ContractTypeEnum): string{
  const text:{[key:string]:string}= {
    'PROCUREMENT':'Procurement',
    'TRANSPORT':'Transport',
    'SHUTTLE':'Shuttle',
  }
  return text[type] || 'Unknown'
}

function AcceptChip(props:{accepted:boolean}){
  const text = props.accepted?'Accepted':'Requested'
  const color = props.accepted?colors.green['A400']:colors.red['A400']

  return (  
    <Chip
      key={`AcceptChip`}
      label={text} 
      variant="filled" 
      size="medium"
      sx={{
          fontSize:"large",
          fontWeight:"heavy",
          color:{color},
      }}
      />
  )
}

export default function ContractCard(props:{contract:Contract, factions:Faction[]}) {
    const contract = props.contract;
    const faction = props.factions.find(f=>f.symbol === contract.factionSymbol)
    return (
        <Card elevation={6} key={`contract-card-${contract.id}`}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: badgeColor(contract.factionSymbol), border: "2px solid",}} aria-label="faction" variant="rounded">
              {nameAbr(faction?.name||'')}
            </Avatar>
          }
          title={`${faction?.name}: ${contractTypeName(contract.type)}`}
          subheader={`${contract.terms.payment.onAccepted}₡ / ${contract.terms.payment.onFulfilled}₡`}
        />
        <AcceptChip accepted={contract.accepted}/>
        {ContractTypeEnum.Procurement === contract.type?(
          <CardContent>
            <Grid container key={`contract-card-${contract.id}-${contract.type}-grid`}>

            </Grid>
          </CardContent>
        ):(<div/>)}
        {ContractTypeEnum.Shuttle === contract.type?(
          <CardContent>
          <Typography variant="body2" color="text.secondary">
            Not Yet Supported. Please send a sample payload so this can be added to the application.
          </Typography>
          </CardContent>
        ):(<div/>)}
        {ContractTypeEnum.Transport === contract.type?(
          <CardContent>
          <Typography variant="body2" color="text.secondary">
            Not Yet Supported. Please send a sample payload so this can be added to the application.
          </Typography>
          </CardContent>
        ):(<div/>)}
      </Card>
    );
  }