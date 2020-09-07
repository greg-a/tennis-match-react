//Drawer/index.js
import React from "react";
import {
    Drawer as MUIDrawer,
    ListItem,
    List,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {withRouter} from "react-router-dom";

const useStyles = makeStyles({
    drawer: {
        width: "190px"
    }
});

const Drawer = (props) => {
    const { history } = props;
    const classes = useStyles();
    const itemsList = [
        {
            text: "Profile",
            icon: <AccountCircleIcon />,
            onClick: () => history.push("/profile")
        }

    ];

    return (
        <MUIDrawer variant="permanent">
            <List>
                {itemsList.map((item, index) => {
                    const { text, icon, onClick } = item;
                    return (
                        <ListItem button key={text} onClick={onClick}>
                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            <ListItemText primary={text} />
                        </ListItem>
                    );
                })}
            </List>
        </MUIDrawer>
    )
}

export default withRouter(Drawer);