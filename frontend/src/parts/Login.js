import { useState } from "react";

function Login({ onLogin }) {
    const [form, setForm] = useState({Name: "", Password: ""});

    const [error, setError] = useState("");

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function login() {
        setError("");

        fetch("http://localhost:3001/account/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
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
                setForm({ Name: "", Password: "" });
            })
            .catch(err => setError(err.message));
    }

    return (
        <section>
            <h2 id="Title">Login</h2>

            <input
                name="Name"
                placeholder="Username"
                value={form.Name}
                onChange={handleChange}
            />

            <input
                name="Password"
                type="password"
                placeholder="Password"
                value={form.Password}
                onChange={handleChange}
            />

            <br />

            <button onClick={login}>Login</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <hr />
        </section>
    );
}

export default Login;
