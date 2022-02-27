//import { createTheme } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = (prefersDarkMode : boolean) => createTheme({
  palette: {
    mode: prefersDarkMode ? 'dark' : 'light',
  },
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});

//const theme = createTheme({
//  palette: {
//    primary: {
//      main: '#556cd6',
//    },
//    secondary: {
//      main: '#19857b',
//    },
//    error: {
//      main: red.A400,
//    },
//  },
//});

export default theme;
