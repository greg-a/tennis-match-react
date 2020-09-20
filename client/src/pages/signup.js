import React from "react";
import SignupForm from "../components/SignupForm";
import { Grid, TextField, Box, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Signup extends React.Component {
    state = {
        signupUsername: "",
        signupPassword: "",
        signupEmail: "",
        signupInstructions: "Please enter your details",
        openSnackbar: false,
        severity: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ openSnackbar: false });
    }

    handleFormSubmit = event => {
        event.preventDefault();

        let signupUser = {
            username: this.state.signupUsername,
            password: this.state.signupPassword,
            email: this.state.signupEmail
        }

        fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupUser)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.statusString === "formNotComplete") {
                    this.setState({
                        signupInstructions: "Please complete the registration form",
                        openSnackbar: true,
                        severity: "warning"
                    });
                } else if (res.statusString === "userAlreadyExists") {
                    this.setState({
                        signupInstructions: "Account already exists with that username",
                        openSnackbar: true,
                        severity: "error"
                    });
                } else if (res.statusString === "userCreateSuccess") {
                    this.setState({
                        signupInstructions: "Account successfully created. You will now be directed to the login page",
                        openSnackbar: true,
                        severity: "success"
                    });
                    // redirects to the login page after creating account
                    var loginRedirect = setTimeout(function() {
                        window.location.replace("/");
                      }, 3000);

                    loginRedirect();
                }
            })
            .catch(err => console.log(err));

    };

    render() {
        return (
            <div className="login-page">
                <Box display="flex" justifyContent="center">
                    <Box maxWidth="800px">
                        <Grid container spacing={3} direction="column" alignItems="center" >
                            <Grid item xs={12} sm={8} >
                                <img src={require("../images/tennismatch.png")} width="100%" />

                            </Grid>
                            <Grid item xs={12}>
                                <SignupForm usernameValue={this.state.signUsername}
                                    passwordValue={this.state.signupPassword}
                                    emailValue={this.state.signupEmail}
                                    signupInstructions={this.state.signupInstructions}
                                    handleInputChange={this.handleInputChange}
                                    handleFormSubmit={this.handleFormSubmit} />
                            </Grid>
                        </Grid>
                    </Box>
                    <Snackbar open={this.state.openSnackbar} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
                        <Alert onClose={this.handleSnackbarClose} severity={this.state.severity}>
                            {this.state.signupInstructions}
                        </Alert>
                    </Snackbar>
                </Box>

            </div>

        );
    }
}

export default Signup;