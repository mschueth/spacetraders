import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
}  from '@mui/material';


export default function HomePage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1">
          Home Page
        </Typography>
      </Box>
    </Container>
  );
}