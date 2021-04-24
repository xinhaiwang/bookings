import {bookables, sessions, days} from "../../static.json";
import {Fragment, useState} from "react";
import {FaArrowRight} from "react-icons/all";

export default function BookablesList () {

    const [group, setGroup] = useState("Kit");

    const bookablesInGroup = bookables.filter(b => b.group === group);

    const [bookableIndex, setBookableIndex] = useState(0);

    const groups = [...new Set(bookables.map(b => b.group))];

    // There's no need to call useState to store the bookable object itself
    // because it can be derived from the index value already in state.
    const bookable = bookablesInGroup[bookableIndex];

    const [hasDetails, setHasDetails] = useState(false);

    function nextBookable() {
        // In fact, to ensure that you have the latest state when setting new values based on old,
        // you can pass a function as the argument to the updater function.

        // React will pass that function the current state value and will use the return value
        // of that function as the new state value.
        setBookableIndex((bookableIndex + 1) % bookablesInGroup.length);
    }

    return (
        <Fragment>
            <div>
                <select value={group} onChange={(e) => setGroup(e.target.value)}>
                    {groups.map(g => <option value={g} key={g}>{g}</option>)}
                </select>
                <ul className="bookables items-list-nav">
                    {bookablesInGroup.map((b, i) => (
                        <li key={b.id} className={i === bookableIndex ? "selected": null}>
                            <button className="btn" onClick={() => setBookableIndex(i)}>{b.title}</button>
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
                                    <input type="checkbox" checked={hasDetails} onChange={() => setHasDetails(has => !has)}/>
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

