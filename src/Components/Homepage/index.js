// components/Homepage.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import homeImage from "../assert/s&nhome.png";


function Homepage() {
  return (
    <Container maxWidth="lg" 
    sx={{backgroundImage:`url(${homeImage})`,
     height:"90vh",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px',
      marginTop:"60px"

     }}>

      <Box sx={{ textAlign: 'center',
         my: 4,  }}>
        <Typography variant="h3">Welcome to the Snake & Ladder Game</Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          Experience a thrilling game of luck and strategy!
        </Typography>
        <Button  color="primary" href="/login" style={{marginTop:"20rem"}}>
          <img src={require("../assert/button-removebg-preview.png")} alt="login" style={{backgroundColor:"transparent"}} />
        </Button>
      </Box>

    </Container>
  );
}

export default Homepage;
