import { ErrorAlert } from "../ErrorAlert";
import ReviewCard from "./ReviewCard";

export default function GoogleReviews({ reviewData, isError, setReviewError }) {

    return (
        <>
            <div className="grid place-content-center mb-20 mt-8">
                <div className="flex gap-2">
                    <div className="size-32 rounded-full overflow-hidden bg-white drop-shadow-sm h-32 w-32">
                        <div className="h-32 w-32 rounded-full bg-kei-footer bg-contain bg-no-repeat bg-center" />
                    </div>
                    <div className="flex flex-col mt-8">
                        <h3 className="text-lg font-semibold">Mayberry Mini Trucks</h3>
                        <div className="flex items-center gap-1">
                            <span className="text-orange-400 font-bold">{reviewData?.rating}</span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(reviewData?.rating >= 0.1 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(reviewData?.rating >= 0.1 ? "0" : "1.5")}
                                className={"w-4 h-4 cursor-pointer " + (reviewData?.rating >= 0.1 ? "text-orange-400" : "text-blue-gray-500")}>
                                {(reviewData?.rating >= 0.1 ?
                                    <path fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                    </path>)}
                            </svg></span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(reviewData?.rating > 1 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(reviewData?.rating > 1 ? "0" : "1.5")}
                                className={"w-4 h-4 cursor-pointer " + (reviewData?.rating > 1 ? "text-orange-400" : "text-blue-gray-500")}>
                                {(reviewData?.rating > 1 ?
                                    <path fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                    </path>)}
                            </svg></span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(reviewData?.rating > 2 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(reviewData?.rating > 2 ? "0" : "1.5")}
                                className={"w-4 h-4 cursor-pointer " + (reviewData?.rating > 2 ? "text-orange-400" : "text-blue-gray-500")}>
                                {(reviewData?.rating > 2 ?
                                    <path fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                    </path>)}
                            </svg></span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(reviewData?.rating > 3 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(reviewData?.rating > 3 ? "0" : "1.5")}
                                className={"w-4 h-4 cursor-pointer " + (reviewData?.rating > 3 ? "text-orange-400" : "text-blue-gray-500")}>
                                {(reviewData?.rating > 3 ?
                                    <path fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                    </path>)}
                            </svg></span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(reviewData?.rating > 4 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(reviewData?.rating > 4 ? "0" : "1.5")}
                                className={"w-4 h-4 cursor-pointer " + (reviewData?.rating > 4 ? "text-orange-400" : "text-blue-gray-500")}>
                                {(reviewData?.rating > 4 ?
                                    <path fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                    </path>)}
                            </svg></span>
                        </div>
                        <span className="text-sm">Based on {reviewData?.user_ratings_total} reviews</span>
                    </div>
                </div>
            </div>
            <div className="flex-row text-center space-y-2 px-2 -mt-16">
                {isError.isError ?
                    <div className="pb-16">
                        <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setReviewError} />
                    </div> : null
                }
            </div>

            <div className="p-2 grid auto-cols grid-flow-col overflow-x-auto gap-2 -mt-16">
                {reviewData?.reviews?.map((review) => (
                    <ReviewCard key={review.author_name} rating={review.rating} reviewProfileName={review.author_name} reviewProfilePic={review.author_name.charAt(0)} reviewDate={review.relative_time_description} review={review.text} />
                ))}
            </div>
        </>
    );
};