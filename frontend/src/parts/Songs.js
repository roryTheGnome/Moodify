import {useEffect,useState} from "react";

function Songs() {
    const [songs, setSongs] = useState([]);

    const[newSong,setNewSong]=useState({
        Name: "",
        Artist: "",
        Duration_in_Secs: "",
        Release_Date: ""
    });

    const [showAddForm, setShowAddForm]=useState(false);

    //TODO come back here when you have time
    //idk if this is the right way to handle this situation
    const [selectedSong,setSelectedSong]=useState(null);
    const [songDetails,setSongDetails]=useState(null);

    const [editSong,setEditSong]=useState(null);
    const [isEditing,setIsEditing]=useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/songs")
            .then(res => {
                if (!res.ok) {
                    throw new Error("HTTP error " + res.status);
                }
                return res.json();
            })
            .then(data => setSongs(data))
            .catch(err => console.error("FETCH ERROR:", err));
    }, []);

    function addSong(){
        fetch("http://localhost:3001/songs/add",{
            method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(newSong)
        }).then(res=>{
            if (!res.ok) {
                return res.json().then(err => {
                    throw new Error(err.error);
                });
            }
            return res.json();
        })
            .then(()=>{
                setNewSong({Name: "", Artist: "", Duration_in_Secs: "", Release_Date: ""});
                setShowAddForm(false);
                return fetch("http://localhost:3001/songs")
            })
            .then(res=>res.json())
            .then(data=>setSongs(data));
    }

    function cancel(){
        setNewSong({
            Name:"",
            Artist: "",
            Duration_in_Secs: "",
            Release_Date: ""
        });
        setShowAddForm(false);
        setSelectedSong(null);
        setSongDetails(null);
        setIsEditing(false);
    }

    function showSongDetails(id){
        fetch(`http://localhost:3001/songs/${id}`)
            .then(res=>res.json())
            .then(data=>{
               setSongDetails(data);
               setSelectedSong(id);
               setShowAddForm(false);
            });
    }

    function startEdit(){
        setEditSong({...songDetails.song});
        setIsEditing(true);
    }

    function saveEdit(){
        fetch(`http://localhost:3001/songs/${editSong.ID}/edit`,{
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(editSong)
        })
            .then(res => {
                if (!res.ok) throw new Error("Update failed");
                return res.json();
            })
            .then(() => {
                setSongDetails({ ...songDetails, song: editSong });
                setIsEditing(false);

                return fetch("http://localhost:3001/songs");
            })
            .then(res => res.json())
            .then(data => setSongs(data));
    }

    return (
        <section id="SONGS">

            {/*SONG ADD*/}
            {showAddForm && (
                <>
                    <h2 id="Title">Add Song</h2>

                    <input placeholder="Name"
                           value={newSong.Name}
                           onChange={e => setNewSong({...newSong, Name: e.target.value})}/>

                    <input placeholder="Artist"
                           value={newSong.Artist}
                           onChange={e => setNewSong({...newSong, Artist: e.target.value})}/>

                    <input placeholder="Duration in Seconds"
                           value={newSong.Duration_in_Secs}
                           onChange={e => setNewSong({...newSong, Duration_in_Secs: Number(e.target.value)})}/>

                    <input placeholder="Release_Date"
                           type="date"
                           value={newSong.Release_Date}
                           onChange={e => setNewSong({...newSong, Release_Date: e.target.value})}/>

                    <br />

                    <button onClick={addSong}>Add</button>
                    <button onClick={cancel}>Cancel</button>

                    <hr />
                </>
            )}

            {/*SONG LIST*/}
            {!showAddForm && !songDetails && (
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
                                <td>{song.ID}</td>
                                <td>
                                    <button onClick={()=>showSongDetails(song.ID)}>{song.Name}</button>
                                </td>
                                <td>{song.Artist}</td>
                                <td>{song.Duration_in_Secs}</td>
                                <td>{song.Release_Date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <br />

                    <button onClick={()=> setShowAddForm(true)}>Add Song</button>
                    <hr />
                </>
            )}

            {/*SONG DETAIL*/}
            {songDetails &&(
                <>
                    <h2 id="Title">Song Details</h2>
                    {!isEditing ? (
                        <>
                    <p><strong>Name:</strong> {songDetails.song.Name}</p>
                    <p><strong>Artist:</strong> {songDetails.song.Artist}</p>
                    <p><strong>Duration:</strong> {songDetails.song.Duration_in_Secs}</p>
                    <p><strong>Release Date:</strong> {songDetails.song.Release_Date}</p>

                    <h3>Moods this song is in</h3>

                    {songDetails.moods.length === 0 && <p>No moods yet</p>}

                    <ul>
                        {songDetails.moods.map(mood => (
                            <li key={mood.ID}>
                                {mood.Name} (created by {mood.Created_By})
                            </li>
                        ))}
                    </ul>

                    <button onClick={cancel}>Back</button>
                    <button onClick={startEdit}>Edit</button>

                            <hr />
                        </>
                   ) : (
                        <>
                            <input
                                value={editSong.Name}
                                onChange={e => setEditSong({ ...editSong, Name: e.target.value })}
                            />
                            <input
                                value={editSong.Artist}
                                onChange={e => setEditSong({ ...editSong, Artist: e.target.value })}
                            />
                            <input
                                type="number"
                                value={editSong.Duration_in_Secs}
                                onChange={e => setEditSong({ ...editSong, Duration_in_Secs: Number(e.target.value) })}
                            />
                            <input
                                type="date"
                                value={editSong.Release_Date}
                                onChange={e => setEditSong({ ...editSong, Release_Date: e.target.value })}
                            />

                            <button onClick={saveEdit}>Save</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                            <hr />
                        </>
                    )}
                </>
            )}


        </section>
    );
}


export default Songs;