import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BulbStateProvider } from './states/bulb';
import { EventsStateProvider } from './states/events';
import theme from './theme';

const ThemedApp = () => {
  const prefersDarkMode : boolean = useMediaQuery('(prefers-color-scheme: dark)');
  return (
  <ThemeProvider theme={theme(false)}>
    <CssBaseline />
    <BulbStateProvider>
      <EventsStateProvider>
      <App />
      </EventsStateProvider>
    </BulbStateProvider>
  </ThemeProvider>)
}

ReactDOM.render(
  <ThemedApp />,
  document.querySelector('#root'),
);

