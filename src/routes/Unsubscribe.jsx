import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../shared/AxiosConfig";
import LoadingNonProvider from "../shared/components/LoadingNonProvider";
import { ErrorAlert } from "../shared/components/ErrorAlert";

export default function Unsubscribe() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState({ isError: false, errorMessage: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.delete('/remove/subscriber', { params: { email: email } });

                setError({ isError: false });
            } catch (error) {
                if (error.status === 404) {
                    setError({ isError: true, errorMessage: `Email: ${email} is already Unsubscribed.` });
                } else {
                    setError({ isError: true, errorMessage: `Failed to Unsubscribe ${email}, Please Try Again.` });
                }
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex h-screen justify-center bg-grey-footer -mt-14">
            {isLoading ? <LoadingNonProvider /> : null}

            <div className="m-auto">
                {isError.isError ?
                    <div className="px-3 pt-3">
                        <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError} />
                    </div> : null
                }
                <p className="text-2xl text-center align-text-bottom text-white">You have been Unsubscribed from All Mayberry Mini Truck Emails.</p>
                <p className="text-lg text-center text-white">Thanks for your business and we hope to serve you again in the future!</p>
                <Link to="/" className="flex justify-center">
                    <span className="bg-action-yellow px-2 rounded-lg font-bold text-grey-footer">Please Return Home</span>
                </Link>
            </div>
        </div>
    );
}