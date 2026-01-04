import { useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

import Songs, { SongDetails } from "./parts/Songs";
import Moods, { MoodDetails } from "./parts/Moods";
import Users from "./parts/Accounts";
import Register from "./parts/Register";
import Login from "./parts/Login";

function App() {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate("/"); // go back to home for safety stuff
    };

    return (
        <>
            <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "#f5f5f5" }}>

                <div>
                    <Link to="/moods" style={{ marginRight: "10px" }}>Moods</Link>
                    <Link to="/songs" style={{ marginRight: "10px" }}>Songs</Link>
                    <Link to="/users">Users</Link>
                </div>

                <div>
                    {!user ? (
                        <>
                            <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    ) : (
                        <>
                            <span style={{ marginRight: "10px" }}>Welcome, {user.username}!</span>
                            <button
                                onClick={handleLogout}
                                style={{
                                    padding: "5px 10px",
                                    cursor: "pointer",
                                    background: "#f44336",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px"
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

            </nav>

            <Routes>
                <Route path="/" element={<h2>MOODIFY</h2>} />

                <Route path="/songs" element={<Songs />} />
                <Route path="/songs/:id" element={<SongDetailsWrapper />} />
                <Route path="/moods" element={<Moods />} />
                <Route path="/moods/:id" element={<MoodDetails />} />

                <Route path="/users" element={<Users />} />
                <Route path="/login" element={<Login onLogin={setUser} />} />
                <Route path="/register" element={<Register onRegister={setUser} />} />
            </Routes>
        </>
    );
}

function SongDetailsWrapper() {
    const { id } = useParams();
    const navigate = useNavigate();
    return <SongDetails songId={Number(id)} onBack={() => navigate("/songs")} />;
}

export default App;
