import React, { useState } from 'react';
import { Container, Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import image from  "../assert/BigGreen.jpeg";
import background from "../assert/animeHome.jpg";
import anime from "../assert/CityPark.jpeg"
import mic from "../assert/mic.jpg"
import mouse from "../assert/heros.jpeg"
import heros from "../assert/ironman.jpg"
import ironman from "../assert/mouse.jpg"
const boardSize = 10; // 10 rows and 10 columns
const questionTiles = [6, 18, 32, 62, 83, 77, 92, 99]; // Question tiles

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    points: { correct: 8, good: 6, interesting: 4, wrong: -4 }
  },
  {
    question: "You have the chance to cheat on a test without getting caught. What should you do?",
    options: ["Don't cheat and rely on your own knowledge.", "Encourage others not to cheat as well.", 
      "Avoid cheating, but don't mention it to others.", "Cheat because grades are important."],
    correctAnswer: "Don't cheat and rely on your own knowledge",
    points: { correct: 8, good: 6, interesting: 4, wrong: -4 }
  },
  {
    question: "You notice a colleague taking office supplies for personal use. What should you do??",
    options: ["Report the behavior to your supervisor or HR.", "Confront the colleague privately and suggest they return the supplies.", 
      "Remind the colleague that using office supplies for personal use is against company policy.", "Ignore the behavior; it's not your business."],
    correctAnswer: "Report the behavior to your supervisor or HR.",
    points: { correct: 8,  interesting: 4,good: 6, wrong: -4 }
  },
  // Add more questions with varying points for correct, good, interesting, and wrong answers
];

function GameBoard() {
  const [players, setPlayers] = useState([{ pos: 1 }, { pos: 1 }, { pos: 1 }, { pos: 1 }]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceRoll, setDiceRoll] = useState(6);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    let newPosition = players[currentPlayer].pos + roll;

    // Handle board boundaries
    if (newPosition > 100) {
      newPosition = 100;
    }

    // Check if the new position is a question tile
    if (questionTiles.includes(newPosition)) {
      setQuestionIndex(Math.floor(Math.random() * questions.length));
      setDialogOpen(true);
    } else {
      updatePlayerPosition(newPosition);
    }
  };

  const updatePlayerPosition = (newPosition) => {
    setPlayers(players.map((p, i) => (i === currentPlayer ? { ...p, pos: newPosition } : p)));
    setCurrentPlayer((currentPlayer + 1) % 4);
  };

  const handleAnswer = () => {
    const question = questions[questionIndex];
    let movement;

    // Determine points based on the selected option
    if (selectedOption === question.correctAnswer) {
      movement = question.points.correct;
    } else if (selectedOption === "good") {
      movement = question.points.good;
    } else if (selectedOption === "interesting") {
      movement = question.points.interesting;
    } else {
      movement = question.points.wrong;
    }

    // Special handling for tile 99
    if (players[currentPlayer].pos === 99) {
      if (selectedOption === question.correctAnswer) {
        updatePlayerPosition(100); // Go directly to the 100th tile
      } else {
        updatePlayerPosition(7); // Go directly to the 7th tile
      }
    } else {
      let newPosition = players[currentPlayer].pos + movement;
      if (newPosition < 1) newPosition = 1; // Ensure the position doesn't go below 1
      updatePlayerPosition(newPosition);
    }

    setDialogOpen(false);
    setSelectedOption('');
  };

  const renderBoard = () => {
    let board = [];
    for (let row = boardSize - 1; row >= 0; row--) {
      let cells = [];
      for (let col = 0; col < boardSize; col++) {
        const cellNumber =
          row % 2 === 0
            ? row * boardSize + col + 1
            : (row + 1) * boardSize - col;
        
        // Find all players on this cell
        const playersOnCell = players
          .map((p, index) => p.pos === cellNumber ? index : null)
          .filter(index => index !== null);
  
        cells.push(
          <Box
            key={cellNumber}
            sx={{
              width: 90,
              height: 70,
              border: '2px solid grey',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              position: 'relative',
            }}
          >
            {playersOnCell.length > 1 ?
             playersOnCell.map((playerIndex, imgIndex) => (
              <Box
                key={playerIndex}
                sx={{
                  width: 50, // Adjust the image size here
                  height: 50, // Adjust the image size here
                  backgroundImage: `url(${[
                    mic,
                    heros,
                    ironman,
                    mouse
                  ][playerIndex]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'absolute',
                  top: `${1 * imgIndex}px`, // Adjust vertical offset for stacking
                  left: `${30 * imgIndex}px`, // Adjust horizontal offset for stacking
                  
                  zIndex: playersOnCell.length - imgIndex, // Ensure proper stacking
                  borderRadius: '50%',
                }}
              />
            )):
            playersOnCell.length === 1 && (
              <Box
                sx={{
                  width: 70, // Adjust the image size here
                  height: 70, // Adjust the image size here
                  borderRadius: '50%',
                  backgroundImage: `url(${[
                    mic,
                    heros,
                    ironman,
                    mouse
                  ][playersOnCell[0]]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  // position: 'absolute',
                  backgroundRepeat:"no-repeat",
                  color: playersOnCell.length !== -1 ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                }}
              />
            )
            }
            {playersOnCell.length === 0 && cellNumber}
          </Box>
        );
      }
      board.push(
        <Box key={row} display="flex">
          {cells}
        </Box>
      );
    }
    return board;
  };
  
  

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Snake & Ladder Game
      </Typography>
      <Typography variant="h6" align="center">
        Current Player: Player {currentPlayer + 1} | Dice Roll: {diceRoll}
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // flexWrap: 'wrap',
        // width: '100vh',
        // margin: 'auto',
        // padding: '20px',
        position: 'relative',
        backgroundImage: `url(${background}), url(${background}), url(${background}), url(${background})`,
        backgroundSize: '50% 50%, 50% 50%, 50% 50%, 50% 50%',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
        backgroundPosition: 'top left, top right, bottom left, bottom right'
      }}>
        {renderBoard()}
      </Box>
      
        {diceRoll && (
          <>
          <Button  color="primary" onClick={rollDice}>
          <img src={require(`../assert/dice-${diceRoll}.svg`)} alt={`Dice showing ${diceRoll}`} height="50px" width="50px" />
        </Button>
            
          </>
        )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Fate Junction Question</DialogTitle>
        <DialogContent>
          <Typography>{questions[questionIndex]?.question}</Typography>
          <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            {questions[questionIndex]?.options.map((option, index) => (
              <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAnswer} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default GameBoard;

