import PropTypes from 'prop-types';

export default function ReviewCard({ reviewProfilePic, reviewProfileName, rating, reviewDate, review }) {
    return (
        <div className="w-[183px] md:w-auto md:flex md:flex-col bg-comment-card-color rounded-lg gap-2 mb-2 h-64 overflow-scroll">
            <div className='col-span-4 flex'>
                <p className="h-12 w-12 rounded-full bg-green-800 text-white text-center align-middle pt-3 ml-1 mt-2">{reviewProfilePic}</p>
                <div className="col-span-3 ml-2">
                    <p>{reviewProfileName}</p>
                    <p className='text-comment-card-review-date-color font-light text-sm'>{reviewDate}</p>
                    <div className="inline-flex items-center">
                        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(rating >= 0.1 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(rating >= 0.1 ? "0" : "1.5")}
                            className={"w-4 h-4 cursor-pointer " + (rating >= 0.1 ? "text-orange-400" : "text-blue-gray-500")}>
                            {(rating >= 0.1 ?
                                <path fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                </path>)}
                        </svg></span>
                        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(rating > 1 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(rating > 1 ? "0" : "1.5")}
                            className={"w-4 h-4 cursor-pointer " + (rating > 1 ? "text-orange-400" : "text-blue-gray-500")}>
                            {(rating > 1 ?
                                <path fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                </path>)}
                        </svg></span>
                        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(rating > 2 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(rating > 2 ? "0" : "1.5")}
                            className={"w-4 h-4 cursor-pointer " + (rating > 2 ? "text-orange-400" : "text-blue-gray-500")}>
                            {(rating > 2 ?
                                <path fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                </path>)}
                        </svg></span>
                        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(rating > 3 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(rating > 3 ? "0" : "1.5")}
                            className={"w-4 h-4 cursor-pointer " + (rating > 3 ? "text-orange-400" : "text-blue-gray-500")}>
                            {(rating > 3 ?
                                <path fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                </path>)}
                        </svg></span>
                        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(rating > 4 ? "currentColor" : "none")} stroke="currentColor" strokeWidth={(rating > 4 ? "0" : "1.5")}
                            className={"w-4 h-4 cursor-pointer " + (rating > 4 ? "text-orange-400" : "text-blue-gray-500")}>
                            {(rating > 4 ?
                                <path fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"></path> : <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                </path>)}
                        </svg></span>
                    </div>
                </div>

            </div>
            <p className='col-span-4 px-2'>{review}</p>
        </div>
    );
};

ReviewCard.propTypes = {
    reviewProfileName: PropTypes.string,
    reviewProfilePic: PropTypes.string,
    rating: PropTypes.number,
    reviewDate: PropTypes.string,
    review: PropTypes.string,
};