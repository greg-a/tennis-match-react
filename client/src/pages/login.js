import React from "react";
import LoginForm from "../components/LoginForm";
import { Grid, Snackbar, Container } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends React.Component {
    state = {
        loginUsername: "",
        loginPassword: "",
        loginInstructions: "Please enter your details",
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

        let userCred = {
            username: this.state.loginUsername,
            password: this.state.loginPassword
        }

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userCred)
        })
            .then(res => res.json())
            .then(res => {
                if (res.statusString === "noPassOrUser") {
                    this.setState({
                        loginInstructions: "Must enter Username and Password",
                        openSnackbar: true,
                        severity: "error"
                    });
                } else if (res.statusString === "wrongPassOrUser") {
                    this.setState({
                        loginInstructions: "Incorrect Username and/or Password",
                        openSnackbar: true,
                        severity: "error"
                    });
                } else if (res.statusString === "loggedin") {
                    window.location.href = "/";
                }
            })
            .catch(err => console.log(err));

    };

    render() {
        return (
            <div className="login-page">
                <Container maxWidth="md">
                    <Grid container spacing={3} direction="column" alignItems="center" >
                        <Grid item xs={12} sm={8} md={7} >
                            <img src={require("../images/tennismatch.png")} width="100%" alt="Tennis Match Logo"/>

                        </Grid>
                        <Grid item xs={12}>
                            <LoginForm
                                usernameValue={this.state.loginUsername}
                                passwordValue={this.state.loginPassword}
                                loginInstructions={this.state.loginInstructions}
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                            />
                        </Grid>
                    </Grid>
                </Container>
                <Snackbar open={this.state.openSnackbar} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity={this.state.severity}>
                        {this.state.loginInstructions}
                    </Alert>
                </Snackbar>  
            </div>
        );
    }
}

export default Login;