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
  RocketLaunchTwoTone,

  BlurOnTwoTone,
  PodcastsTwoTone,

  DangerousTwoTone,
  ReportProblemTwoTone,

  DeleteForeverTwoTone,
  DoneOutlineTwoTone,
  
  SettingsInputComponentTwoTone,
  DisplaySettingsTwoTone,

  FingerprintTwoTone,
  KeyTwoTone,

  NotificationImportantTwoTone,
  NotificationsNoneTwoTone,

} from '@mui/icons-material';

import { 
  AccountDetails,
} from "../types/gameType";
import AccountDetailCard from "../components/AccountDetailCard";

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
export default function HomePage(props:{gameData:GameData}) {
  
  const [account, setAccount] = React.useState<AccountDetails>({
    agent: JSON.parse(localStorage.getItem('agent')||'{}'),
    token: localStorage.getItem('token') || '',
    faction: JSON.parse(localStorage.getItem('faction')||'{}'),
  });
  

  return (
    <Container component="main" maxWidth="sm">
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
          <AccountDetailCard Account={account} />
        </Box>
      </Paper>
    </Container>

  );
}