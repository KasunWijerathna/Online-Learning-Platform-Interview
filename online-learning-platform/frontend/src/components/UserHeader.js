import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const UserHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={Link} to="" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Online Learning
          </Typography>
          <Button component={Link} to="/courses" color="inherit" style={{ marginRight: 10 }}>
            Courses
          </Button>
          <Button component={Link} to="/enrollments" color="inherit" style={{ marginRight: 10 }}>
            Enrollments
          </Button>
          <Button component={Link} to="/login" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default UserHeader;
