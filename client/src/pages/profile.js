import React from "react";
import ProfileForm from "../components/ProfileForm";
import Nav from "../components/Nav";
import { Switch, FormControlLabel, Container, Grid } from '@material-ui/core';

class Profile extends React.Component {
    state = {
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        city: "",
        state: "",
        zipcode: "",
        skilllevel: "",
        oppskilllevel: "",
        updateFirstname: null,
        updateLastname: null,
        updateCity: null,
        updateState: null,
        updateZipcode: null,
        updateSkilllevel: null,
        updateOppskilllevel: null,
        editToggle: false
    };

    componentDidMount() {
        this.getProfileInfo();
    }

    getProfileInfo = () => {
        fetch("/api/profile")
            .then(res => res.json())
            .then((profileInfo) => {
                this.setState({
                    username: profileInfo.username,
                    email: profileInfo.email,
                    firstname: profileInfo.firstname,
                    lastname: profileInfo.lastname,
                    city: profileInfo.city,
                    state: profileInfo.state,
                    zipcode: profileInfo.zipcode,
                    skilllevel: profileInfo.skilllevel,
                    oppskilllevel: profileInfo.oppskilllevel
                })
            })
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        let updateObj = {
            firstname: this.state.updateFirstname === null ? this.state.firstname : this.state.updateFirstname,
            lastname: this.state.updateLastname === null ? this.state.lastname : this.state.updateLastname,
            city: this.state.updateCity === null ? this.state.city : this.state.updateCity,
            state: this.state.updateState === null ? this.state.state : this.state.updateState,
            zipcode: this.state.updateZipcode === null ? this.state.zipcode : this.state.updateZipcode,
            skilllevel: this.state.updateSkilllevel === null ? this.state.skilllevel : this.state.updateSkilllevel
        }

        fetch("/api", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateObj)
        })
            .then(res => {
                this.getProfileInfo();
                this.setState({
                    updateFirstname: null,
                    updateLastname: null,
                    updateCity: null,
                    updateState: null,
                    updateZipcode: null,
                    editToggle: false
                });
            })
            .catch(err => console.log(err));
    };

    handleToggle = (event) => {
        this.setState({ editToggle: event.target.checked })
    };

    render() {
        return (
            <div>
                <Nav />
                <Container fixed>
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <h2>Profile</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.editToggle}
                                        onChange={this.handleToggle}
                                        color="primary"
                                    />
                                }
                                label="Edit Profile"
                            />
                        </Grid>
                    
                        <ProfileForm
                            username={this.state.username}
                            email={this.state.email}
                            defaultFirst={this.state.firstname}
                            defaultLast={this.state.lastname}
                            defaultCity={this.state.city}
                            defaultState={this.state.state}
                            defaultZip={this.state.zipcode}
                            defaultSkill={this.state.skilllevel}
                            updateFirstname={this.state.updateFirstname}
                            updateLastname={this.state.updateLastname}
                            updateCity={this.state.updateCity}
                            updateState={this.state.updateState}
                            updateZipcode={this.state.updateZipcode}
                            updateSkilllevel={this.state.updateSkilllevel}
                            updateOppskilllevel={this.state.updateOppskilllevel}
                            handleInputChange={this.handleInputChange}
                            handleFormSubmit={this.handleFormSubmit}
                            editToggle={this.state.editToggle}
                        />
                    </Grid>
                </Container>
            </div>

        );
    }
}

export default Profile;