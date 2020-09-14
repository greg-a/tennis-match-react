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

function LoginForm(props) {

    const classes = useStyles();

    return (
        <div>
            <div className="subtitle-and-instructions">
                <h2 className="login-page-subtitle">Login</h2>
                <div><p>{props.loginInstructions}</p></div>
            </div>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="loginUsername" name="loginUsername" label="Username" onChange={props.handleInputChange}
                        value={props.usernameValue}/>
                <TextField type="password" id="loginPassword" name="loginPassword" label="Password" onChange={props.handleInputChange}
                        value={props.passwordValue}/>

                <Button variant="contained" onClick={props.handleFormSubmit} id="login-button">Sign In</Button>
            </form>


            {/* <form>
                <div className="form-group">
                    <label for="loginUsername">Username</label>
                    <input type="text" className="form-control" id="loginUsername" name="loginUsername"
                        onChange={props.handleInputChange}
                        value={props.usernameValue}
                        placeholder="Username" />
                </div>
                <div className="form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" className="form-control" id="loginPassword" name="loginPassword"
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
            <p>First time here? <Button variant="contained" href="/signup">SIGN UP</Button></p>
            </div>
            
        </div>


    )
}

export default LoginForm;

