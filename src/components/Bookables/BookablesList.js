import {useEffect, useState} from "react";
import {FaArrowRight} from "react-icons/fa";
import Spinner from "../UI/Spinner";

import getData from "../../utils/api";

export default function BookablesList ({bookable, setBookable}) {
   // 1. Variables
   // Assign the state and dispatch props to local variables.
    const [bookables, setBookables] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // optional chaining operator.
    // const group = bookable && bookable.group;
    // undefined
    const group = bookable?.group;
    const bookablesInGroup = bookables.filter(b => b.group === group);
    const groups = [...new Set(bookables.map(b => b.group))];

    // const timerRef = useRef(null);

    // We don't assign a initial value;
    // we're going to get React to automatically assign a value to the nextButtonRef.current property for us.

    // Once React has created the button element for the DOM, it assigns a reference to the element
    // to the nextButtonRef.current property.
    // const nextButtonRef = useRef();

    // 2. Effect
    useEffect(() => {
        getData("http://localhost:3001/bookables")
            .then(bookables => {
                setBookable(bookables[0]);
                setBookables(bookables);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            })
            // React doesn't trust functions passed in as props to be the same on each reander.
            // Indeed, we sometimes might define our own updater functions rather than directly using those that useState returns.
    }, [setBookable]);

    // useEffect(() => {
    //
    //     // Start an interval timer and assign its ID to the ref's current property.
    //     timerRef.current = setInterval(() => {
    //         dispatch({type: "NEXT_BOOKABLE"});
    //     }, 3000);
    //
    //     return stopPresentation;
    // }, []);


    // We can use the ID to clear the timer if necessary.
    // If the user clicks the Stop button or navigates to another page in the app.
    // function stopPresentation() {
    //     // Use the timer ID to clear the timer.
    //     clearInterval(timerRef.current);
    // }

    // 3. Handler functions
    function changeGroup (event) {
        const bookablesInSelectedGroup = bookables.filter(
            b => b.group === event.target.value
        );
        setBookable(bookablesInSelectedGroup[0]);
    }

    function nextBookable() {
        // In fact, to ensure that you have the latest state when setting new values based on old,
        // you can pass a function as the argument to the updater function.

        // React will pass that function the current state value and will use the return value
        // of that function as the new state value.
        const i = bookablesInGroup.indexOf(bookable)
        const nextIndex = (i + 1) % bookablesInGroup.length;
        const nextBookable = bookablesInGroup[nextIndex];
        setBookable(nextBookable);
    }

    // 4. UI
    if (error) {
        return <p>{error.message}</p>
    }

    if (isLoading) {
        return <p><Spinner/> Loading bookables...</p>
    }

    return (
        <div>
            <select value={group} onChange={changeGroup}>
                {groups.map(g => <option value={g} key={g}>{g}</option>)}
            </select>

            <ul className="bookables items-list-nav">
                {bookablesInGroup.map(b => (
                    <li
                        key={b.id}
                        className={b.id === bookable.id ? "selected" : null}
                    >
                        <button
                            className="btn"
                            onClick={() => setBookable(b)}
                        >
                            {b.title}
                        </button>
                    </li>
                ))}
            </ul>
            <p>
                <button
                    className="btn"
                    onClick={nextBookable}
                    autoFocus
                >
                    <FaArrowRight/>
                    <span>Next</span>
                </button>
            </p>
        </div>
    );
}

