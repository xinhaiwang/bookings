import BookablesView from "./BookablesView";
import {Route, Routes} from "react-router-dom";

export default function BookablesPage() {
    return (
        // <main className="bookables-page">
        //     <BookablesView />
        // </main>
        <Routes>
            <Route path="/:id">
                <BookablesView/>
            </Route>
            <Route path="/">
                <BookablesView/>
            </Route>
            <Route path="/:id/edit">
                <BookableEdit/>
            </Route>
            <Route path="/new">
                <BookableNew/>
            </Route>
        </Routes>
    );
}
