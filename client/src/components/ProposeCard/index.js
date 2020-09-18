import React from "react";
import { makeStyles, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: 300
        },
        [theme.breakpoints.up('md')]: {
            width: 400
        }
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
}));

function ProposeCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {props.title}
                </Typography>
                <Typography >
                {props.userFirstname ? `Username: ${props.username} (${props.userFirstname} ${props.userLastname})` : `Username: ${props.username}`}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Skill level: {props.userSkill ? `${props.userSkill}` : `n/a`}
                </Typography>
                <Typography variant="body2" component="p">
                    Court Location: {props.eventLocation}
                    <br />
                    Start Time: {props.starttime}
                    <br />
                    End Time: {props.endtime}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" data-userid={props.userid} data-location={props.eventLocation} onClick={props.handleEventClick} data-index={props.eventIndex}>Propose Match</Button>
            </CardActions>
        </Card>
        // <div >
        //     <div className="card my-2" >
        //             <div className="card-body" >
        //                 <h5 className="card-title" >Type: {props.title}</h5>
        //                 <h6 className="card-subtitle mb-2 text-muted" >{props.userFirstname ? `Username: ${props.username} (${props.userFirstname} ${props.userLastname})` : `Username: ${props.username}`}</h6>
        //                 <p className="card-text">Skill level: {props.userSkill ? `${props.userSkill}` : `n/a`}</p>
        //                 <p className="card-text">Court Location: {props.eventLocation}</p>
        //                 <p className="card-text" >Start Time: {props.starttime}</p>
        //                 <p className="card-text" >End Time: {props.endtime}</p>

        //                 <button type="button" className="btn btn-primary" data-userid={props.userid} data-location={props.eventLocation} onClick={props.handleEventClick} data-index={props.eventIndex}>Propose Match</button>
        //             </div>
        //         </div>
        // </div>
    );
}

export default ProposeCard;