import { Button } from '@mui/material';

import { useBulb, useSwitchOff, useSwitchOn } from '../states/bulb';

export const SwitchButton = () => {
  const isOn = useBulb().on
  const switchOn = useSwitchOn()
  const switchOff = useSwitchOff()
  const handleClick = () => {
    isOn ? switchOff() : switchOn()
  }
  return <Button onClick={handleClick}>Switch</Button>
}