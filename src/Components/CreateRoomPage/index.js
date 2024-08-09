import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

function CreateRoomPage() {
  const [mode, setMode] = useState(null);
  const [roomData, setRoomData] = useState({
    name: '',
    roomName: '',
  });

  const [roomCode, setRoomCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCreateRoom = () => {
    const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(generatedCode);
  };
  console.log(roomCode && 'Room Code: ' + roomCode);

  const handleJoinRoom = () => {
    console.log(`Joining room: ${roomData.roomName} with code: ${roomCode}`);
  };

  const handleChange = (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container style={{ marginTop: "120px" }}>
      <Box sx={{ p: 3 }}>
        {mode === null && (
          <>
          <h1>Create Room</h1>
          <p>For creating a room for game</p>
            <Button variant="contained" onClick={() => setMode('create')}>
              Create Room
            </Button>
            <Button 
            variant="contained" 
            color="secondary"
            onClick={() => setMode('join')}
            sx={{ ml: 2 }}

            >
              Join Room
            </Button>
          </>
        )}
        {mode === 'create' && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={roomData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Room Name"
              name="roomName"
              value={roomData.roomName}
              onChange={handleChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button variant="contained" onClick={handleCreateRoom} sx={{ mt: 2 }}>
              Generate Code
            </Button>
            {roomCode && 
            <>
            <Typography variant="h6" sx={{ mt: 2 }}>
                  Room Code: {roomCode}
                </Typography>
                <CopyToClipboard text={roomCode} onCopy={() => setCopied(true)}>
                  <Button variant="outlined" sx={{ mt: 1 }}>
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </Button>
                </CopyToClipboard>
                <Button 
                variant="contained" 
                href='/choose-token' 
                onClick={handleJoinRoom}
                sx={{ mt: 2 }}>
                  
                  Join Room
                </Button>
                </>
             }

           
          </Box>
        )}
        {mode === 'join' && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Room Name"
              name="roomName"
              value={roomData.roomName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
             
            />
            <Button variant="contained"
             onClick={handleJoinRoom}
              sx={{ mt: 2 }}
              href='/choose-token'
              >
              Join Room
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default CreateRoomPage;
