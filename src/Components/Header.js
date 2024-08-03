// components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="fixed"
    style={{
      backgroundColor: "white",
      color: "black",
    }}>
      <Toolbar>
        <Typography variant="h6">
          Snake & Ladder Game
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
