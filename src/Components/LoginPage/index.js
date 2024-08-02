// components/LoginPage.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';


function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication logic here
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            sx={{ my: 2, width: '100%' }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            sx={{ my: 2, width: '100%' }}
          />
          <Button type="submit" variant="contained" color="primary" href='/instructor'>Login</Button>
        </form>
      </Box>

    </Container>
  );
}

export default LoginPage;
