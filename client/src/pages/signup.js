import React from "react";
import SignupForm from "../components/SignupForm";
import { Grid, TextField, Box } from '@material-ui/core';

class Signup extends React.Component {
    state = {
        signupUsername: "",
        signupPassword: "",
        signupEmail: "",
        signupInstructions: "Please enter your details"
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

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
                        signupInstructions: "Please complete the registration form"
                    });
                } else if (res.statusString === "userAlreadyExists") {
                    this.setState({
                        signupInstructions: "Account already exists with that username"
                    });
                } else if (res.statusString === "userCreateSuccess") {
                    this.setState({
                        signupInstructions: "Account successfully created. You may now login."
                    });
                    // redirects to the login page after creating account
                    window.location.replace("/");
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
                </Box>
            </div>

        );
    }
}

export default Signup;