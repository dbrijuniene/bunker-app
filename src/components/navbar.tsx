import React, { useContext } from 'react';
import {
  AppBar, Toolbar, Container, styled, Button, Typography, Box,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import AuthContext from '../features/auth/auth-context';
import themeColors from '../styles/theme';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: theme.palette.primary.dark,
  textDecoration: 'none',
  alignSelf: 'stretch',
  padding: theme.spacing(0, 2),
  transition: theme.transitions.create('color'),

  '&.active': {
    boxShadow: `inset 0 -4px 0 0 ${theme.palette.primary.main}`,
  },

  ':hover': {
    color: theme.palette.primary.main,
  },
}));

const Navbar: React.FC = () => {
  const { logout, user } = useContext(AuthContext);

  const helloText = `Hello, ${user?.name} ${user?.surname}`;
  const handleClick = () => {
    logout();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.light' }}>
      <Container sx={{ px: { xs: 0, sm: 0 } }}>
        <Toolbar>
          <img style={{ width: '150px', height: '100px' }} src="Bunker_logo.jpg" alt="bunker" />
          <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
          <StyledNavLink to="/add-new-items">Add new items</StyledNavLink>
          <StyledNavLink to="/settings">Settings</StyledNavLink>
          <Box sx={{ flexGrow: 2 }} />
          <Typography sx={{ margin: '0 16px' }} color="black">{helloText}</Typography>
          {/* <Button variant="contained" onClick={handleClick}>
            Log out
          </Button> */}
          <LogoutIcon color="primary" fontSize="medium" sx={{ fontSize: 35, cursor: 'pointer' }} onClick={handleClick} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
