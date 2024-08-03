import React, { useState } from 'react';
import { Container, Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import background from "../assert/animeHome.jpg";
import mic from "../assert/mic.jpg";
import mouse from "../assert/heros.jpeg";
import heros from "../assert/ironman.jpg";
import ironman from "../assert/mouse.jpg";
import fade from "../assert/fade-removebg-preview.png"
const boardSize = 10; // 10 rows and 10 columns
const questionTiles = [6, 18, 32, 62, 83, 77, 92, 99]; // Question tiles

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    interestingAnswer: "Berlin",
    goodAnswer: "Madrid",
    points: { correct: 8, good: 6, interesting: 4, wrong: -4 }
  },
  {
    question: "You have the chance to cheat on a test without getting caught. What should you do?",
    options: ["Don't cheat and rely on your own knowledge.", "Encourage others not to cheat as well.",
      "Avoid cheating, but don't mention it to others.", "Cheat because grades are important."],
    correctAnswer: "Don't cheat and rely on your own knowledge",
    interestingAnswer: "Encourage others not to cheat as well",
    goodAnswer: "Avoid cheating, but don't mention it to others",
    points: { correct: 8, good: 6, interesting: 4, wrong: -4 }
  },
  {
    question: "You notice a colleague taking office supplies for personal use. What should you do??",
    options: ["Report the behavior to your supervisor or HR.", "Confront the colleague privately and suggest they return the supplies.",
      "Remind the colleague that using office supplies for personal use is against company policy.", "Ignore the behavior; it's not your business."],
    correctAnswer: "Report the behavior to your supervisor or HR.",
    interestingAnswer: "Confront the colleague privately and suggest they return the supplies.",
    goodAnswer: "Remind the colleague that using office supplies for personal use is against company policy.",
    points: { correct: 8, interesting: 4, good: 6, wrong: -4 }
  },
  // Add more questions with varying points for correct, good, interesting, and wrong answers
];

function GameBoard() {
  const [players, setPlayers] = useState([{ pos: 0 }, { pos: 0 }, { pos: 0 }, { pos: 0 }]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceRoll, setDiceRoll] = useState(6);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false); // Added to prevent double actions

  const rollDice = () => {
    if (isMoving) return; // Prevent multiple rolls at the same time
    setIsMoving(true);

    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    let newPosition = players[currentPlayer].pos + roll;

    // Handle board boundaries
    if (newPosition > 100) {
      newPosition = 100;
    }

    movePlayerStepByStep(players[currentPlayer].pos, newPosition);
  };

  const movePlayerStepByStep = (start, end) => {
    if (start === end) {
      // Check if the player landed on a question tile
      if (questionTiles.includes(end)) {
        setQuestionIndex(Math.floor(Math.random() * questions.length));
        setDialogOpen(true);
      } else {
        setIsMoving(false);
        setCurrentPlayer((currentPlayer + 1) % 4);
      }
      return;
    }

    setTimeout(() => {
      setPlayers(players.map((p, i) => (i === currentPlayer ? { ...p, pos: start + 1 } : p)));
      movePlayerStepByStep(start + 1, end);
    }, 300);
  };

  const handleAnswer = () => {
    const question = questions[questionIndex];
    let movement;

    // Determine points based on the selected option
    if (selectedOption === question.correctAnswer) {
      movement = question.points.correct;
    } else if (selectedOption === question.goodAnswer) {
      movement = question.points.good;
    } else if (selectedOption === question.interestingAnswer) {
      movement = question.points.interesting;
    } else {
      movement = question.points.wrong;
    }

    // Calculate new position
    let newPosition = players[currentPlayer].pos + movement;

    // Ensure the new position doesn't go below 1
    if (newPosition < 1) newPosition = 1;

    setDialogOpen(false);
    setSelectedOption('');
    setIsMoving(true);
    movePlayerStepByStep(players[currentPlayer].pos, newPosition);
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
              backgroundImage: questionTiles.includes(cellNumber) && `url(${fade})` ,
              backgroundColor: questionTiles.includes(cellNumber) ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
              backgroundSize: 'cover',
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
              )) :
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
                    backgroundRepeat: "no-repeat",
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
        position: 'relative',
        backgroundImage: `url(${background}), url(${background}), url(${background}), url(${background})`,
        backgroundSize: '50% 50%, 50% 50%, 50% 50%, 50% 50%',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
        backgroundPosition: 'top left, top right, bottom left, bottom right'
      }}>
        {renderBoard()}
      </Box>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        {diceRoll && (
          <>
            <Button color="primary" onClick={rollDice}>
              <img src={require(`../assert/dice-${diceRoll}.svg`)} alt={`Dice showing ${diceRoll}`} height="50px" width="50px" />
            </Button>
          </>
        )}
        <Box style={{ display: "flex" }}>
          {[
            { img: mic, name: "Player 1" },
            { img: heros, name: "Player 2" },
            { img: ironman, name: "Player 3" },
            { img: mouse, name: "Player 4" }
          ]?.map((player, index) => (
            <Typography key={index} component="div" style={{ padding: "20px" }}>
              <img
                src={player.img}
                alt="game"
                style={{
                  width: "50px",
                  height: "50px",
                  border: currentPlayer === index ? '2px solid yellow' : 'none',
                  boxShadow: currentPlayer === index ? '0 0 10px yellow' : 'none', // Add shadow effect
                  transform: currentPlayer === index ? 'scale(1.2)' : 'none', // Increase size
                  borderRadius: '50%',
                }}
              />
              <Typography variant='body1'>{player.name}</Typography>
            </Typography>
          ))}
        </Box>
      </Box>

      <Dialog open={dialogOpen}>
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
