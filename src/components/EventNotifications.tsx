import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { EventCard } from './EventCard';
import { useState } from "react";
import { useClearEvents, useEvents, useNbNewEvents, useOpenEvents } from '../states/events';
import { Grid, Typography } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from "@mui/material/styles";
import { run, stop } from '../indexer/indexer';

const NotificationMenu = () => {
  const [paused, setPaused] = useState(false);
  const clearEvents = useClearEvents();
  const handle = async () => {
    const isPaused = paused
    setPaused(prev => !prev)
    if (isPaused) {
      await run()
    } else {
      stop();
    }
  }
  const clear = () => {
    clearEvents()
  }
  let theme = useTheme()
  let grey = theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]
  return (
    <Grid container spacing={1} justifyContent="flex-start" style={{
      borderBottom: "1px solid",
      borderColor: grey,
      paddingLeft: "10px",
      paddingBottom: "4px"
    }}>
      <Grid item>
        <IconButton onClick={handle}>
          { paused ? <PlayArrowIcon/> : <PauseIcon />}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={clear}>
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

const NoEventCard = () => {
  let theme = useTheme()
  let grey = theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]
  return (
    <Grid container style={{ width: "600px", height: "50px" }}
      direction="row"
      justifyContent="center"
      alignItems="center">
      <Grid item>
        <Typography style={{ color: grey }}>
          No event
        </Typography>
      </Grid>
    </Grid>
  )
}

export const EventNotifications = () => {
  const nbNewEvents = useNbNewEvents();
  const openEvents = useOpenEvents();
  const events = useEvents();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    openEvents()
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        size="large"
        onClick={handleClick}
        >
        <Badge badgeContent={nbNewEvents} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        >
        <Grid direction="column" container spacing={1} style={{ width: "600px" }}>
          <Grid item>
            <NotificationMenu />
          </Grid>
          { events.length > 0 ? events.reverse().map((e,i) => {
            return (
              <Grid key={"event-card-"+i} item ><EventCard data={e}/></Grid>
            )
          }) : <NoEventCard /> }
        </Grid>
      </Menu>
    </div>)
}