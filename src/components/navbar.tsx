import React, { useContext } from 'react';
import {
  AppBar, Toolbar, Container, styled, Typography, Box,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import AuthContext from '../features/auth/auth-context';
import themeColors from '../styles/theme';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: theme.palette.text.primary,
  textDecoration: 'none',
  alignSelf: 'stretch',
  padding: theme.spacing(0, 2),
  transition: theme.transitions.create('color'),

  '&.active': {
    boxShadow: `inset 0 -4px 0 0 ${theme.palette.primary.main}`,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },

  ':hover': {
    color: theme.palette.primary.main,
  },
}));

const Navbar: React.FC = () => {
  const { logout, user } = useContext(AuthContext);

  const helloText = `Hello, ${user?.name}`;
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
          <StyledNavLink to="/places">Places</StyledNavLink>
          <Box sx={{ flexGrow: 2 }} />
          <Typography sx={{ margin: '0 16px' }} color="text.primary">{helloText}</Typography>
          <LogoutIcon color="primary" fontSize="medium" sx={{ fontSize: 35, cursor: 'pointer' }} onClick={handleClick} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
