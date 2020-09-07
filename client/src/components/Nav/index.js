//Nav/index.js
import React from 'react';
import {Link} from 'react';
import "./style.css";
import Drawer from "../Drawer";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Public from '@material-ui/icons/Public';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EventIcon from '@material-ui/icons/Event';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
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
  }
});

export default function Nav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event, newValue) => {
    setValue(event.target.value);
  };

  return (

    <div>
      <div className="upper-nav row">
        <div className="col-3 col-sm-4">
          <Drawer />
        </div>

        <div className="title-name col-9 col-sm-4">
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
            <Tab href="/feed" icon={<Public />} aria-label="public" value="tab-one"/>
            <Tab href="/newevent" icon={<AddCircleOutlineIcon />} aria-label="add-circle-outline-icon" value="tab-two"/>
            <Tab href="/scheduler" icon={<EventIcon />} aria-label="event-icon" value="tab-three"/>
          </Tabs>
        </Paper>
      </div>
    </div>

  );
}