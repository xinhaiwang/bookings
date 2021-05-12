import {useEffect, useState} from "react";
import Spinner from "../UI/Spinner";
import {useUser} from "./UserContext";
import useFetch from "../../utils/useFetch";

export default function UserPicker() {
    const [user, setUser] = useUser();
    // const [users, setUsers] = useState(null);

    // const user = useContext(UserContext);
    // const setUser = useContext(UserSetContext);

    // The useEffect call registers the data-fetching effect function with react
    // Pass the useEffect hook a function, the effect.

    const {data: users = [], status} = useFetch(
        "http:localhost:3001/users"
    );


    // fetch on render
    // useEffect(() => {
    //     // The fetch call returns a promise.
    //     fetch("http://localhost:3001/users")
    //         // json string to JavaScript object
    //         .then(resp => resp.json())
    //         .then(date => {
    //             setUsers(date);
    //             setUser(date[0]);
    //         })
    //     // when the component is first mounted.
    // }, [setUser])

    useEffect(() => {
        setUser(users[0]);
    }, [users, setUser]);


    function handleSelect(e) {
        const selectedID = parseInt(e.target.value, 10);
        const selectedUser = users.find(u => u.id === selectedID);
        setUser(selectedUser);
    }

    // React calls effect functions after rendering,
    // so the data won't be available for the first render.
    // if (users === null) {
    if (status === "loading") {
        return <Spinner/>
    }

    if (status === "error") {
        return <span>Error!</span>
    }

    return (
        <select className="user-picker" onChange={handleSelect} value={user?.id}>
            {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
            ))}
        </select>
    );
}
