import { Container, Grid, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

import { useSwitchOff, useSwitchOn } from './states/bulb';
import Bulb from './components/Bulb';
//import { SwitchButton } from './components/SwitchButton';
import { TezosIcon } from './components/TezosIcon';
import { registerSwitchOff, registerSwitchOn, SwitchOff, SwitchOn } from './bindings/bulb_bindings';
import { run } from './indexer/indexer';
import { EventData } from './indexer/types';
import { EventNotifications } from './components/EventNotifications';
import { useAddEvent } from './states/events';
import GitHubIcon from '@mui/icons-material/GitHub';

const bulbAddress = "KT19EAMugKU416cbA9jL1XcukWArfpv4dLYu"

function App() {
  const switchOn = useSwitchOn()
  const switchOff = useSwitchOff()
  const addEvent = useAddEvent()
  useEffect(() => {
    registerSwitchOn(bulbAddress,(e : SwitchOn, d : EventData | undefined) => {
      if (d !== undefined) {
        addEvent(d)
      }
      switchOn()
    })
    registerSwitchOff(bulbAddress,(e : SwitchOff, d : EventData | undefined) => {
      if (d !== undefined) {
        addEvent(d)
      }
      switchOff()
    })
    const runEvent = async () => {
      run()
    };
    runEvent()
  });
  return (
    <div>
      <AppBar>
        <Toolbar>
          <TezosIcon />
          <Grid container
            direction="row"
            justifyContent="space-between"
            alignItems="center" >
            <Grid item>
              <Typography>Event Listener Demo</Typography>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <IconButton size="large"><GitHubIcon /></IconButton>
                </Grid>
                <Grid item>
                  <EventNotifications />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop : '50px' }} >
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            <Bulb/>
          </Grid>
          {/** <Grid item>
            <SwitchButton/>
          </Grid> **/}
        </Grid>
      </Container>
   </div>
  );
}

export default App;
