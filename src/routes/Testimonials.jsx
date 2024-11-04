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

    return (
        <div className="px-3 pt-6 pb-3">
            {isLoading ? <LoadingNonProvider /> : null}
            <h1 className="text-center text-2xl font-semibold">What our Customers Are Saying</h1>
            {isLoading ? null : <GoogleReviews reviewData={reviewData} isError={isReviewError} setReviewError={setReviewError} />}
            <h1 className="text-center text-2xl font-semibold">Additional Customer Feedback</h1>
            <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="col-span-2 md:col-span-1 w-full flex justify-center items-center">
                    <img className="rounded-md " src="/Testimonials/Brooke-scaled.webp"></img>
                </div>

                <div className="col-span-2 md:col-span-1 h-full flex items-center">
                    <div className="bg-comment-card-color rounded-md p-3">
                        <p className="text-lg align-middle w-full">Positive experience from beginning to end. Both Tony and Stephanie were extremely helpful throughout the buying process and flexible when I needed them to hold the truck for me until I was able to receive it. I wouldn’t look anywhere else to buy a mini truck. These guys are the best!</p>
                        <p className="font-semibold pt-3 block">Brooke</p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1 w-full flex justify-center items-center">
                    <img className="rounded-md " src="/Testimonials/BruceWasher-scaled.webp"></img>
                </div>

                <div className="col-span-2 md:col-span-1 h-full flex items-center">
                    <div className="bg-comment-card-color rounded-md p-3">
                        <p className="text-lg align-middle w-full">I bought my 1995 Suzuki Carry from Mayberry Mini Trucks and absolutely love it. If you want a huge selection of mini trucks, this is the place. These vehicles are truly the best bargains out there and the best part is they are street legal. Mine is a great farm vehicle and climbs like a goat. Stephanie knows all about the trucks and is a pleasure to deal with and they have a lovely farm with plenty of trails to get acquainted with these durable little beasts.</p>
                        <p className="font-semibold pt-3 block">Bruce Washer</p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1 w-full flex justify-center items-center">
                    <img className="rounded-md " src="/Testimonials/Grey-Scaled.webp"></img>
                </div>

                <div className="col-span-2 md:col-span-1 h-full flex items-center">
                    <div className="bg-comment-card-color rounded-md p-3">
                        <p className="text-lg align-middle w-full">Just a little update and a pic on our van!!! We love it sooo much thanks again!!! Every were we drive it people want to know and we tell them about you guys!!!!</p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1 w-full flex justify-center items-center">
                    <img className="rounded-md " src="/Testimonials/IMG_1657.webp"></img>
                </div>

                <div className="col-span-2 md:col-span-1 h-full flex items-center">
                    <div className="bg-comment-card-color rounded-md p-3">
                        <p className="text-lg align-middle w-full">“I first became enamored with Kei trucks when I lived in Japan but didn’t think getting one in the US would be possible. After more than a little research, I realized that it not only was possible but that Mayberry Mini Trucks had the best reputation for expertise and customer service. My experience of buying my dream truck–during a pandemic!–was made easy and satisfying by Tony and Stephanie.
 
 Before I made my final decision, Tony answered all my questions by calling me from the truck. He is extremely patient and generous with his time. I never felt rushed to make a decision. Tony transported my Sambar up to Massachusetts himself and answered even more questions during the handoff. I value his insight and tips about driving and owning the truck. Stephanie has been super helpful in explaining the company’s safety protocols and title transfer.
  
 Mayberry Mini Trucks has experience with only buying Kei trucks straight from Japan and tuning them up in their shop, and it shows! I’m thrilled that I could buy the exact truck I wanted without being limited to the used vehicles in my market. I couldn’t be happier with my truck. If I’m lucky enough to need another Kei truck, I know who to call first.</p>
                        <p className="font-semibold pt-3 block">Todd B</p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1 w-full flex justify-center items-center">
                    <img className="rounded-md " src="/Testimonials/IMG-1136-scaled.webp"></img>
                </div>

                <div className="col-span-2 md:col-span-1 h-full flex items-center">
                    <div className="bg-comment-card-color rounded-md p-3">
                        <p className="text-lg align-middle w-full">Mayberry trucks were very nice to deal with.  They were happy to talk about what I wanted on the phone and delivery was an easy way to make the purchase considering we live a couple of hours away.  Thanks, Mayberry Mini Trucks.</p>
                        <p className="font-semibold pt-3 block">Bill Baddorf</p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1 w-full flex justify-center items-center">
                    <img className="rounded-md " src="/Testimonials/JimB.webp"></img>
                </div>

                <div className="col-span-2 md:col-span-1 h-full flex items-center">
                    <div className="bg-comment-card-color rounded-md p-3">
                        <p className="text-lg align-middle w-full">Just a few words of thanks for the great work you guys did in providing me with my Subaru Sambar. Love the mini-trucks and this one is the best one that I have owned so far. Keep up the good work. You folks are the only “used vehicle” dealers that I have ever trusted.</p>
                        <p className="font-semibold pt-3 block">Jim B</p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1 w-full flex justify-center items-center">
                    <img className="rounded-md " src="/Testimonials/JimKing.webp"></img>
                </div>

                <div className="col-span-2 md:col-span-1 h-full flex items-center">
                    <div className="bg-comment-card-color rounded-md p-3">
                        <p className="text-lg align-middle w-full">Our Mazda Scrum from Mayberry Mini Trucks is hands down the most versatile and essential tool on our farm. We’re not sure how we made it this long without having one! You won’t regret doing business with Tony. He’s a phone call away for questions, parts or just to catch up. Wonderful folks to do business with.</p>
                        <p className="font-semibold pt-3 block">Jim King</p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1 w-full flex justify-center items-center">
                    <img className="rounded-md " src="/Testimonials/Rob-Patton-photo.webp"></img>
                </div>

                <div className="col-span-2 md:col-span-1 h-full flex items-center">
                    <div className="bg-comment-card-color rounded-md p-3">
                        <p className="text-lg align-middle w-full">We had specific needs for our van, Mayberry delivered, quite literally. The van that we ended up with met every need that we had. The purchase as well as the registration process was seamless as a result of the experience that Mayberry brings with the purchase. Could not be more pleased!</p>
                        <p className="font-semibold pt-3 block">Robb P</p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1 w-full flex justify-center items-center">
                    <img className="rounded-md " src="/Testimonials/Seth-scaled.webp"></img>
                </div>

                <div className="col-span-2 md:col-span-1 h-full flex items-center">
                    <div className="bg-comment-card-color rounded-md p-3">
                        <p className="text-lg align-middle w-full">Tony and Stephanie made the whole process very easy and straightforward. From finding the right truck to fit my needs, getting additional info and answering all my questions, up to having the truck sitting in my driveway, it’s been a pleasurable experience.</p>
                        <p className="font-semibold pt-3 block">Seth</p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1 w-full flex justify-center items-center">
                    <img className="rounded-md " src="/Testimonials/TestimonialMay7.webp"></img>
                </div>

                <div className="col-span-2 md:col-span-1 h-full flex items-center">
                    <div className="bg-comment-card-color rounded-md p-3">
                        <p className="text-lg align-middle w-full">We had a great experience working with Mayberry Mini Trucks. Tony and Stephanie were super helpful and very accommodating. They took us through every inch of the vehicle before we decided to purchase it. Follow-up and delivery was seamless and reasonably priced.</p>
                        <p className="font-semibold pt-3 block">Wolfe Neck Center for Agriculture & the Environment</p>
                    </div>
                </div>
            </div>
        </div>
    );
}