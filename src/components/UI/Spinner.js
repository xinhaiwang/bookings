import {FaSpinner} from "react-icons/all";

export default function Spinner (props) {
    return (
        <span {...props}>
            <FaSpinner className="icon-loading"/>
        </span>
    );
}
