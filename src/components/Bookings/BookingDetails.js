import {useContext} from "react";

import {FaEdit} from "react-icons/fa";

import Booking from "./Booking";

import UserContext from "../Users/UserContext";

export default function BookingDetails ({booking, bookable}) {
    // The component imports the UserContext context object and passes it to the
    // useContext hook, assigning the value the hook returns to the user variable.
    const user = useContext(UserContext);

    const isBooker = booking && user && (booking.bookerId === user.id);

    // Assign booking and bookable props to local variables.
    return (
        <div className="booking-details">
            <h2>Booking Details
                {isBooker && (
                    <span className="controls">
                        <button className="btn"><FaEdit/></button>
                    </span>
                )}
            </h2>
            {booking ? (
                <Booking booking={booking} bookable={bookable}/>
            ) : (
                <div className="booking-details-fields">
                    <p>Select a booking or a booking slot.</p>
                </div>
            )}
        </div>
    );
}
