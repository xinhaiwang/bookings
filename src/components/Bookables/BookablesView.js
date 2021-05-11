import {Fragment, useState, useCallback} from "react";

import BookablesList from "./BookablesList"
import BookableDetails from "./BookableDetails";

// import reducer from "./reducer";

// const initialState = {
//     group: "Rooms",
//     bookableIndex: 0,
//     bookables: [],
//     isLoading: true,
//     error: false
// };

export default function BookablesView () {
    // when events occur in our application, instead of giving React new values to set,
    // we dispatch an action, and React uses the corresponding code int the reducer to generate
    // a new state before calling the component for the latest UI.
    // const [state, dispatch] = useReducer(reducer, initialState);

    // const bookablesInGroup = state.bookables.filter(
    //     b => b.group === state.group
    // );

    // There's no need to call useState to store the bookable object itself
    // because it can be derived from the index value already in state.
    // const bookable = bookablesInGroup[state.bookableIndex];

    const [bookable, setBookable] = useState();

    // But it's not uncommon to do some kind of validation or processing of values before updating state.
    // We need a way to maintain the indentity of our updater function,
    // so that it doesn't change from render to render.

    // The function that useCallback returns is stable while the values in the dependency list don’t change. 
    // When the dependencies change, React redefines, caches, and returns the function using the new dependency values. 
    const updateBookable =  useCallback(selected => {
        if (selected) {
            selected.lastShown = Date.now();
            setBookable(selected);
        }
    }, [])

    return (
        <Fragment>
            <BookablesList bookable={bookable} setBookable={updateBookable} />
            <BookableDetails bookable={bookable}/>
        </Fragment>
    );
}
