import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer as MUIDrawer } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Public from '@material-ui/icons/Public';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import io from 'socket.io-client';
const socket = io();

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  tennisButton: {
    color: "white",
    fontSize: "3em"
  }
});

const Drawer = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [notificationState, setNotificationState] = useState({
    messages: 0,
    matches: 0,
    notifications: false,
    userid: null
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () => {
    fetch("/logout")
      .then(res => {
        window.location.href = "/";
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getNotifications();
    connectToSocket();
  }, []);

  const connectToSocket = () => {
    socket.on("output", data => {

      fetch("/api/notifications").then(res => res.json())
        .then((notifications) => {
          if (notifications.messages > 0 || notifications.matches > 0) {
            setNotificationState({ userid: notifications.userid, messages: notifications.messages, matches: notifications.matches, notifications: true });
          }
          else {
            setNotificationState({ ...notificationState, userid: notifications.userid })
          }
        })

        return () => {
          socket.disconnect()
      };
    });
  };

  const getNotifications = () => {
    fetch("/api/notifications").then(res => res.json())
      .then((notifications) => {
        if (notifications.messages > 0 || notifications.matches > 0) {
          setNotificationState({ userid: notifications.userid, messages: notifications.messages, matches: notifications.matches, notifications: true });
        }
        else {
          setNotificationState({ ...notificationState, userid: notifications.userid })
        }
        const userid = notifications.userid

        socket.emit("notifyMe", userid);
      });
  };

  const itemsList = [
    {
      text: "Profile",
      icon: <AccountCircleIcon />,
      onClick: () => history.push("/profile")
    },
    {
      text: "Availability",
      icon: <AddCircleOutlineIcon />,
      onClick: () => history.push("/availability")
    },
    {
      text: "Feed",
      icon: <Public />,
      onClick: () => history.push("/feed")
    },
    {
      text: "Messenger",
      icon: <Badge badgeContent={notificationState.messages} color="secondary"><ChatBubbleOutlineIcon /></Badge>,
      onClick: () => history.push("/messenger")
    },
    {
      text: "Propose Match",
      icon: <ThumbsUpDownIcon />,
      onClick: () => history.push("/proposematch")
    },
    {
      text: "Requests",
      icon: <Badge badgeContent={notificationState.matches} color="secondary"><AssignmentTurnedInIcon /></Badge>,
      onClick: () => history.push("/requests")
    },
    {
      text: "Scheduler",
      icon: <EventIcon />,
      onClick: () => history.push("/scheduler")
    },
    {
      text: "Log Out",
      icon: <ExitToAppIcon />,
      onClick: handleLogout
    },

  ];

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
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>

      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} >
            <Badge color="primary" variant="dot" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} invisible={!notificationState.notifications}>
              <SportsTennisIcon className={clsx(classes.tennisButton)} />
            </Badge>
          </Button>
          <MUIDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </MUIDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default withRouter(Drawer);