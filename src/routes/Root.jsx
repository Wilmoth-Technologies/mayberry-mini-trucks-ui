import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleReviews from "../shared/components/reviews/GoogleReviews.jsx";
import InventoryScroller from "../shared/components/inventory/InventoryScroller.jsx";
import EmailSubscriptionModal from "../shared/components/modals/EmailSubscriptionModal.jsx";
import axiosInstance from "../shared/AxiosConfig.js";
import { ErrorAlert } from "../shared/components/ErrorAlert.jsx";
import LoadingNonProvider from "../shared/components/LoadingNonProvider.jsx";
import { getCurrentDate } from "../shared/AppFunctions.js";
import { GeneralAlert } from "../shared/components/GeneralAlert.jsx";
import { SuccessAlert } from "../shared/components/SuccessAlert.jsx";

export default function Root() {
    const [modalOpen, setModalOpen] = useState(false);
    const [reviewData, setReviewData] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [notificationList, setNotificationList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState({ isError: false, errorMessage: "" });
    const [isReviewError, setReviewError] = useState({ isError: false, errorMessage: "" });
    const [isGeneralAlert, setGeneralAlert] = useState({ isAlertOpen: false, message: "" });
    const [isSuccess, setSuccess] = useState({ isSuccess: false, successMessage: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/inventory/getTopTenInventoryMetaData');
                setInventory(response.data);

                const reviewResponse = await axiosInstance.get('/review/getBusinessDetails')
                setReviewData(reviewResponse.data);

                const notificationResponse = await axiosInstance.get('/notification/getNotification', { params: { date: getCurrentDate() } });
                setNotificationList(notificationResponse.data);
                if (notificationResponse.data.length) {
                    setGeneralAlert({ isAlertOpen: true, message: notificationResponse.data[0].description })
                }

                setError({ isError: false });
                setReviewError({ isError: false });
            } catch (error) {
                if (error.config.url === '/inventory/getTopTenInventoryMetaData') {
                    setError({ isError: true, errorMessage: "Failed to Load Inventory Data, Please Try Again." });
                } else if (error.config.url === '/review/getBusinessDetails') {
                    setReviewError({ isError: true, errorMessage: "Failed to Load Review Data, Please Try Again." });
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
        <>
            {isLoading ? <LoadingNonProvider /> : null}
            <div className="bg-mobile-landing-page md:bg-desktop-landing-page md:h-screen h-[600px] bg-cover bg-no-repeat -mt-28 bg-top drop-shadow-lg" />
            {/* About Us */}
            {isGeneralAlert.isAlertOpen ?
                <div className="absolute inset-0 pt-20 px-3 pb-2">
                    <GeneralAlert message={notificationList[0].description} dismissFunction={setGeneralAlert} />
                </div> : null}
            <h1 className="w-full text-center text-xl md:text-3xl font-semibold pt-2 md:pt-4">About Us</h1>
            <div className="flex flex-col-reverse justify-center sm:flex-row items-center p-6 gap-8">
                <img className="h-[188px] bg-contain bg-no-repeat bg-center drop-shadow-lg" src="/LandingKeiLineUp2.png" />
                <p className="text-lg text-center md:text-left">Mayberry Mini Trucks started as a small family-owned business in 2010. Through the years of growth, we are still just as passionate about providing quality, cost effective mini trucks for our customers. We take pride in providing our customers with top notch service as we bring them through the process of finding their mini truck with ease, so they can have the best experience possible.</p>
            </div>
            {isLoading ? null : <GoogleReviews reviewData={reviewData} isError={isReviewError} setReviewError={setReviewError} />}
            {/* Find Your Truck */}
            <div className="bg-grey-primary text-white pb-4">
                <h1 className="w-full text-center text-xl md:text-3xl font-semibold pt-2 md:pt-4">Find Your Truck Today!</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 pt-6 px-6 place-items-center md:gap-x-4">
                    <h2 className="text-center text-lg md:text-xl font-medium pt-2 pb-2">North Carolina Titling of Mini Trucks</h2>
                    <img className="hidden md:block bg-contain bg-no-repeat bg-center rounded pb-4 md:row-span-4" src="/MiniHauler.png" />
                    <p className="text-lg text-center md:text-left pb-4">HB 179 was signed by Governor Cooper on June 21, 2019. Japanese mini trucks can be licensed and driven on the NC roadways. Many thanks to House Rep Sarah Stevens, Senator Deanna Ballard and their staff for partnering with Mayberry Mini Trucks to overcome this significant legal hurdle. We at Mayberry Mini Trucks would like to invite you to now partner with us to help you with all your mini truck needs.</p>
                    <img className="h-[188px] bg-contain bg-no-repeat bg-center rounded-md pb-4 md:row-span-4 md:hidden" src="/MiniHauler.png" />
                    <h2 className="text-center text-lg md:text-xl font-medium pb-2">Doorstep Delivery!</h2>
                    <p className="text-lg text-center md:text-left pb-2 mb-4 md:mb-10">Here at Mayberry Mini Trucks we make our customers the priority. With that we offer delivery services. We’ll deliver your truck right to where you need it, whether that is a place of business, residence, or anywhere else. We’ll work with you to get the truck where it needs to go. Let us know when and where you need your truck delivered!</p>
                </div>
                <div className="flex-row text-center space-y-2 md:mx-6 md:-mt-10">
                    {isError.isError ?
                        <div className="pt-7">
                            <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError} />
                        </div> : null
                    }
                    <h2 className="text-lg md:text-xl font-medium xl:mt-12">See Our Inventory</h2>
                    <InventoryScroller className="basis-full" inventory={inventory} />
                </div>
                <div className="flex-row text-center space-y-2 md:mx-6 mt-4">
                    <Link to="/inventory" className="bg-action-yellow rounded-full text-black font-medium p-2">
                        VIEW FULL INVENTORY
                    </Link>
                </div>
            </div>
            {/* Newsletter Sub & Button */}
            {isSuccess.isSuccess ?
                <div className="pt-3 px-3">
                    <SuccessAlert message={isSuccess.successMessage} dismissFunction={setSuccess} />
                </div> : null
            }
            <div className="grid place-content-center p-3">
                <div className="flex text-center gap-3 items-center">
                    <p className="font-medium">Subscribe to learn about new arrivals and our latest news</p>
                    <button className="bg-black rounded-full text-white text-center items-center font-medium text-nowrap px-4 h-8" onClick={() => setModalOpen(true)}>
                        STAY IN TOUCH
                    </button>
                </div>
            </div>
            {modalOpen && <EmailSubscriptionModal onClose={() => setModalOpen(false)} setSuccess={setSuccess} />}
        </>
    );
}