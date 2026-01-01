import { useEffect, useState } from "react";

function SongDetails({ songId, onBack }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/songs/${songId}`)
            .then(res => res.json())
            .then(data => {
                setDetails(data);
                setLoading(false);
            });
    }, [songId]);

    if (loading) return <p>Loading...</p>;
    if (!details) return <p>Song not found</p>;

    return (
        <>
            <h2 id="Title">Song Details</h2>

            <p><strong>Name:</strong> {details.song.Name}</p>
            <p><strong>Artist:</strong> {details.song.Artist}</p>
            <p><strong>Duration:</strong> {details.song.Duration_in_Secs}</p>
            <p><strong>Release Date:</strong> {details.song.Release_Date}</p>

            <h3>Moods this song is in</h3>

            {details.moods.length === 0 && (
                <p>No moods yet</p>
            )}

            <ul>
                {details.moods.map(mood => (
                    <li key={mood.ID}>
                        {mood.Name} (created by {mood.Created_By})
                    </li>
                ))}
            </ul>

            <button onClick={onBack}>Back</button>
            <hr />
        </>
    );
}

export default SongDetails;
