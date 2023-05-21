import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Chip,
  ChipPropsColorOverrides,
  Grid,
  colors,
  Typography,
  TextField,
  Tooltip,
  Avatar ,
}  from '@mui/material';
import {
  OverridableStringUnion
} from "@mui/types"

import { 
  badgeColor, 
  nameAbr, 
  numberWithCommas,
  formatDateTime,
} from "../util/formatUtil"


import { Faction } from "../types/generated/faction"
import { Contract, ContractTypeEnum } from "../types/generated/contract"
import { ContractDeliverGood } from "../types/generated/contract-deliver-good"

function contractTypeName(type:ContractTypeEnum): string{
  const text:{[key:string]:string}= {
    'PROCUREMENT':'Procurement',
    'TRANSPORT':'Transport',
    'SHUTTLE':'Shuttle',
  }
  return text[type] || 'Unknown'
}

function StatusChip(props:{contract:Contract}){
  const c = props.contract;
  let color:OverridableStringUnion<
    'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    ChipPropsColorOverrides
  > = "default"
  let text = ''
  if(c.fulfilled){
    text = 'Fulfilled'
    color = 'success'
  } else if (c.accepted){
    text = 'Accepted'
    color = 'info'
  } else {
    text = 'Requested'
    color = 'warning'
  }

  return (  
    <Chip
      key={`AcceptChip`}
      label={text} 
      variant="filled" 
      size="small"
      color={color}
      />
  )
}

function DisplayField(props:{label:string,value:string}){
  return(
    <TextField
      label={props.label}
      sx={{textAlign:"right"}}
      disabled
      value={props.value}
      size="small"
    />
  )
}

function ProcurementTermsDeliver(props:{deliver:ContractDeliverGood}){
  const deliver = props.deliver;
  return(
    <Grid container>
      <Grid item xs={true} style={{verticalAlign:"middle", textAlign:"center"}}>
        <DisplayField 
          label="Trade Good"
          value={deliver.tradeSymbol}
          /> 
      </Grid>
      <Grid item xs={true} style={{verticalAlign:"middle", textAlign:"center"}}>
        <DisplayField 
          label="Amount"
          value={`${numberWithCommas(deliver.unitsFulfilled)} / ${numberWithCommas(deliver.unitsRequired)}`}
          /> 
      </Grid>
      <Grid item xs={true} style={{verticalAlign:"middle", textAlign:"center"}}>
        <DisplayField 
          label="Destination"
          value={deliver.destinationSymbol}
          /> 
      </Grid>
    </Grid>
  )
}

export default function ContractCard(props:{contract:Contract, factions:Faction[]}) {
    const contract = props.contract;
    const faction = props.factions.find(f=>f.symbol === contract.factionSymbol)
    return (
        <Card elevation={6} key={`contract-card-${contract.id}`}>
        <Grid container key={`contract-card-${contract.id}-grid-head`}>
          <Grid item xs={true} style={{verticalAlign:"top"}} key={`contract-card-${contract.id}-status-grid`}>
            <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: badgeColor(contractTypeName(contract.type)), border: "2px solid",}} aria-label="contract-type" variant="rounded">
                {nameAbr(contractTypeName(contract.type)||'')}
              </Avatar>
            }
              title={contractTypeName(contract.type)}
              subheader={<StatusChip contract={contract} />}
            />
          </Grid>
          <Grid item xs={true} style={{verticalAlign:"top"}} key={`contract-card-${contract.id}-faction-grid`}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: badgeColor(contract.factionSymbol), border: "2px solid",}} aria-label="faction" variant="rounded">
                {nameAbr(faction?.name||'')}
              </Avatar>
            }
            title={faction?.name}
            subheader="Contract"
            />
          </Grid>
        </Grid>
        <Grid container >
          <Grid item xs={true} style={{verticalAlign:"middle", textAlign:"center"}}>
          <DisplayField 
              label="Accept / Fulfill"
              value={`${numberWithCommas(contract.terms.payment.onAccepted)} ₡ / ${numberWithCommas(contract.terms.payment.onFulfilled)} ₡`}
            />
          </Grid>
          <Grid item xs={true} >
            <DisplayField
              label="Expiration"
              value={formatDateTime(contract.expiration)}
            />
          </Grid>
        </Grid>
        <Grid container >
          {ContractTypeEnum.Procurement === contract.type?(
            <CardContent>
              <Grid container key={`contract-card-${contract.id}-${contract.type}-grid`}>
              {contract.terms.deliver?.map(deliver=>{
                return(<ProcurementTermsDeliver deliver={deliver} />)
              })}
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
        </Grid>
      </Card>
    );
  }