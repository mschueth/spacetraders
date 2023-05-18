import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Button,
  TextField,
  Tab,Tabs,
  MenuItem,
  List,ListItem,
  Alert,AlertTitle,
  Paper,
  ListItemText,
}  from '@mui/material';

import { GameData } from '../types/gameType';

const sx = {
  button: { 
    mt: 2, 
    mb: 2 
  },
  bodyText:{
    alignItems: "left", 
    padding: 2, 
    width:"100%"
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
  list:{},
  listItemText:{},
  link:[],
}

export default function CreditsPage(props:{gameData:GameData}) {
  return (
    <Container component="main" maxWidth="sm" sx={{paddingTop: 2}}>
      <Paper  elevation={3}>
        <Box
          sx={sx.boxContent}
        >
          <Typography component="h1" variant="h5">
            Thanks for the backend API and game!
          </Typography>
          <Typography component="h1" variant="body2" sx={sx.bodyText}>
            <List sx={sx.list}>
              <ListItemText sx={sx.listItemText}><Link href='https://spacetraders.io/' sx={sx.link}>spacetraders.io</Link></ListItemText>
            </List>
          </Typography>
          <Typography component="h1" variant="h5">
            Thanks for the engines!
          </Typography>
          <Typography component="h1" variant="body2" sx={sx.bodyText}>
          <List sx={sx.list}>
            <ListItemText sx={sx.listItemText}><Link href='https://mui.com/' sx={sx.link}>MUI</Link></ListItemText>
            <ListItemText sx={sx.listItemText}><Link href='https://particles.js.org/' sx={sx.link}>particles.js</Link></ListItemText>
          </List>
          </Typography>
          <Typography component="h1" variant="h5">
            Thanks for the free images!
          </Typography>
          <Typography component="h1" variant="body2" sx={sx.bodyText}>
          <List sx={sx.list}>
            <ListItemText sx={sx.listItemText}><Link href='https://icons8.com/' sx={sx.link}>icons8.com</Link></ListItemText>
            <ListItemText sx={sx.listItemText}><Link href='https://freesvg.org/' sx={sx.link}>freesvg.org</Link></ListItemText>
          </List>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}