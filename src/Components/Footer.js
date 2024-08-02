// components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ mt: 5, py: 3, backgroundColor: '#f0f0f0', textAlign: 'center' }}>
      <Typography variant="body2">
        © 2024 Snake & Ladder Game. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
