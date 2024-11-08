import React, { useState } from "react";

function SignIn() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setUserName(username);
        setPassword(password);
        let userData = {
            username:username,
            password:password
        };
        fetch("/signin", {
            method:"post",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        }).then(response => response.json()).then(data => {
            console.log(data);
            setUserName("");
            setPassword("");
        }).catch(err => {
            console.log(`Error signing in ${err}`);
        });
    }

    return (
        <div className="container">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={username}
                    onChange={e=>setUserName(e.target.value)}
                />
                <input 
                    type="password"
                    name="Password"
                    placeholder="Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <button>Sign In</button>
            </form>
        </div>
    )
}

export default SignIn