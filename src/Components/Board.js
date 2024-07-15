import React, { useState } from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const boardSize = 10;
const totalSquares = boardSize * boardSize;
const snakesAndLadders = {
  16: 6,
  47: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78,
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100
};

const BoardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '900px',

  margin: 'auto',
  border: '2px solid #000',
});

const Row = styled(Box)({
  display: 'flex',
});

const Square = styled(Box)(({ theme, isPlayer }) => ({
  width: '15%',
  paddingBottom: '10%',
  textAlign: 'center',
  border: '2px solid #ddd',
  boxSizing: 'border-box',
  position: 'relative',
  backgroundColor: isPlayer ? '#f0a' : '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Board = () => {
  const [playerPosition, setPlayerPosition] = useState(1);
  const [diceRoll, setDiceRoll] = useState(null);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    movePlayer(roll);
  };

  const movePlayer = (roll) => {
    let newPosition = playerPosition + roll;
    if (newPosition > totalSquares) {
      newPosition = totalSquares;
    }

    if (snakesAndLadders[newPosition]) {
      newPosition = snakesAndLadders[newPosition];
    }

    setPlayerPosition(newPosition);
  };

  const renderBoard = () => {
    const board = [];
    let toggle = true;

    for (let i = totalSquares; i > 0; i -= boardSize) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        // let squareNumber = toggle ? i - j : i - (boardSize - 1) + j;
        let squareNumber = i - (boardSize - 1) + j;
        row.push(
          <Square key={squareNumber} isPlayer={playerPosition === squareNumber} style={{width:"500px"}}>
            {squareNumber}
          </Square>
        );
      }
      // toggle = !toggle;
      board.push(<Row key={i}>{row}</Row>);
    }

    return board;
  };

  return (
    <Container maxWidth="lg"> 
    <Box textAlign="center" p={3} >
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '15px' }}>
      <Typography variant="h4" gutterBottom>Snake and Ladder</Typography>
      
      <BoardContainer >{renderBoard()}</BoardContainer>
      <Button variant="contained" color="primary" onClick={rollDice}>
        Roll Dice
      </Button>

      {diceRoll && <Typography>You rolled a {diceRoll}</Typography>}
      <Typography>Player position: {playerPosition}</Typography>
      </Paper>
    </Box>
    </Container>
  );
};

export default Board;
