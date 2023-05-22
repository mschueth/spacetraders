import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Paper,
}  from '@mui/material';

const sx = {
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
export default function NotFoundPage() {
  return (
    <Container component="main" maxWidth="sm" sx={{paddingTop: 2}}>
      <Paper  elevation={3}>
        <Box
          sx={sx.boxContent}
        >
          <Typography component="h1" variant="h5">
            Page Not Found
          </Typography>
        </Box>
      </Paper>
          <img src={process.env.PUBLIC_URL + "/img/404.png"} alt="404 page not found" style={{width:'100%'}} />
    </Container>

  );
}
