import React from "react";
import "./style.css";
import { makeStyles, TextField, Button, Grid, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    input: {
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px rgb(144,238,80) inset"
        }
    }
}));

function SignupForm(props) {

    const classes = useStyles();

    return (
        <div>
            <div className="subtitle-and-instructions">
                <h2 className="login-page-subtitle">Create Account</h2>
                <div><p>{props.loginInstructions}</p></div>
            </div>

            <Box display="flex" justifyContent="center" alignItems="center">
                <TextField id="signupUsername" name="signupUsername" label="Username" InputProps={{classes: classes}} onChange={props.handleInputChange}
                    value={props.usernameValue} />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center">
                <TextField id="signupEmail" name="signupEmail" label="Email" onChange={props.handleInputChange}
                    value={props.usernameValue} />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center">
                <TextField type="password" id="signupPassword" name="signupPassword" label="Password" onChange={props.handleInputChange}
                    value={props.passwordValue} />
            </Box>


            <Box display="flex" justifyContent="center" alignItems="center" paddingTop="15px">
                <Button variant="contained" onClick={props.handleFormSubmit} id="login-button">Create Account</Button>
            </Box>

            <Box marginTop="60px">
                <div className="subtitle-and-instructions">
                    <p>Already a member?</p>
                    <Button variant="contained" href="/">LOG IN</Button>
                </div>
            </Box>
        </div>


    )
}

export default SignupForm;

