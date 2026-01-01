import {useEffect,useState} from "react";

function Moods() {
    const [moods, setMoods] = useState([]);

    const [details,setDetails]=useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/moods")
            .then(res => {
                if (!res.ok) {
                    throw new Error("HTTP error " + res.status);
                }
                return res.json();
            })
            .then(data => setMoods(data))
            .catch(err => console.error("FETCH ERROR:", err));
    }, []);

    function showMoodDetails(id){
        fetch(`http://localhost:3001/moods/${id}`)
            .then(res=>res.json())
            .then(data=>setDetails(data));
    }

    function cancel(){
        setDetails(null);
    }

    return (
        <section id="MOODS">

            {/*MOODS*/}
            {!details &&(
            <>
            <h2 id="Title">Moods</h2>

            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>From</th>
                </tr>
                </thead>

                <tbody>
                {moods.map(mood => (
                    <tr key={mood.ID}>
                        <td>{mood.ID}</td>
                        <td><button onClick={()=>showMoodDetails(mood.ID)}>{mood.Name}</button> </td>
                        <td>{mood.Description}</td>
                        <td>{mood.Created_By}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </>
            )}

            {/*MOOD DETAIL*/}
            {details &&(
                <>
                    <h2 id="Title">Mood Details</h2>

                    <p><strong>Name:</strong> {details.mood.Name}</p>
                    <p><strong>Description:</strong> {details.mood.Description}</p>
                    <p><strong>Created By:</strong> {details.mood.Created_By}</p>

                    <h3>Songs in This Mood</h3>

                    {details.songs.length==0 &&(
                        <p>No songs has been added to this mood</p>
                    )}

                    <ul>
                        {details.songs.map(song=>(
                            <li key={song.ID}>
                                {song.Name} - {song.Artist}
                            </li>
                        ))}
                    </ul>

                    <button onClick={cancel}>Back</button>


                </>
            )}


        </section>
    );
}


export default Moods;