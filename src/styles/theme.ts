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
  typography: {
    fontFamily: [
      'Roboto',
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default themeStyle;
