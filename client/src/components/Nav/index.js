import React from 'react';
import "./style.css";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Public from '@material-ui/icons/Public';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EventIcon from '@material-ui/icons/Event';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
});

export default function Nav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem href='/profile' button key='Profile'>
          <ListItemIcon><AccountCircleIcon /></ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key='Sign Out'>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary='Sign Out' />
        </ListItem>
      </List>
    </div>
  );

  return (

    <div>
      <div className="upper-nav row">
        <div className="hamburger col-sm-4 col-xs-3">
          <div>
            {['left'].map((anchor) => (
              <React.Fragment key='{anchor}'>
                <Button onClick={toggleDrawer(anchor, true)}>MENU</Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="title-name col-sm-4 col-xs-9">
          TennisMatch
        </div>

      </div>

      <div>
        <Paper square className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
          >
            <Tab href="/feed" icon={<Public />} aria-label="public" />
            <Tab href="/newevent" icon={<AddCircleOutlineIcon />} aria-label="add-circle-outline-icon" />
            <Tab href="/scheduler" icon={<EventIcon />} aria-label="event-icon" />
          </Tabs>
        </Paper>
      </div>
    </div>

  );
}