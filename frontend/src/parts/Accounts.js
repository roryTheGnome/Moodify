import {useEffect,useState} from "react";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(res => {
                if (!res.ok) {
                    throw new Error("HTTP error " + res.status);
                }
                return res.json();
            })
            .then(data => setUsers(data))
            .catch(err => console.error("FETCH ERROR:", err));
    }, []);

    return (
        <section id="Accounts">
            <h2 id="Title">Users</h2>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                </tr>
                </thead>

                <tbody>
                {users.map(user => (
                    <tr key={user.ID}>
                        <td>{user.Name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}


export default Users;