import React, { useState } from 'react';

const Register = () => {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    const register = () => {
        // Add register API call
    };

    const login = () => {
        // Add login API call
    };

    return (
        <div className="App">
            <div className="registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}
                />
                <label>Password</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />
                <button onClick={register}> Register</button>
            </div>

            <div className="login">
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Username..."
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button onClick={login}> Login</button>
            </div>

            <h1>{loginStatus}</h1>
        </div>
    );
};

export default Register;