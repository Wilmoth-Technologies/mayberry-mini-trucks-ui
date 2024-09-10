import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="flex h-screen justify-center">
            <div className="m-auto">
                <h1 className="text-4xl text-center align-text-bottom">Oops!</h1>
                <p className="text-lg text-center">Sorry, an unexpected error has occurred.</p>
                <p className="text-slate-400  text-center">
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    );
}