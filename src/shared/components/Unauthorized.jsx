import { Link } from "react-router-dom";

export default function Unauthorized() {

    return (
        <div id="unauthorized-page" className="flex h-screen justify-center">
            <div className="m-auto">
                <h1 className="text-4xl text-center align-text-bottom">Oops!</h1>
                <p className="text-lg text-center">Sorry, you do not have the permissions to access the requested page.</p>
                <Link to="/" className="flex justify-center">
                    <span className="bg-action-yellow px-2 rounded-lg font-bold">Please Return Home</span>
                </Link>
            </div>
        </div>
    );
}