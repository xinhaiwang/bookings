import {useState, useEffect} from "react";
import getData from "../../utils/api";
import Spinner from "../UI/Spinner";
import useFetch from "../../utils/useFetch";

export default function UsersList ({user, setUser}) {
    // const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [users, setUsers] = useState(null);

    const {data : users = [], status, error} = useFetch(
        "http://localhost:3001/users"
    );

    // useEffect(() => {
    //     getData("http://localhost:3001/users")
    //         .then(data => {
    //             // setUser(data[0]);
    //             setUsers(data);
    //             setIsLoading(false);
    //         })
    //         .catch(error => {
    //             setError(error);
    //             setIsLoading(false);
    //         })
    // }, [setUser]);

    // if (error) {
    //     return <p>{error.message}</p>
    // }
    //
    // if (isLoading) {
    //     return <p><Spinner/> Loading users...</p>
    // }

    if (status === "error") {
        return <p>{error.message}</p>
    }

    if (status === "loading") {
        return <p><Spinner/> Loading users...</p>
    }

    return (
        <ul className="users items-list-nav">
            {users.map(u => (
                <li key={u.id} className={u.id === user?.id ? "selected": null}>
                    <button className="btn" onClick={() => setUser(u)}>{u.name}</button>
                </li>
            ))}
        </ul>
    );
}
