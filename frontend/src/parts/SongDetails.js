import { useEffect, useState } from "react";

function SongDetails({ songId, onBack }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const [editSong, setEditSong] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
                    <p><strong>Name:</strong> {details.song.Name}</p>
                    <p><strong>Artist:</strong> {details.song.Artist}</p>
                    <p><strong>Duration:</strong> {details.song.Duration_in_Secs}</p>
                    <p><strong>Release Date:</strong> {details.song.Release_Date}</p>

                    <h3>Moods this song is in</h3>

                    {details.moods.length === 0 && <p>No moods yet</p>}

                    <ul>
                        {details.moods.map(mood => (
                            <li key={mood.ID}>
                                {mood.Name} (created by {mood.Created_By})
                            </li>
                        ))}
                    </ul>

                    <button onClick={onBack}>Back</button>
                    <button onClick={deleteSong}>Delete</button>
                    <button onClick={startEdit}>Edit</button>
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
                </>
            )}
        </>
    );
}

export default SongDetails;
