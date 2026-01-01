import { useEffect, useState } from "react";
import SongDetails from "./SongDetails";

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
                            <th>Name</th>
                            <th>Artist</th>
                            <th>Duration</th>
                            <th>Release Date</th>
                        </tr>
                        </thead>

                        <tbody>
                        {songs.map(song => (
                            <tr key={song.ID}>
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

export default Songs;
