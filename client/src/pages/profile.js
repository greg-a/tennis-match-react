import React from "react";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileForm from "../components/ProfileForm";

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
        updateFirstname: "",
        updateLastname: "",
        updateCity: "",
        updateState: "",
        updateZipcode: "",
        updateSkilllevel: "",
        updateOppskilllevel: ""
    };

    componentDidMount() {
        this.getProfileInfo();
    }

    getProfileInfo = () => {
        fetch("/api/profile")
            .then(res => res.json())
            .then((profileInfo) => {
                console.log(profileInfo);
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
            firstname: this.state.updateFirstname,
            lastname: this.state.updateLastname,
            city: this.state.updateCity,
            state: this.state.updateState
        }

        if (this.state.updateZipcode==="") {
            updateObj.zipcode = null;
        } else {
            updateObj.zipcode = this.state.updateZipcode;
        }

        fetch("/api", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateObj)
        })
            .then(res => {
                console.log(res);
                this.getProfileInfo();
                this.setState({
                    updateFirstname:"",
                    updateLastname:"",
                    updateCity:"",
                    updateState:"",
                    updateZipcode:"",
                });
            })
            .catch(err => console.log(err));

    };

    render() {
        return (
            <div className="container">
                <ProfileDisplay username={this.state.username}
                    email={this.state.email}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    city={this.state.city}
                    state={this.state.state}
                    zipcode={this.state.zipcode} />
                <ProfileForm 
                updateFirstname={this.state.updateFirstname}
                updateLastname={this.state.updateLastname}
                updateCity={this.state.updateCity}
                updateState ={this.state.updateState}
                updateZipcode={this.state.updateZipcode}
                updateSkilllevel={this.state.updateSkilllevel}
                updateOppskilllevel={this.state.updateOppskilllevel}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit} />
            </div>
        );
    }
}

export default Profile;