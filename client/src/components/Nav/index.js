//Nav/index.js
import React from 'react';
import "./style.css";
import Drawer from "../Drawer";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Public from '@material-ui/icons/Public';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EventIcon from '@material-ui/icons/Event';
import { Grid, TextField, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Nav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event, newValue) => {
    setValue(event.target.value);
  };

  return (

    <div className="entire-nav">
      <div className="upper-nav row" >
        <Grid container item xs={12} spacing={3} alignItems="center">
          <Grid item xs={3} sm={4}>
            <Drawer />
          </Grid>

          <Grid item xs={6} sm={4} >
            <Box display="flex" justifyContent="center" alignItems="center">
            <img src={require("../../images/tennismatch.png")} id="login-logo" width="100%" />
            </Box>          
          </Grid>  
        </Grid>
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
            backgroundColor="white"
          >
            <Tab href="/feed" icon={<Public />} aria-label="public" value="tab-one" />
            <Tab href="/availability" icon={<AddCircleOutlineIcon />} aria-label="add-circle-outline-icon" value="tab-two" />
            <Tab href="/scheduler" icon={<EventIcon />} aria-label="event-icon" value="tab-three" />
          </Tabs>
        </Paper>
      </div>
    </div>

  );
}