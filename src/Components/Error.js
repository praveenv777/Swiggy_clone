import { useRouteError, Link } from "react-router-dom";
import errorimg from "../assets/img/404 Error.jpg";
const Error = ()=>{
    const err = useRouteError();
    return (
        <div className="error-page">
            <img src={errorimg} alt="ErrorImg"/>
            <h1>Opps!!</h1>
            <h2>Something went wrong!</h2>
            <h2 className="error-data">{err.status+""+err.statusText}</h2>
            <h3 className="error-back-home">Error Back to Home
                <Link to="/">Back Home</Link>
            </h3>
        </div>
    )
}

export default Error;