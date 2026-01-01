import {useEffect,useState} from "react";

function Moods() {
    const [moods, setMoods] = useState([]);

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

    return (
        <section id="MOODS">
            <h2 id="Title">Moods</h2>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>From</th>
                </tr>
                </thead>

                <tbody>
                {moods.map(mood => (
                    <tr key={mood.ID}>
                        <td>{mood.Name}</td>
                        <td>{mood.Description}</td>
                        <td>{mood.Created_By}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}


export default Moods;