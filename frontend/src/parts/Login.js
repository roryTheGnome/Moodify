import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
        if (!username || !password) {
            alert("Enter all data");
            return;
        }

        fetch("http://localhost:3001/account/login", {
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
            .then(data => {
                onLogin(data.user);
                navigate("/");
            })
            .catch(err => alert(err.message));
    }

    return (
        <div>
            <h2>Login</h2>

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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
