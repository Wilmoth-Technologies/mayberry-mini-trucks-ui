import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
    const routerError = useRouteError();
    console.error(routerError);

    return (
        <div id="error-page" className="flex h-screen justify-center">
            <div className="m-auto">
                <h1 className="text-4xl text-center align-text-bottom">Oops!</h1>
                <p className="text-lg text-center">Sorry, an unexpected error has occurred.</p>
                <Link to="/" className="flex justify-center">
                    <span className="bg-action-yellow px-2 rounded-lg font-bold">Please Return Home</span>
                </Link>
            </div>
        </div>
    );
}