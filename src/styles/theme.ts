import { createTheme } from '@mui/material';

const themeStyle = createTheme({
  palette: {
    primary: {
      main: '#d1453b',
      // oranzine spalva
      light: '#ffffff',
      // balta
    },
    secondary: {
      main: '#fdfdfd',
    },
    text: {
      primary: '#180A0A',
    },
  },
});

export default themeStyle;
