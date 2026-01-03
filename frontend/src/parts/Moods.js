import { useEffect, useState } from "react";
import {SongDetails} from "./Songs";

function Moods() {
    const [moods, setMoods] = useState([]);
    const [selectedMoodId, setSelectedMoodId] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newMood, setNewMood] = useState({ Name: "", Description: "" });

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

    function addMood(){
        fetch("http://localhost:3001/moods/add",{
            method:"POST",
            headers:{"Content-Type": "application/json" },
            body:JSON.stringify(newMood)
        })
            .then(res=>{
               if(!res.ok){
                   return res.json().then(err=>{
                       throw new Error(err.error);
                   });
               }
               return res.json();
            })
            .then(()=>{
                setNewMood({Name:"",Description:""});
                setShowAddForm(false);
                refreshMoods();
            })
            .catch(err=>alert(err.message));
    }

    function cancelAdd() {
        setShowAddForm(false);
        setNewMood({ Name: "", Description: ""
        });
    }

    return (
        <section id="MOODS">

            {showAddForm &&(
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

                    <hr/>
                </>
            )}
            {!showAddForm && (
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

                    <button onClick={()=>setShowAddForm(true)}>Add Mood</button>

                    <hr/>
                </>
            )}

        </section>
    );
}

function MoodDetails({ moodId, onBack }) {
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

    function saveEdit(){
        fetch(`http://localhost:3001/moods/${editMood.ID}/edit`,{
            method:"PUT", headers:{"Content-Type":"application/json"},
            body:JSON.stringify(editMood)
        })
            .then(res=>{
                if(!res.ok) throw new Error("Update faul");
                return res.json();
            })
            .then(()=>{
                setDetails({ ...details,mood:editMood});
                setIsEditing(false);
            })
            .catch(err=>alert(err.message));
    }

    function deleteMood(){
        if (!window.confirm("Are you sure you want to delete this mood??")) return;

        fetch(`http://localhost:3001/moods/${details.mood.ID}/delete`,{
            method:"DELETE"
        })
            .then(res => {
                if (!res.ok) throw new Error("Delete failed");
                onBack();
            })
            .catch(err => alert(err.message));
    }

    function addSongToMood(){
        if(!selectedSongToAdd){
            alert("You need to select a song");
            return;
        }

        fetch(`http://localhost:3001/moods/${moodId}/songs`,{
            method:"POST", headers: {"Content-Type": "application/json"},
            body:JSON.stringify({Song_ID:Number(selectedSongToAdd)})
        })
            .then(res=>{
                if(!res.ok){
                    return res.json().then(err=>{
                        throw new Error(err.error);
                    });
                }
                return res.json();
            })
            .then(()=>{
                return fetch(`http://localhost:3001/moods/${moodId}`); //justt to refresh
            })
            .then(res=>res.json())
            .then(data => setDetails(data))
            .then(() => {
                return fetch(`http://localhost:3001/moods/${moodId}/availablesongs`); //REFRESH THE DATA ON THE DROP
            })
            .then(res => res.json())
            .then(data => {
                setAvailableSongs(data);
                setSelectedSongToAdd("");
            })
            .catch(err => alert(err.message));
    }

    function removeSongFromMood(songID){
        if(!window.confirm("Are you sure about removing this song from this mood??"))return;

        fetch(`http://localhost:3001/moods/${moodId}/songs/${songID}/delete`,{method:"DELETE"})
            .then(res=>{
                if(!res.ok){
                    return res.json().then(err=>{
                        throw new Error (err.error);
                    });
                }
                return res.json();
            })
            .then(()=>{
                return fetch(`http://localhost:3001/moods/${moodId}`);//keep it {re}fresh
            })
            .then(res=>res.json())
            .then(data=>setDetails(data))
            .then(()=>{return fetch(`http://localhost:3001/moods/${moodId}/availablesongs`);})//noe that song is available for adding
            .then(res=>res.json())
            .then(data=>setAvailableSongs(data))
            .catch(err=>alert(err.message));
    }

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

                    {details.songs.length === 0 && (
                        <p>No songs added to this mood</p>
                    )}

                    <ul>
                        {details.songs.map(song => (
                            <li key={song.ID}>
                                <button onClick={() => setSelectedSongId(song.ID)}>{song.Name}</button>
                                {""}(By: {song.Artist})
                                {" "}
                                <button onClick={() => removeSongFromMood(song.ID)}>Remove</button>
                            </li>
                        ))}
                    </ul>

                    <h4>Add song to this mood</h4>

                    {availableSongs.length === 0 ? (
                        <p>There is no song available for this mood</p>
                    ) : (
                        <>
                            <select
                                value={selectedSongToAdd}
                                onChange={e => setSelectedSongToAdd(e.target.value)}
                            >
                                <option value="">-- Select a song --</option>
                                {availableSongs.map(song => (
                                    <option key={song.ID} value={song.ID}>
                                        {song.Name} – {song.Artist}
                                    </option>
                                ))}
                            </select>

                            <button onClick={addSongToMood}>Add Song</button>
                        </>
                    )}


                    <button onClick={onBack}>Back</button>
                    <button onClick={deleteMood}>Delete</button>
                    <button onClick={startEdit}>Edit</button>

                    <hr/>
                </>):(
                    <>
                        <input
                            value={editMood.Name}
                            onChange={e =>
                                setEditMood({ ...editMood, Name: e.target.value })
                            }
                            placeholder="Mood name"
                        />

                        <textarea
                            value={editMood.Description}
                            onChange={e =>
                                setEditMood({
                                    ...editMood,
                                    Description: e.target.value
                                })
                            }
                            placeholder="Description"
                        />

                        <button onClick={saveEdit}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                        <hr />
                    </>
            )}
        </>
    );
}

export default Moods;
export { MoodDetails };
