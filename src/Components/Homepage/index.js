// components/Homepage.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';


function Homepage() {
  return (
    <Container>

      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3">Welcome to the Snake & Ladder Game</Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          Experience a thrilling game of luck and strategy!
        </Typography>
        <Button variant="contained" color="primary" href="/login">Login/Signup</Button>
      </Box>

    </Container>
  );
}

export default Homepage;
