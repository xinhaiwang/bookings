import {createContext, useState} from "react";

const UserContext = createContext();
export default UserContext;

export const UserSetContext = createContext();

// Assign the special children prop to a local variable.
export function UserProvider ({children}) {
    // Manage the user state within the component
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={user}>
            <UserSetContext.Provider value={setUser}>
                // Render the children inside the provider.
                {children}
            </UserSetContext.Provider>
        </UserContext.Provider>
    );
}
