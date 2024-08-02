// components/CreateRoomPage.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';


function CreateRoomPage() {
  const [roomDetails, setRoomDetails] = useState({ groupName: '', roomID: '' });

  const handleChange = (e) => {
    setRoomDetails({ ...roomDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Room creation logic here
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4">Create Room</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Group Name"
            name="groupName"
            value={roomDetails.groupName}
            onChange={handleChange}
            sx={{ my: 2, width: '100%' }}
          />
          <TextField
            label="Room ID"
            name="roomID"
            value={roomDetails.roomID}
            onChange={handleChange}
            sx={{ my: 2, width: '100%' }}
          />
          <Button type="submit" variant="contained" color="primary" href='/choose-token'>Create Room</Button>
        </form>
      </Box>

    </Container>
  );
}

export default CreateRoomPage;
