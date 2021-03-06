import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {useState} from "react";

import "../App.css";

import {FaCalendarAlt, FaDoorOpen, FaUsers} from "react-icons/fa";

import BookablesPage from "./Bookables/BookablesPage";
import BookingsPage from "./Bookings/BookingsPage";
import UsersPage from "./Users/UsersPage";
import UserPicker from "./Users/UserPicker";

import UserContext, {UserProvider} from "./Users/UserContext";

export default function App() {

    // Mange the user state with the useState hook.
    const [user, setUser] = useState();

    return (
        <UserProvider>
        <BrowserRouter>
            <div className="App">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/bookings" className="btn btn-header">
                                    <FaCalendarAlt/>
                                    <span>Bookings</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/bookables" className="btn btn-header">
                                    <FaDoorOpen/>
                                    <span>Bookables</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/users" className="btn btn-header">
                                    <FaUsers/>
                                    <span>Users</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <UserPicker />
                </header>

                <Routes>
                    <Route path="/bookings" element={<BookingsPage/>} />
                    <Route path="/bookables/*" element={<BookablesPage/>} />
                    <Route path="/users" element={<UsersPage/>} />
                </Routes>
            </div>
        </BrowserRouter>
       </UserProvider>
    );
}
