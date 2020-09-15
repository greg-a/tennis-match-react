import React from "react";
import "./style.css";
import { makeStyles, TextField, Button, Grid, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function LoginForm(props) {

    const classes = useStyles();

    return (
        <div>
            <div className="subtitle-and-instructions">
                <h2 className="login-page-subtitle">Login</h2>
                <div><p>{props.loginInstructions}</p></div>
            </div>

            
                <Box display="flex" justifyContent="center" alignItems="center">
                    <TextField id="loginUsername" name="loginUsername" label="Username" onChange={props.handleInputChange}
                        value={props.usernameValue}/>
                </Box>
               
               <Box display="flex" justifyContent="center" alignItems="center">
                <TextField type="password" id="loginPassword" name="loginPassword" label="Password" onChange={props.handleInputChange}
                        value={props.passwordValue}/>
                </Box>
                
            
                <Box display="flex" justifyContent="center" alignItems="center" paddingTop="15px">
                    <Button variant="contained" onClick={props.handleFormSubmit} id="login-button">Sign In</Button>
                </Box>
            
            
            
            <Box marginTop="60px">
            <div className="subtitle-and-instructions">
            <p>First time here?</p> 
            <Button variant="contained" href="/signup">SIGN UP</Button>
            </div>
            </Box>
            
        </div>


    )
}

export default LoginForm;

