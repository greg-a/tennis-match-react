import React from "react";

function SignupForm(props) {
    return (
    <div>
    <h2>Create Account</h2>
    <div><p>{props.signupInstructions}</p></div>
    <form>
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
        <button type="button" className="btn btn-primary" 
        onClick={props.handleFormSubmit}
        id="login-button">Submit</button>
    </form>
    <br></br>
    <p>Already a user? <a href="/">LOG IN HERE</a></p>
    </div>
    )
}

export default SignupForm;

