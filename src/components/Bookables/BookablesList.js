import {sessions, days} from "../../static.json";
import {Fragment, useEffect, useReducer} from "react";
import {FaArrowRight} from "react-icons/fa";
import Spinner from "../UI/Spinner";
import reducer from "./reducer";

import getData from "../../utils/api";

const initialState = {
    group: "Rooms",
    bookableIndex: 0,
    hasDetails: true,
    bookables: [],
    isLoading: true,
    error: false
};

export default function BookablesList () {
    // when events occur in our application, instead of giving React new values to set,
    // we dispatch an action, and React uses the corresponding code int the reducer to generate
    // a new state before calling the component for the latest UI.
   const [state, dispatch] = useReducer(reducer, initialState, (value) => value);

   const {group, bookableIndex, bookables} = state;
   const {hasDetails, isLoading, error} = state;

    const bookablesInGroup = bookables.filter(b => b.group === group);

    // There's no need to call useState to store the bookable object itself
    // because it can be derived from the index value already in state.
    const bookable = bookablesInGroup[bookableIndex];

    const groups = [...new Set(bookables.map(b => b.group))];

    useEffect(() => {
        dispatch({type: "FETCH_BOOKABLES_REQUEST"});

        getData("http://localhost:3001/bookables")
            .then(bookables => dispatch({
                type: "FETCH_BOOKABLES_SUCCESS",
                payload: bookables
            }))
            .catch(error => dispatch({
                type: "FETCH_BOOKABLES_ERROR",
                payload: error
            }))
    }, []);


    function changeGroup (event) {
        dispatch({
            type: "SET_GROUP",
            payload: event.target.value
        });
    }

    function changeBookable (selectedIndex) {
        dispatch({
            type: "SET_BOOKABLE",
            payload: selectedIndex
        });
    }


    function nextBookable() {
        // In fact, to ensure that you have the latest state when setting new values based on old,
        // you can pass a function as the argument to the updater function.

        // React will pass that function the current state value and will use the return value
        // of that function as the new state value.
        dispatch({type: "NEXT_BOOKABLE"});
    }

    function  toggleDetails () {
        dispatch({type: "TOGGLE_HAS_DETAILS"});
    }

    if (error) {
        return <p>{error.message}</p>
    }

    if (isLoading) {
        return <p><Spinner/> Loading bookables...</p>
    }

    return (
        <Fragment>
            <div>
                <select value={group} onChange={changeGroup}>
                    {groups.map(g => <option value={g} key={g}>{g}</option>)}
                </select>
                <ul className="bookables items-list-nav">
                    {bookablesInGroup.map((b, i) => (
                        <li key={b.id} className={i === bookableIndex ? "selected": null}>
                            <button className="btn" onClick={() => changeBookable(i)}>{b.title}</button>
                        </li>
                    ))}
                </ul>
                <p>
                    <button className="btn" onClick={nextBookable} autoFocus><FaArrowRight/><span>Next</span></button>
                </p>
            </div>
            {bookable && (
                <div className="bookable-details">
                    <div className="item">
                        <div className="item-header">
                            <h2>
                                {bookable.title}
                            </h2>
                            <span className="controls">
                                <label>
                                    <input type="checkbox" checked={hasDetails} onChange={toggleDetails}/>
                                    Show Details
                                </label>
                            </span>
                        </div>
                        <p>{bookable.notes}</p>
                        {hasDetails && (
                            <div className="item-details">
                                <h3>Availability</h3>
                                <div className="bookable-availability">
                                    <ul>
                                        {bookable.days.sort().map(d => <li key={d}>{days[d]}</li>)}
                                    </ul>
                                    <ul>
                                        {bookable.sessions.map(s => <li key={s}>{sessions[s]}</li>)}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </Fragment>
    );
}

