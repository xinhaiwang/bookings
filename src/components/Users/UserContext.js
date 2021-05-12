import {createContext, useState, useContext} from "react";

const UserContext = createContext();
const UserSetContext = createContext();

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

export function useUser() {
    // Consume the contexts from inside the hook.
    const user = useContext(UserContext);
    const setUser = useContext(UserSetContext);

    if (!setUser) {
        throw new Error("The UserProvider is missing.");
    }

    return [user, setUser];
}
