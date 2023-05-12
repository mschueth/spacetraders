import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
}  from '@mui/material';


export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1">
          Login Page
        </Typography>
      </Box>
    </Container>
  );
}