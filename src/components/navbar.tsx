import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  styled,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const helloText = `Hello, ${user?.name}`;
  const handleClick = () => {
    dispatch(logout());
    sessionStorage.clear();
    navigate('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isSmall = useMediaQuery(theme.breakpoints.up('md'));

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
                  fontSize="large"
                  sx={{ cursor: 'pointer' }}
                  onClick={handleClick}
                />
              </>
            ) : (
              <Stack
                display="flex"
                direction="row"
                flexGrow={1}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                height="80px"
              >
                <img
                  style={{ width: '110px', height: '60px' }}
                  src="Bunker_logo.jpg"
                  alt="bunker"
                />
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={openMenu}
                >
                  <MenuOutlinedIcon
                    color="primary"
                    fontSize="large"
                  />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose} component={NavLink} to="/dashboard">Dashboard</MenuItem>
                  <MenuItem onClick={handleClose} component={NavLink} to="/items">Items</MenuItem>
                  <MenuItem onClick={handleClose} component={NavLink} to="/places">Places</MenuItem>
                </Menu>
              </Stack>
            )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
