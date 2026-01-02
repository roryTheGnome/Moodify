import { useEffect, useState } from "react";
import {SongDetails} from "./Songs";

function Moods() {
    const [moods, setMoods] = useState([]);
    const [selectedMoodId, setSelectedMoodId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/moods")
            .then(res => res.json())
            .then(data => setMoods(data))
            .catch(err => console.error(err));
    }, []);

    function refreshMoods() {
        fetch("http://localhost:3001/moods")
            .then(res => res.json())
            .then(data => setMoods(data));
    }

    if (selectedMoodId) {
        return (
            <MoodDetails
                moodId={selectedMoodId}
                onBack={() => {
                    setSelectedMoodId(null);
                    refreshMoods();
                }}
            />
        );
    }

    return (
        <section id="MOODS">
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
                                onClick={() => setSelectedMoodId(mood.ID)}
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

            <hr />

        </section>
    );
}

function MoodDetails({ moodId, onBack }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedSongId, setSelectedSongId] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/moods/${moodId}`)
            .then(res => res.json())
            .then(data => {
                setDetails(data);
                setLoading(false);
            });
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

    return (
        <>
            <h2 id="Title">Mood Details</h2>

            <p><strong>ID:</strong> {details.mood.ID}</p>
            <p><strong>Name:</strong> {details.mood.Name}</p>
            <p><strong>Description:</strong> {details.mood.Description}</p>
            <p><strong>Created By:</strong> {details.mood.Created_By}</p>

            <h3>Songs in this mood</h3>

            {details.songs.length === 0 && (
                <p>No songs added to this mood</p>
            )}

            <ul>
                {details.songs.map(song => (
                    <li key={song.ID}>
                        <button onClick={()=>setSelectedSongId(song.ID)}>{song.Name}</button>
                        {""}(By: {song.Artist})
                    </li>
                ))}
            </ul>

            <button onClick={onBack}>Back</button>

            <hr />
        </>
    );
}

export default Moods;
export { MoodDetails };
