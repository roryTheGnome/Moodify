import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ onRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleRegister() {
        if (!username || !password) {
            alert("Enter all the data pls");
            return;
        }

        fetch("http://localhost:3001/account/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Name: username,
                Password: password
            })
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => {
                        throw new Error(err.error);
                    });
                }
                return res.json();
            })
            .then(() => {
                return fetch("http://localhost:3001/account/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        Name: username,
                        Password: password
                    })
                });
            })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => {
                        throw new Error(err.error);
                    });
                }
                return res.json();
            })
            .then(data => {
                onRegister(data.user);
                navigate("/");
            })
            .catch(err => alert(err.message));
    }

    return (
        <div>
            <h2>Register</h2>

            <input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <br />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
