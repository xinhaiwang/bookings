import {useContext, useEffect, useState} from "react";
import Spinner from "../UI/Spinner";
import UserContext, {UserSetContext} from "./UserContext";

export default function UserPicker() {
    const [users, setUsers] = useState(null);

    const user = useContext(UserContext);
    const setUser = useContext(UserSetContext);

    // The useEffect call registers the data-fetching effect function with react
    // Pass the useEffect hook a function, the effect.

    // fetch on render
    useEffect(() => {
        // The fetch call returns a promise.
        fetch("http://localhost:3001/users")
            // json string to JavaScript object
            .then(resp => resp.json())
            .then(date => {
                setUsers(date);
                setUser(date[0]);
            })
        // when the component is first mounted.
    }, [setUser])


    function handleSelect(e) {
        const selectedID = parseInt(e.target.value, 10);
        const selectedUser = users.find(u => u.id === selectedID);
        setUser(selectedUser);
    }

    // React calls effect functions after rendering,
    // so the data won't be available for the first render.
    if (users === null) {
        return <Spinner/>
    }

    return (
        <select className="user-picker" onChange={handleSelect} value={user?.id}>
            {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
            ))}
        </select>
    );
}
