import { runCrank, WellEventData } from '@completium/event-well-crank';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Container, Grid, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

import { register_SwitchOff, register_SwitchOn, SwitchOff, SwitchOn } from './bindings/bulb_bindings';
import Bulb from './components/Bulb';
import { EventNotifications } from './components/EventNotifications';
//import { TezosIcon } from './components/SwitchButton';
import { TezosIcon } from './components/TezosIcon';
import { useSwitchOff, useSwitchOn } from './states/bulb';
import { useAddEvent } from './states/events';

const bulbAddress = "KT19EAMugKU416cbA9jL1XcukWArfpv4dLYu"

function App() {
  const switchOn = useSwitchOn()
  const switchOff = useSwitchOff()
  const addEvent = useAddEvent()
  useEffect(() => {
    register_SwitchOn(bulbAddress,(e : SwitchOn, d : WellEventData | undefined) => {
      if (d !== undefined) {
        addEvent(d)
      }
      switchOn()
    })
    register_SwitchOff(bulbAddress,(e : SwitchOff, d : WellEventData | undefined) => {
      if (d !== undefined) {
        addEvent(d)
      }
      switchOff()
    })
    const runEventListener = async () => {
      runCrank()
    };
    runEventListener()
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
              <Typography>Event Well Crank demo</Typography>
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
