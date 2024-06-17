import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const AdminHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
          Admin Panel
        </Typography>
        <div style={{ flexGrow: 1 }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu} sx={{ ml: 2 }}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/admin" onClick={handleClose}>Dashboard</MenuItem>
            <MenuItem component={Link} to="" onClick={handleClose}>Manage Courses</MenuItem>
            <MenuItem component={Link} to="" onClick={handleClose}>Manage Students</MenuItem>
            <MenuItem component={Link} to="" onClick={handleClose}>Manage Enrollments</MenuItem>
          </Menu>
        </div>
        <Button color="inherit" component={Link} to="/login" onClick={() => localStorage.removeItem('token')}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
