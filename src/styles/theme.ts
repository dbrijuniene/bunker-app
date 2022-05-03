import { createTheme } from '@mui/material';

const themeColors = createTheme({
  palette: {
    primary: {
      main: '#fc5203',
      light: '#ff6f2b',
      dark: '#1f1f1f',
      contrastText: '#ffffff',
    },
    background: {
      default: 'white',
    },
  },
});

export default themeColors;
