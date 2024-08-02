// components/ChooseTokenPage.js
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid, Card } from '@mui/material';

const tokens = [
  { id: 1, name: 'Token 1', image: require('../assert/mic.jpg') },
  { id: 2, name: 'Token 2', image: require('../assert/heros.jpeg') },
  { id: 3, name: 'Token 3', image: require('../assert/ironman.jpg') },
  { id: 4, name: 'Token 4', image: require('../assert/mouse.jpg') }
];

function ChooseTokenPage() {
  const [selectedTokens, setSelectedTokens] = useState(Array(4).fill(null));

  const handleTokenSelect = (index, token) => {
    const updatedTokens = [...selectedTokens];
    updatedTokens[index] = token;
    setSelectedTokens(updatedTokens);
  };

  const handleStartGame = () => {
    localStorage.setItem('selectedTokens', JSON.stringify(selectedTokens));
    window.location.href = '/game';
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4">Choose Your Token</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Select a token to represent you in the game.
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {tokens.map((token, index) => (
          <Grid item xs={6} sm={3} key={token.id}>
            <Card
              onClick={() => handleTokenSelect(index, token)}
              sx={{
                cursor: 'pointer',
                border: selectedTokens.includes(token) ? '2px solid blue' : 'none',
                padding: 2,
              }}
            >
              <img 
                src={token.image.default} 
                alt={token.name} 
                style={{ width: '100%', height: 'auto' }} 
              />
              <Box sx={{ textAlign: 'center', p: 1 }}>
                <Typography variant="body1">{token.name}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartGame}
          disabled={selectedTokens.includes(null)}
        >
          Start Game
        </Button>
      </Box>
    </Container>
  );
}

export default ChooseTokenPage;

