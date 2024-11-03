import { useState, useEffect } from "react";
import GoogleReviews from "../shared/components/reviews/GoogleReviews";
import LoadingNonProvider from "../shared/components/LoadingNonProvider";
import axiosInstance from "../shared/AxiosConfig";

export default function Testimonials() {
    const [isLoading, setLoading] = useState(false);
    const [reviewData, setReviewData] = useState([]);
    const [isReviewError, setReviewError] = useState({ isError: false, errorMessage: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const reviewResponse = await axiosInstance.get('/review/getBusinessDetails')
                setReviewData(reviewResponse.data);
                setReviewError({ isError: false });
            } catch (error) {
                setReviewError({ isError: true, errorMessage: "Failed to Load Review Data, Please Try Again." });
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return(
        <div className="px-3 pt-6 pb-3">
            {isLoading ? <LoadingNonProvider /> : null}
            <h1 className="text-center text-2xl font-semibold">What our Customers Are Saying</h1>
            {isLoading ? null : <GoogleReviews reviewData={reviewData} isError={isReviewError} setReviewError={setReviewError} />}
            <h1 className="text-center text-2xl font-semibold">Additional Customer Feedback</h1>
            <div className="grid grid-cols-2 gap-3 pt-3 ">
                <img className="rounded-md" src="/MiniHauler.png"></img>
                <div className="bg-comment-card-color rounded-md p-3">
                    <p>SAMPLE FEEDBACK.... Populate me Later</p>
                </div>
                
                <div className="bg-comment-card-color rounded-md p-3">
                    <p>SAMPLE FEEDBACK.... Populate me Later</p>
                </div>
                <img className="rounded-md" src="/MiniHauler.png"></img>
                <img className="rounded-md" src="/MiniHauler.png"></img>
                <div className="bg-comment-card-color rounded-md p-3">
                    <p>SAMPLE FEEDBACK.... Populate me Later</p>
                </div>
                
                <div className="bg-comment-card-color rounded-md p-3">
                    <p>SAMPLE FEEDBACK.... Populate me Later</p>
                </div>
                <img className="rounded-md" src="/MiniHauler.png"></img>
                <img className="rounded-md" src="/MiniHauler.png"></img>
                <div className="bg-comment-card-color rounded-md p-3">
                    <p>SAMPLE FEEDBACK.... Populate me Later</p>
                </div>
                
                <div className="bg-comment-card-color rounded-md p-3">
                    <p>SAMPLE FEEDBACK.... Populate me Later</p>
                </div>
                <img className="rounded-md" src="/MiniHauler.png"></img>
            </div>
        </div>
    );
}