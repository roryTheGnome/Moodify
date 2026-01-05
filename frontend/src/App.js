import { useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Songs, { SongDetails } from "./parts/Songs";
import Moods, { MoodDetails } from "./parts/Moods";
import Users from "./parts/Accounts";
import Register from "./parts/Register";
import Login from "./parts/Login";

function App() {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const { t } = useTranslation();

    const handleLogout = () => {
        setUser(null);
        navigate("/"); // go back to home for safety stuff
    };

    return (
        <>
            <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "rgba(29,101,43,0.29)" }}>

                <div>
                    <Link to="/moods" style={{ marginRight: "10px" }}>{t("Moods")}</Link>
                    <Link to="/songs" style={{ marginRight: "10px" }}>{t("Songs")}</Link>
                    <Link to="/users">{t("Users")}</Link>
                </div>

                <div>
                    {!user ? (
                        <>
                            <Link to="/login" style={{ marginRight: "10px" }}>{t("Login")}</Link>
                            <Link to="/register">{t("Register")}</Link>
                        </>
                    ) : (
                        <>
                            <span style={{ marginRight: "10px" }}>{t("Welcome")}, {user.Name}!</span>
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
                                {t("Logout")}
                            </button>
                        </>
                    )}
                </div>

            </nav>

            <Routes>
                <Route path="/" element={<h2>MOODIFY</h2>} />

                <Route path="/songs" element={<Songs user={user}/>} />
                <Route path="/songs/:id" element={<SongDetailsWrapper user={user} />} />
                <Route path="/moods" element={<Moods user={user} />} />
                <Route path="/moods/:id" element={<MoodDetails user={user} />} />

                <Route path="/users" element={<Users />} />
                <Route path="/login" element={<Login onLogin={setUser} />} />
                <Route path="/register" element={<Register onRegister={setUser} />} />
            </Routes>
        </>
    );
}

function SongDetailsWrapper({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();
    return <SongDetails songId={Number(id)} onBack={() => navigate("/songs")} user={user} />;
}

export default App;
