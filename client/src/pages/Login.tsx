import * as React from 'react';
import {
  Box,
  Card,
  Container,
  Typography,
  Link,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
}  from '@mui/material';


import { Faction } from "../types/generated/faction"
import factions from '../data/factions.json';
import FactionCard from '../components/FactionCard';
function toFaction(f:any): Faction{return f};

export default function LoginPage() {
  const handleSubmit = (event:any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const apitoken = data.get("apitoken");
    localStorage.setItem('apitoken',apitoken?.toString() || '');
  };

  return (
    <Paper >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{  
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="apitoken"
              label="API Token"
              type="password"
              id="apitoken"
              autoComplete="apitoken"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Box>
    </Container>
    {factions.map(faction=>{
      return (
        <FactionCard faction={toFaction(faction)} />
      )
    })}
  </Paper>
  );
}