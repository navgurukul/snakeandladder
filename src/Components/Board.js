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
  width: '700px',
  margin: 'auto',
  border: '2px solid #000',
});

const Row = styled(Box)({
  display: 'flex',
});

const Square = styled(Box)(({ theme, isPlayer1, isPlayer2, isPlayer3, isPlayer4 }) => ({
  width: '20%',
  padding:"20px",
  textAlign: 'center',
  border: '3px solid #ddd',
  boxSizing: 'border-box',
  position: 'relative',
  backgroundColor: isPlayer1 ? '#f0a' : isPlayer2 ? '#0f0' : isPlayer3 ? '#00f' : isPlayer4 ? '#ff0' : '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const DiceImage = styled('img')({
  width: '50px',
  height: '50px',
  margin: '10px',
});

const Board = () => {
  const [players, setPlayers] = useState([1, 1, 1, 1]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    movePlayer(roll);
  };

  const movePlayer = (roll) => {
    let newPosition = players[currentPlayer] + roll;
    if (newPosition > totalSquares) {
      newPosition = totalSquares;
    }

    if (snakesAndLadders[newPosition]) {
      newPosition = snakesAndLadders[newPosition];
    }

    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      newPlayers[currentPlayer] = newPosition;
      return newPlayers;
    });

    setCurrentPlayer((currentPlayer + 1) % 4);
  };

  const renderBoard = () => {
    const board = [];
    let toggle = true;

    for (let i = totalSquares; i > 0; i -= boardSize) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        let squareNumber = toggle ? i - j : i - (boardSize - 1) + j;
        row.push(
          <Square
            key={squareNumber}
            isPlayer1={players[0] === squareNumber}
            isPlayer2={players[1] === squareNumber}
            isPlayer3={players[2] === squareNumber}
            isPlayer4={players[3] === squareNumber}
            
          >
            {squareNumber}
          </Square>
        );
      }
      toggle = !toggle;
      board.push(<Row key={i}>{row}</Row>);
    }

    return board;
  };

  return (
    <Container maxWidth="lg">
      <Box textAlign="center" p={3}>
        <Paper elevation={3}>
        <Typography variant="h4" gutterBottom>Snake and Ladder</Typography>
        <BoardContainer>{renderBoard()}</BoardContainer>
        <Button variant="contained" color="primary" onClick={rollDice}>
          Roll Dice
        </Button>
        {diceRoll && (
          <>
            <Typography>You rolled a {diceRoll}</Typography>
            <DiceImage src={`/dice${diceRoll}.png`} alt={`Dice showing ${diceRoll}`} />
          </>
        )}
        <Typography>Current Player: {currentPlayer + 1}</Typography>
        {players.map((position, index) => (
          <Typography key={index}>Player {index + 1} position: {position}</Typography>
        ))}
        </Paper>
      </Box>
      </Container>
  );
};

export default Board;
