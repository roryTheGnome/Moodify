import {useEffect,useState} from "react";
import { useTranslation } from "react-i18next";

function Users() {
    const [users, setUsers] = useState([]);

    const { t } = useTranslation();

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
            <h2 id="Title">{t("Users")}</h2>

            <table>
                <thead>
                <tr>
                    <th>{t("Name")}</th>
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