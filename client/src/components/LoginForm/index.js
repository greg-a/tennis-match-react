import React from "react";

function LoginForm(props) {
    return (
    <div>
    <h2>Login</h2>
    <div><p>{props.loginInstructions}</p></div>
    <form>
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
    </form>
    <br></br>
    <p>First time here? <a href="/signup">SIGN UP!</a></p>
    </div>
    )
}

export default LoginForm;

