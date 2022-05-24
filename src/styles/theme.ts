import { createTheme } from '@mui/material';

const themeColors = createTheme({
  palette: {
    primary: {
      main: '#FF6701',
      // oranzine spalva
      light: '#ffffff',
      // balta
      dark: '#180A0A',
      // juoda
      contrastText: '#ffffff',
    },
  },
});

export default themeColors;
