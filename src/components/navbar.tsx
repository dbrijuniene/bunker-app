import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  styled,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useRootSelector } from '../store/hooks';
import { logout } from '../store/shared-slice';

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
    fontWeight: 700,
    color: theme.palette.primary.main,
  },

  ':hover': {
    color: theme.palette.primary.main,
  },
}));

const Navbar: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useRootSelector((state) => state.shared.user);

  const helloText = `Hello, ${user?.name}`;
  const handleClick = () => {
    dispatch(logout());
    sessionStorage.clear();
    navigate('/');
  };
  const isSmall = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.light' }}>
      <Container sx={{ px: { xs: 0, sm: 0 } }}>
        <Toolbar>
          {isSmall
            ? (
              <>
                <img
                  style={{ width: '150px', height: '100px' }}
                  src="Bunker_logo.jpg"
                  alt="bunker"
                />
                <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
                <StyledNavLink to="/items">Items</StyledNavLink>
                <StyledNavLink to="/places">Places</StyledNavLink>
                <Box sx={{ flexGrow: 2 }} />
                <Typography sx={{ margin: '0 16px' }} color="text.primary">
                  {helloText}
                </Typography>
                <LogoutIcon
                  color="primary"
                  fontSize="medium"
                  sx={{ fontSize: 35, cursor: 'pointer' }}
                  onClick={handleClick}
                />
              </>
            ) : (<div style={{ color: 'black' }}>This is the meniu</div>)}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
