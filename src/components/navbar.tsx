import React from 'react';
import {
  AppBar, Toolbar, Container, styled,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

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

const Navbar: React.FC = () => (
  <AppBar position="static" sx={{ bgcolor: 'white' }}>
    <Container sx={{ px: { xs: 0, sm: 0 } }}>
      <Toolbar>
        <img style={{ width: '150px', height: '100px' }} src="Bunker_logo.jpg" alt="bunker" />
        <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
        <StyledNavLink to="/add-new-items">Add new items</StyledNavLink>
        <StyledNavLink to="/settings">Settings</StyledNavLink>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Navbar;
