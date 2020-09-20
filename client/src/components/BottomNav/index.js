import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    bottom: 0
  },
});

export default function BottomNav(props) {
  const classes = useStyles();

  return (
    <BottomNavigation value={props.value} className={classes.root}>
      <BottomNavigationAction label="Inbox" value="inbox-tab" icon={<PeopleIcon />} onClick={props.setInboxPage}/>
      {props.sendTo ?
        <BottomNavigationAction label={props.sendTo} value="chat-tab" icon={<ChatIcon />} onClick={props.setChatPage}/>
        : null
      }
    </BottomNavigation>
  );
}