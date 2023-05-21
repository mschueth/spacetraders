import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Paper,
}  from '@mui/material';
import { GameData } from '../types/gameType';

import { 
  AccountDetails,
} from "../types/gameType";
import AccountDetailCard from "../components/AccountDetailCard";
import ContractCard from '../components/ContractCard';

const sx = {
  button: { 
    mt: 2, 
    mb: 2 
  },
  bodyText:{
  //  alignItems: "left", 
    padding: 2, 
  //  width:"100%"
  },
  boxContent:{  
    boxShadow: 3,
    borderRadius: 2,
    px: 4,
    py: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    elevation: 6,
  },
}
export default function HomePage(props:{gameData:GameData, setGameData:(gd:GameData)=>void}) {
  let agent = props.gameData.agent
  let token = props.gameData.token
  let faction = undefined;
  let contracts = props.gameData.contracts;
  let factions = props.gameData.factions;
  if(factions && factions.length > 0){
    faction = factions[0]
  }
  


  return (
    <Container component="main" maxWidth="sm" sx={{paddingTop: 2}}>
      <Paper  elevation={3}>
        <Box
          sx={sx.boxContent}
        >
          <Typography component="h1" variant="h5">
            Home Page
          </Typography>
          <Typography component="h1" variant="body2" sx={sx.bodyText}>
            You are logged into the game.
          </Typography>
          {(agent && token && faction)?(<AccountDetailCard Account={{agent,token,faction}} />):(<div/>)}
          {(factions && contracts)?(
            <Box sx={{ width: '100%', marginTop: 2 }}>
            {
              contracts.map(contract=>(<ContractCard contract={contract} factions={factions||[]} />))
            }
            </Box>
            ):(<div/>)}
        </Box>
      </Paper>
    </Container>

  );
}