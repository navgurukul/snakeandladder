import React, { useState } from 'react';
import { Container, Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { questions } from './data';
import background from "../assert/animeHome.jpg";
import mic from "../assert/mic.jpg";
import mouse from "../assert/heros.jpeg";
import heros from "../assert/ironman.jpg";
import ironman from "../assert/mouse.jpg";
import fade from "../assert/fade-removebg-preview.png";
const boardSize = 10;
const questionTiles = [6, 17,26, 39,43,56, 62, 85, 74, 92];
function GameBoard() {
  const [players, setPlayers] = useState([{ pos: 0 }, { pos: 0 }, { pos: 0 }, { pos: 0 }]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceRoll, setDiceRoll] = useState(6);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [finishedPlayers, setFinishedPlayers] = useState([]);
  const rollDice = () => {
    if (isMoving || finishedPlayers.length === players.length) return;
    setIsMoving(true);
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    let newPosition = players[currentPlayer].pos + roll;
    if (newPosition > 100) {
      newPosition = 100;
    }
    movePlayerStepByStep(players[currentPlayer].pos, newPosition);
  };
  const movePlayerStepByStep = (start, end) => {
    if (start === end) {
      if (questionTiles.includes(end)) {
        setQuestionIndex(Math.floor(Math.random() * questions.length));
        setDialogOpen(true);
      } else {
        const playerIndex = currentPlayer;
        const updatedPlayers = [...players];
        updatedPlayers[playerIndex].pos = end;
        setPlayers(updatedPlayers);
        moveToNextPlayer();
        setIsMoving(false);
      }
      return;
    }
    const step = start < end ? 1 : -1;
    setTimeout(() => {
      setPlayers((prevPlayers) => {
        const updatedPlayers = [...prevPlayers];
        updatedPlayers[currentPlayer] = { ...updatedPlayers[currentPlayer], pos: start + step };
        return updatedPlayers;
      });
      if (start + 1 === 100) {
        const playerIndex = currentPlayer;
        handleFinish(playerIndex);
        if (finishedPlayers.length + 1 === players.length) {
        }
        setIsMoving(false);
        return;
      }
      movePlayerStepByStep(start + step, end);
    }, 300);
  };
  const handleFinish = (playerIndex) => {
    if (!finishedPlayers.some(p => p.playerIndex === playerIndex)) {
      const newFinishOrder = finishedPlayers.length;
      setFinishedPlayers([...finishedPlayers, { playerIndex, finishOrder: newFinishOrder }]);
    }
  };
  const moveToNextPlayer = () => {
    let nextPlayer = (currentPlayer + 1) % players.length;
    while (finishedPlayers.some(p => p.playerIndex === nextPlayer)) {
      nextPlayer = (nextPlayer + 1) % players.length;
    }
    setCurrentPlayer(nextPlayer);
  };
  const handleAnswer = () => {
    const question = questions[questionIndex];
    let movement;
    if (selectedOption === question.correctAnswer) {
      movement = question.points.correct;
    } else if (selectedOption === question.goodAnswer) {
      movement = question.points.good;
    } else if (selectedOption === question.interestingAnswer) {
      movement = question.points.interesting;
    } else {
      movement = question.points.wrong;
    }
    let newPosition = players[currentPlayer].pos + movement;
    if (newPosition < 1) newPosition = 1;
    setDialogOpen(false);
    setSelectedOption('');
    setIsMoving(true);
    movePlayerStepByStep(players[currentPlayer].pos, newPosition);
  };
  const getFinishOrderMessage = (order) => {
    if (order === 0) {
      return "is the first winner!:partying_face::partying_face:";
    } else if (order === 1) {
      return "is the second winner!:partying_face::partying_face:";
    } else if (order === 2) {
      return "is the third winner!:partying_face::partying_face:";
    } else if (order === 3) {
      return "You lost the game:innocent:";
    } else {
      return "";
    }
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
              backgroundImage: questionTiles.includes(cellNumber) && `url(${fade})`,
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
                    width: 50,
                    height: 50,
                    backgroundImage: `url(${[
                      mic,
                      heros,
                      ironman,
                      mouse
                    ][playerIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: `${1 * imgIndex}px`,
                    left: `${30 * imgIndex}px`,
                    zIndex: playersOnCell.length - imgIndex,
                    borderRadius: '50%',
                  }}
                />
              )) :
              playersOnCell.length === 1 && (
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    backgroundImage: `url(${[
                      mic,
                      heros,
                      ironman,
                      mouse
                    ][playersOnCell[0]]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
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
    <Container maxWidth="md" style={{marginTop:'20px'}} >
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
                  boxShadow: currentPlayer === index ? '0 0 10px yellow' : 'none',
                  transform: currentPlayer === index ? 'scale(1.2)' : 'none',
                  borderRadius: '50%',
                }}
              />
              <Typography variant='body1'>{player.name}</Typography>
            </Typography>
          ))}
        </Box>
      </Box>
      <Box
        style={{
          position: 'absolute',
          right: '100px',
          top: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}
      >
        {finishedPlayers.map((p, index) => (
          <Typography key={index} variant="body1" style={{ color: "#757575", fontSize: "20px" }}>
            Player {p.playerIndex + 1} {getFinishOrderMessage(p.finishOrder)}
          </Typography>
        ))}
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Question</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{questions[questionIndex]?.question}</Typography>
          <RadioGroup
            aria-label="question"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {questions[questionIndex]?.options.map((option) => (
              <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAnswer}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
export default GameBoard;
