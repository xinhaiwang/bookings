import {useEffect, useMemo, useState, Fragment} from "react";

import {getGrid, transformBookings} from "./gridbuilder";

import {getBookings} from "../../utils/api";

import Spinner from "../UI/Spinner";

export default function BookingsGrid ({week, bookable, booking, setBooking}) {
    // 1. Variables

    // Handle the bookings data locally
    const [bookings, setBookings] = useState(null);

    // Handle loading error locally
    const [error, setError] = useState(false);

    const {grid, sessions, dates} = useMemo(
        () => bookable ? getGrid(bookable, week.start) : {},
        // Regenerate the grid when the bookable or week changes.
        [bookable, week.start]
    );

    // 2. Effects
    useEffect(() => {
        if (bookable) {
            // Use a variable to track whether the bookings data is current.
            let doUpdate = true;

            setBookings(null);
            setError(false);
            setBooking(null);

            getBookings(bookable.id, week.start, week.end)
                .then(resp => {
                    // Check if the bookings data is current.
                    // The callback function in the then clause will update the state only if doUpdate is still true.
                    if (doUpdate) {
                        setBookings(transformBookings(resp));
                    }
                })
                .catch(setError);
            // Return a cleanup function to invalidate the data.
            // Before rerunning an effect, React calls any associated cleanup function
            // for the previous invocation of the effect.
            return () => doUpdate =false;
        }
        // Run the effect when the bookable or week changes.
    }, [week, bookable, setBooking]);

    // 3. UI helper
    // The cell function is in the scope of BookingsGrid
    // and can access the booking, bookings, grid and setBookings variable.
    function cell(session, date) {
        // first check the bookings lookup, then the grid lookup.
        const cellData = bookings?.[session]?.[date] || grid[session][date];
        const isSelected = booking?.session === session && booking?.date === date;

        return (
            // Set a handler only if bookings have been loaded.
            <td key={date} className={isSelected ? "selected" : null} onClick={bookings ? () => setBooking(cellData) : null}>
                {cellData.title}
            </td>
        );
    }


    // 4. UI

    return (
        <div className="bookings-grid placeholder">
            <h3>Bookings Grid</h3>
            <p>{bookable?.title}</p>
            <p>{week.date.toISOString()}</p>
        </div>

    );
}
