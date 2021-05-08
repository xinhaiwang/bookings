import {Fragment, useState} from "react";

import BookablesList from "./BookablesList"
import BookableDetails from "./BookableDetails";

import reducer from "./reducer";

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

    return (
        <Fragment>
            <BookablesList bookable={bookable} setBookable={setBookable} />
            <BookableDetails bookable={bookable}/>
        </Fragment>
    );
}
