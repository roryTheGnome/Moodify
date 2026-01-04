import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {MoodDetails} from "./Moods";

function Songs() {
    const [songs, setSongs] = useState([]);
    const [selectedSongId, setSelectedSongId] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newSong, setNewSong] = useState({
        Name: "",
        Artist: "",
        Duration_in_Secs: "",
        Release_Date: ""
    });

    useEffect(() => {
        fetchSongs();
    }, []);

    function fetchSongs() {
        fetch("http://localhost:3001/songs")
            .then(res => res.json())
            .then(data => setSongs(data));
    }

    function addSong() {
        fetch("http://localhost:3001/songs/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...newSong,
                Duration_in_Secs: Number(newSong.Duration_in_Secs)
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
                setNewSong({
                    Name: "",
                    Artist: "",
                    Duration_in_Secs: "",
                    Release_Date: ""
                });
                setShowAddForm(false);
                fetchSongs();
            })
            .catch(err => alert(err.message));
    }

    function cancelAdd() {
        setShowAddForm(false);
        setNewSong({
            Name: "",
            Artist: "",
            Duration_in_Secs: "",
            Release_Date: ""
        });
    }

    return (
        <section id="SONGS">

            {/* SONG DETAILS */}
            {selectedSongId && (
                <SongDetails songId={selectedSongId}  onBack={() => setSelectedSongId(null)}/>
            )}

            {/* ADD SONG */}
            {!selectedSongId && showAddForm && (
                <>
                    <h2 id="Title">Add Song</h2>

                    <input
                        placeholder="Name"
                        value={newSong.Name}
                        onChange={e =>
                            setNewSong({ ...newSong, Name: e.target.value })
                        }
                    />

                    <input
                        placeholder="Artist"
                        value={newSong.Artist}
                        onChange={e =>
                            setNewSong({ ...newSong, Artist: e.target.value })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Duration in seconds"
                        value={newSong.Duration_in_Secs}
                        onChange={e =>
                            setNewSong({
                                ...newSong,
                                Duration_in_Secs: e.target.value
                            })
                        }
                    />

                    <input
                        type="date"
                        value={newSong.Release_Date}
                        onChange={e =>
                            setNewSong({
                                ...newSong,
                                Release_Date: e.target.value
                            })
                        }
                    />

                    <br />

                    <button onClick={addSong}>Add</button>
                    <button onClick={cancelAdd}>Cancel</button>
                    <hr />
                </>
            )}

            {/* SONG LIST */}
            {!selectedSongId && !showAddForm && (
                <>
                    <h2 id="Title">Songs</h2>

                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Artist</th>
                            <th>Duration</th>
                            <th>Release Date</th>
                        </tr>
                        </thead>

                        <tbody>
                        {songs.map(song => (
                            <tr key={song.ID}>
                                <td>{song.ID}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            setSelectedSongId(song.ID)
                                        }
                                    >
                                        {song.Name}
                                    </button>
                                </td>
                                <td>{song.Artist}</td>
                                <td>{song.Duration_in_Secs}</td>
                                <td>{song.Release_Date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <br />
                    <button onClick={() => setShowAddForm(true)}>
                        Add Song
                    </button>
                    <hr />
                </>
            )}

        </section>
    );
}

function SongDetails({ songId, onBack }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const [editSong, setEditSong] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/songs/${songId}`)
            .then(res => res.json())
            .then(data => {
                setDetails(data);
                setLoading(false);
            });
    }, [songId]);


    function startEdit() {
        setEditSong({ ...details.song });
        setIsEditing(true);
    }

    function cancelEdit() {
        setIsEditing(false);
        setEditSong(null);
    }

    function saveEdit() {
        fetch(`http://localhost:3001/songs/${editSong.ID}/edit`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editSong)
        })
            .then(res => {
                if (!res.ok) throw new Error("Update failed");
                return res.json();
            })
            .then(() => {
                setDetails({
                    ...details,
                    song: editSong
                });
                setIsEditing(false);
            })
            .catch(err => alert(err.message));
    }

    function deleteSong() {
        if (!window.confirm("Are you sure you want to delete this song??")) return;

        fetch(`http://localhost:3001/songs/${details.song.ID}/delete`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) throw new Error("Delete failed");
                onBack();
            })
            .catch(err => alert(err.message));
    }

    if (loading) return <p>Loading...</p>;
    if (!details) return <p>Song not found</p>;

    return (
        <>
            <h2 id="Title">Song Details</h2>

            {!isEditing ? (
                <>
                    <p><strong>ID:</strong> {details.song.ID}</p>
                    <p><strong>Name:</strong> {details.song.Name}</p>
                    <p><strong>Artist:</strong> {details.song.Artist}</p>
                    <p><strong>Duration:</strong> {details.song.Duration_in_Secs}</p>
                    <p><strong>Release Date:</strong> {details.song.Release_Date}</p>

                    <h3>Moods this song is in</h3>

                    {details.moods.length === 0 && <p>No moods yet</p>}

                    <ul>
                        {details.moods.map(mood => (
                            <li key={mood.ID}>
                                <button onClick={() => navigate(`/moods/${mood.ID}`)}>
                                    {mood.Name}
                                </button>
                                (created by {mood.Created_By})
                            </li>
                        ))}
                    </ul>

                    <button onClick={onBack}>Back</button>
                    <button onClick={deleteSong}>Delete</button>
                    <button onClick={startEdit}>Edit</button>
                    <hr />
                </>
            ) : (
                <>
                    <input
                        value={editSong.Name}
                        onChange={e =>
                            setEditSong({ ...editSong, Name: e.target.value })
                        }
                    />
                    <input
                        value={editSong.Artist}
                        onChange={e =>
                            setEditSong({ ...editSong, Artist: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        value={editSong.Duration_in_Secs}
                        onChange={e =>
                            setEditSong({
                                ...editSong,
                                Duration_in_Secs: Number(e.target.value)
                            })
                        }
                    />
                    <input
                        type="date"
                        value={editSong.Release_Date}
                        onChange={e =>
                            setEditSong({
                                ...editSong,
                                Release_Date: e.target.value
                            })
                        }
                    />

                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>

                    <hr />
                </>
            )}
        </>
    );
}


export default Songs;
export {SongDetails};