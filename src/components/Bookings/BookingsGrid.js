import {useEffect, useMemo, useState, Fragment} from "react";

import {getGrid, transformBookings} from "./grid-builder";

import {getBookings} from "../../utils/api";

import Spinner from "../UI/Spinner";
import {useBookings, useGrid} from "./bookingsHooks";

export default function BookingsGrid ({week, bookable, booking, setBooking}) {
    // 1. Variables

    const {bookings, status, error} = useBookings(
        bookable?.id, week.start, week.end
    );

    // Handle the bookings data locally
    // const [bookings, setBookings] = useState(null);

    // Handle loading error locally
    // const [error, setError] = useState(false);

    // const {grid, sessions, dates} = useMemo(
    //     () => bookable ? getGrid(bookable, week.start) : {},
    //     [bookable, week.start]
    // );
    const {grid, sessions, dates} = useGrid(bookable, week.start);


    // 2. Effects
    // useEffect(() => {
    //     if (bookable) {
    //         // Use a variable to track whether the bookings data is current.
    //         // When the user selects a new bookable or switches to a new week,
    //         // React returns the component, and the effect runs again to load the newly selected data.
    //         let doUpdate = true;
    //
    //         setBookings(null);
    //         setError(false);
    //         setBooking(null);
    //
    //         getBookings(bookable.id, week.start, week.end)
    //             .then(resp => {
    //                 // Check if the bookings data is current.
    //                 // The callback function in the then clause will update the state only if doUpdate is still true.
    //                 if (doUpdate) {
    //                     setBookings(transformBookings(resp));
    //                 }
    //             })
    //             .catch(setError);
    //         // Return a cleanup function to invalidate the data.
    //         // The in-flight data from the previous request is no longer needed.
    //         // Before rerunning an effect, React calls any associated cleanup function
    //         // for the previous invocation of the effect.
    //
    //         // If the component re-renders with a new url,
    //         // the cleanup function for the previous render will set the previous render's doUpdate variable to false
    //         // preventing the previous then method callback from performing updates with stale data.
    //         return () => doUpdate =false;
    //     }
    //     // Run the effect when the bookable or week changes.
    // }, [week, bookable, setBooking]);

    // 3. UI helper
    // The cell function is in the scope of BookingsGrid
    // and can access the booking, bookings, grid and setBookings variable.
    function cell(session, date) {
        // first check the bookings lookup, then the grid lookup.
        // Include a period, even when working with square brackets:
        const cellData = bookings?.[session]?.[date] || grid[session][date];
        const isSelected = booking?.session === session && booking?.date === date;

        return (
            // Set a handler only if bookings have been loaded.
            // <td key={date} className={isSelected ? "selected" : null} onClick={bookings ? () => setBooking(cellData) : null}>
            <td key={date} className={isSelected ? "selected" : null} onClick={status === "success" ? () => setBooking(cellData) : null}>
                {cellData.title}
            </td>
        );
    }


    // 4. UI
    if (!grid) {
        return <p>Waiting for bookable and week details...</p>
    }
    return (
        <>
          {status === "error" && (
              <p className="bookingsError">
                  {`There was a problem loading the bookings data (${error})`}
              </p>
          )}
          <table className={status === "success" ? "bookingsGrid active" : "bookingsGrid"}>
              <thead>
                  <tr>
                      <th>
                          <span className="status"><Spinner/></span>
                      </th>
                      {dates.map(d => (
                          <th key={d}>
                              {(new Date(d)).toDateString()}
                          </th>
                      ))}
                  </tr>
              </thead>
              <tbody>
              {sessions.map(session => (
                  <tr key={session}>
                      <th>{session}</th>
                      {dates.map(date => cell(session, date))}
                  </tr>
              ))}
              </tbody>
          </table>
        </>
    );
}
