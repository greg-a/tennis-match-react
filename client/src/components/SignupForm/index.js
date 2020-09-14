import React from "react";
import "./style.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function SignupForm(props) {

    const classes = useStyles();

    return (
        <div>
            <div className="subtitle-and-instructions">
                <h2 className="login-page-subtitle">Create Account</h2>
                <div><p>{props.loginInstructions}</p></div>
            </div>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="signupUsername" name="signupUsername" label="Username" onChange={props.handleInputChange}
                    value={props.usernameValue} />
                <TextField id="signupEmail" name="signupEmail" label="Email" onChange={props.handleInputChange}
                    value={props.usernameValue} />
                <TextField type="password" id="signupPassword" name="signupPassword" label="Password" onChange={props.handleInputChange}
                    value={props.passwordValue} />

                <Button variant="contained" onClick={props.handleFormSubmit} id="login-button">Submit</Button>
            </form>

            {/* <form>
                <div className="form-group">
                    <label for="signupUsername">Username</label>
                    <input type="text" className="form-control" id="signupUsername" name="signupUsername"
                        onChange={props.handleInputChange}
                        value={props.usernameValue}
                        placeholder="Username" />
                </div>
                <div className="form-group">
                    <label for="signupEmail">Email</label>
                    <input type="text" className="form-control" id="signupEmail" name="signupEmail"
                        onChange={props.handleInputChange}
                        value={props.usernameValue}
                        placeholder="Email" />
                </div>
                <div className="form-group">
                    <label for="signupPassword">Password</label>
                    <input type="password" className="form-control" id="signupPassword" name="signupPassword"
                        onChange={props.handleInputChange}
                        value={props.passwordValue}
                        placeholder="Password" />
                </div>
                <button type="button" className="btn"
                    onClick={props.handleFormSubmit}
                    id="login-button">Submit</button>
            </form> */}

            <br></br>
            <div className="subtitle-and-instructions">
                <p>Already a member? <Button variant="contained" href="/">Log In</Button></p>
            </div>
            {/* <br></br>
            <p>Already a user? <a href="/">LOG IN HERE</a></p> */}
        </div>
    )
}

export default SignupForm;

