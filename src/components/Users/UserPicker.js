import {useEffect, useState} from "react";
import Spinner from "../UI/Spinner";

export default function UserPicker() {
    const [users, setUsers] = useState(null);

    // The useEffect call registers the data-fetching effect function with react
    useEffect(() => {
        // The fetch call returns a promise.
        fetch("http://localhost:3001/users")
            // json string to JavaScript object
            .then(resp => resp.json())
            .then(date => setUsers(date))
        // when the component is first mounted.
    }, [])

    // React calls effect functions after rendering,
    // so the data won't be available for the first render.
    if (users === null) {
        return <Spinner/>
    }

    return (
        <select>
            {users.map(u => (
                <option key={u.id}>{u.name}</option>
            ))}
        </select>
    );
}
