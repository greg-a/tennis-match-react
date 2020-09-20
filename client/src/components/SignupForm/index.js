import React from "react";
import "./style.css";
import { makeStyles, TextField, Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    input: {
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px rgb(144,238,80) inset"
        }
    },
    button: {
        background: 'linear-gradient(45deg, #269bee 30%, #4eadf0 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 18px',
        boxShadow: '0 3px 5px 2px rgb(125, 195, 245, .4)',
    },
    buttonTwo: {
        backgroundColor: 'white',
        "&:hover": {
            background: 'white'
        },
        borderRadius: 3,
        border: 0,
        color: '#45d500',
        height: 42,
        padding: '0 18px',
        boxShadow: '0 3px 5px 2px rgb(108, 230, 49, .4)',
    }
}));

function SignupForm(props) {

    const classes = useStyles();

    return (
        <div>
            <div className="subtitle-and-instructions">
                <h2 className="login-page-subtitle">Create Account</h2>
                <div><p>{props.signupInstructions}</p></div>
            </div>

            <Box display="flex" justifyContent="center" alignItems="center">
                <TextField id="signupUsername" name="signupUsername" label="Username" InputProps={{classes: classes}} onChange={props.handleInputChange}
                    value={props.usernameValue} />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center">
                <TextField id="signupEmail" name="signupEmail" label="Email" InputProps={{classes: classes}} onChange={props.handleInputChange}
                    value={props.usernameValue} />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center">
                <TextField type="password" id="signupPassword" name="signupPassword" label="Password" onChange={props.handleInputChange}
                    value={props.passwordValue} />
            </Box>


            <Box display="flex" justifyContent="center" alignItems="center" paddingTop="15px">
                <Button variant="contained" onClick={props.handleFormSubmit} id="login-button"
                classes={{root: classes.button}}
                >Create Account</Button>
            </Box>

            <Box marginTop="60px">
                <div className="subtitle-and-instructions">
                    <p>Already a member?</p>
                    <Button variant="contained" href="/"
                    classes={{root: classes.buttonTwo}}
                    >LOG IN</Button>
                </div>
            </Box>
        </div>


    )
}

export default SignupForm;

