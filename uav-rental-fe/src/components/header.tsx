import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          UAV Rentals Market
        </Typography>
        <Button component={Link} to="/main" color="inherit">
          Main
        </Button>
        <Button component={Link} to="/my-uavs" color="inherit">
          My UAVs
        </Button>
        <Button component={Link} to="/my-rentals" color="inherit">
          My Rentals
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
