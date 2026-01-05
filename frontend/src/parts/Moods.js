import { SongDetails } from "./Songs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Moods({user}) {
    const [moods, setMoods] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newMood, setNewMood] = useState({ Name: "", Description: "" });

    const navigate = useNavigate();

    useEffect(() => {
        refreshMoods();
    }, []);

    function refreshMoods() {
        fetch("http://localhost:3001/moods")
            .then(res => res.json())
            .then(data => setMoods(data))
            .catch(err => console.error(err));
    }

    function addMood() {
        if (!user) {
            alert("You must log in to add a mood");
            return;
        }
        fetch("http://localhost:3001/moods/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Name: newMood.Name,
                Description: newMood.Description,
                Created_By: user.ID
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
                setNewMood({ Name: "", Description: "" });
                setShowAddForm(false);
                refreshMoods();
            })
            .catch(err => alert(err.message));
    }

    function cancelAdd() {
        setShowAddForm(false);
        setNewMood({ Name: "", Description: "" });
    }

    return (
        <section id="MOODS">

            {showAddForm ? (
                <>
                    <h2 id="Title">Add Mood</h2>

                    <input
                        placeholder="Mood name"
                        value={newMood.Name}
                        onChange={e =>
                            setNewMood({ ...newMood, Name: e.target.value })
                        }
                    />

                    <textarea
                        placeholder="Description"
                        value={newMood.Description}
                        onChange={e =>
                            setNewMood({ ...newMood, Description: e.target.value })
                        }
                    />

                    <br />

                    <button onClick={addMood}>Add</button>
                    <button onClick={cancelAdd}>Cancel</button>
                    <hr />
                </>
            ) : (
                <>
                    <h2 id="Title">Moods</h2>

                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created By</th>
                        </tr>
                        </thead>
                        <tbody>
                        {moods.map(mood => (
                            <tr key={mood.ID}>
                                <td>{mood.ID}</td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/moods/${mood.ID}`)}
                                    >
                                        {mood.Name}
                                    </button>
                                </td>
                                <td>{mood.Description}</td>
                                <td>{mood.Created_By}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {user&& (
                        <button onClick={() => setShowAddForm(true)}>Add Mood</button>
                    )}

                    <hr />
                </>
            )}
        </section>
    );
}

function MoodDetails({user}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const moodId = Number(id);

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedSongId, setSelectedSongId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editMood, setEditMood] = useState(null);
    const [availableSongs, setAvailableSongs] = useState([]);
    const [selectedSongToAdd, setSelectedSongToAdd] = useState("");

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:3001/moods/${moodId}`)
            .then(res => res.json())
            .then(data => {
                setDetails(data);
                setLoading(false);
            });

        fetch(`http://localhost:3001/moods/${moodId}/availablesongs`)
            .then(res => res.json())
            .then(data => setAvailableSongs(data));
    }, [moodId]);

    if (loading) return <p>Loading...</p>;
    if (!details) return <p>Mood not found</p>;

    if (selectedSongId) {
        return (
            <SongDetails
                songId={selectedSongId}
                onBack={() => setSelectedSongId(null)}
            />
        );
    }

    function startEdit() {
        setEditMood({ ...details.mood });
        setIsEditing(true);
    }

    function cancelEdit() {
        setIsEditing(false);
        setEditMood(null);
    }

    function saveEdit() {
        fetch(`http://localhost:3001/moods/${editMood.ID}/edit`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editMood)
        })
            .then(res => {
                if (!res.ok) throw new Error("Update failed");
                return res.json();
            })
            .then(() => {
                setDetails({...details,mood:editMood});
                setIsEditing(false);
            })
            .catch(err => alert(err.message));
    }

    function deleteMood() {
        if (!window.confirm("Are you sure you want to delete this mood??")) return;

        fetch(`http://localhost:3001/moods/${moodId}/delete`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) throw new Error("upsi,delete failed");
                navigate("/moods");
            })
            .catch(err => alert(err.message));
    }

    function addSongToMood() {
        if (!selectedSongToAdd) {
            alert("Pick a song");
            return;
        }

        fetch(`http://localhost:3001/moods/${moodId}/songs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Song_ID: Number(selectedSongToAdd) })
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => {
                        throw new Error(err.error);
                    });
                }
                return res.json();
            })
            .then(() =>
                fetch(`http://localhost:3001/moods/${moodId}`)
                    .then(res => res.json())
                    .then(data => setDetails(data))
            )
            .then(() =>
                fetch(`http://localhost:3001/moods/${moodId}/availablesongs`)
                    .then(res => res.json())
                    .then(data => {
                        setAvailableSongs(data);
                        setSelectedSongToAdd("");
                    })
            )
            .catch(err => alert(err.message));
    }

    function removeSongFromMood(songID) {
        if (!window.confirm("Are you sure to remove this song??")) return;

        fetch(`http://localhost:3001/moods/${moodId}/songs/${songID}/delete`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => {
                        throw new Error(err.error);
                    });
                }
                return res.json();
            })
            .then(() =>
                fetch(`http://localhost:3001/moods/${moodId}`)
                    .then(res => res.json())
                    .then(data => setDetails(data))
            )
            .then(() =>
                fetch(`http://localhost:3001/moods/${moodId}/availablesongs`)
                    .then(res => res.json())
                    .then(data => setAvailableSongs(data))
            )
            .catch(err => alert(err.message));
    }

    console.log("USER:", user);
    console.log("CREATED BY:", details.mood.Created_By);


    return (
        <>
            <h2 id="Title">Mood Details</h2>

            {!isEditing ? (
                <>
                    <p><strong>ID:</strong> {details.mood.ID}</p>
                    <p><strong>Name:</strong> {details.mood.Name}</p>
                    <p><strong>Description:</strong> {details.mood.Description}</p>
                    <p><strong>Created By:</strong> {details.mood.Created_By}</p>

                    <h3>Songs in this mood</h3>

                    {details.songs.length === 0 && <p>No songs added</p>}

                    <ul>
                        {details.songs.map(song => (
                            <li key={song.ID}>
                                <button onClick={() => setSelectedSongId(song.ID)}>
                                    {song.Name}
                                </button>
                                {" "}({song.Artist})
                                {" "}{user && details.mood.Created_By === user.Name &&
                                (<button onClick={() => removeSongFromMood(song.ID)}>
                                    Remove
                                </button>)}
                            </li>
                        ))}
                    </ul>

                    {user &&(
                        <>
                            <h4>Add song</h4>

                            {availableSongs.length === 0 ? (
                                <p>No available songs</p>
                            ) : (
                                <>
                                    <select
                                        value={selectedSongToAdd}
                                        onChange={e => setSelectedSongToAdd(e.target.value)}
                                    >
                                        <option value="">-- Select --</option>
                                        {availableSongs.map(song => (
                                            <option key={song.ID} value={song.ID}>
                                                {song.Name} – {song.Artist}
                                            </option>
                                        ))}
                                    </select>
                                    <button onClick={addSongToMood}>Add</button>
                                </>
                            )}
                        </>
                    )}

                    {console.log(user)}
                    <br />
                    <button onClick={() => navigate("/moods")}>Back</button>
                    {user && Number(user.God_Privilege) === 1 && (
                        <button onClick={deleteMood}>Delete</button>
                    )}


                    {user && details.mood.Created_By === user.Name && (
                        <button onClick={startEdit}>Edit</button>
                    )}

                </>
            ) : (
                <>
                    <input
                        value={editMood.Name}
                        onChange={e =>
                            setEditMood({ ...editMood, Name: e.target.value })
                        }
                    />
                    <textarea
                        value={editMood.Description}
                        onChange={e =>
                            setEditMood({ ...editMood, Description: e.target.value })
                        }
                    />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </>
            )}
        </>
    );
}

export default Moods;
export { MoodDetails };
