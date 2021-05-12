import UsersList from "./UsersList";
import UserDetails from "./UserDetails";
import {useState} from "react";
import {useUser} from "./UserContext";

export default function UsersPage() {
    // manage selected user state
    const [user, setUser] = useState(null);
    // const loggedInUser = useContext(UserContext);
    const [loggedInUser] = useUser();
    const currentUser = user || loggedInUser;

    // pass user state down
    return (
        <main className="users-page">
            <UsersList user={currentUser} setUser={setUser}/>
            <UserDetails user={currentUser}/>
        </main>
    );
}
