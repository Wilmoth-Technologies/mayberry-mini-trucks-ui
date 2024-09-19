import ReviewCard from "./ReviewCard";

export default function GoogleReviews() {

    let props = {
        "rating": 2.2
    };

    let reviewProps = [{
        "reviewProfileName": "Gabriel Wilmoth",
        "reviewProfilePic": "G",
        "reviewDate": "2 Months Ago",
        "rating": 2.2,
        "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        "reviewProfileName": "Anna Wilmoth",
        "reviewProfilePic": "A",
        "reviewDate": "2 Months Ago",
        "rating": 2.2,
        "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    }];

    return (
        <>
            <div className="grid grid-rows-3 grid-flow-col">
                <div className="row-span-3 flex h-32 w-32 items-center justify-center rounded-full bg-kei-footer bg-contain bg-no-repeat bg-center drop-shadow-lg" />
                <h3 className="col-span-2 text-xl">Mayberry Mini Trucks</h3>
                <div className="col-span-2 inline-flex items-center">
                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(props.rating >= 0.1 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(props.rating >= 0.1 ? "0" : "1.5")}
                        className={"w-4 h-4 cursor-pointer " + (props.rating >= 0.1 ? "text-orange-400" : "text-blue-gray-500")}>
                        {(props.rating >= 0.1 ?
                            <path fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                            </path>)}
                    </svg></span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(props.rating > 1 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(props.rating > 1 ? "0" : "1.5")}
                        className={"w-4 h-4 cursor-pointer " + (props.rating > 1 ? "text-orange-400" : "text-blue-gray-500")}>
                        {(props.rating > 1 ?
                            <path fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                            </path>)}
                    </svg></span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(props.rating > 2 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(props.rating > 2 ? "0" : "1.5")}
                        className={"w-4 h-4 cursor-pointer " + (props.rating > 2 ? "text-orange-400" : "text-blue-gray-500")}>
                        {(props.rating > 2 ?
                            <path fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                            </path>)}
                    </svg></span>
                    {/* Need to modify the fill, Stoke, Stoke width, AND the Path when we are using the dynamic setting of the stars.... */}
                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(props.rating > 3 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(props.rating > 3 ? "0" : "1.5")}
                        className={"w-4 h-4 cursor-pointer " + (props.rating > 3 ? "text-orange-400" : "text-blue-gray-500")}>
                        {(props.rating > 3 ?
                            <path fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                            </path>)}
                    </svg></span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(props.rating > 4 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(props.rating > 4 ? "0" : "1.5")}
                        className={"w-4 h-4 cursor-pointer " + (props.rating > 4 ? "text-orange-400" : "text-blue-gray-500")}>
                        {(props.rating > 4 ?
                            <path fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                            </path>)}
                    </svg></span>
                </div>
                <p className="col-span-2">Based on 73 reviews</p>
            </div>

            <div className="p-2 grid auto-cols grid-flow-col overflow-x-auto gap-2">
                {reviewProps.map((review) => (
                    <ReviewCard key={review.reviewProfileName} rating={review.rating} reviewProfileName={review.reviewProfileName} reviewProfilePic={review.reviewProfilePic} reviewDate={review.reviewDate} review={review.review} />
                ))}
            </div>
        </>
    );
};