import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ onRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleRegister() {
        if (!username || !password) return alert("Enter username and password");
        onRegister({ username });
        navigate("/");
    }

    return (
        <div>
            <h2>Register</h2>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <br />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
