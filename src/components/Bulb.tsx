import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React from 'react';

import { useBulb } from '../states/bulb';

const Bulb = () => {
  let bulbState = useBulb().on ? 'on' : 'off';
  return (
    <Container maxWidth="md" style={{
        marginTop: 50,
        backgroundImage : "url(" + process.env.PUBLIC_URL + '/bulb'+ bulbState +'.svg)',
        backgroundRepeat  : 'no-repeat',
        backgroundPosition: 'right 50% top 10%',
        height: 410,
        width : 200}}>
        <Grid container direction="column" alignItems="center" style={{}}>
          <Grid>
          </Grid>
        </Grid>
    </Container>
  )
}

export default Bulb