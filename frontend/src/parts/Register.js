import { useState } from "react";

function Register({ onSuccess }) {
    const [form, setForm] = useState({
        Name: "",
        Password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function register() {
        setError("");
        setSuccess("");

        fetch("http://localhost:3001/account/register", {
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
            .then(() => {
                setSuccess("Account created");
                setForm({ Name: "", Password: "" });

                if (onSuccess) onSuccess();
            })
            .catch(err => setError(err.message));
    }

    return (
        <section>
            <h2 id="Title">Register</h2>

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

            <button onClick={register}>Register</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <hr />
        </section>
    );
}

export default Register;
