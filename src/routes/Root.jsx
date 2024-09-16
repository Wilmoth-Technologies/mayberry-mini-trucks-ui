import { Link } from "react-router-dom";
import GoogleReviews from "../shared/components/GoogleReviews.jsx";
import InventoryScroller from "../shared/components/InventoryScroller.jsx";

export default function Root() {
    return (
        <>
            <div className="bg-mobile-landing-page md:bg-desktop-landing-page md:h-screen h-[600px] bg-cover bg-no-repeat -mt-28 bg-top drop-shadow-lg" />
            {/* About Us */}
            <h1 className="w-full text-center text-xl md:text-3xl font-semibold pt-2 md:pt-4">About Us</h1>
            <div className="flex flex-col-reverse justify-center sm:flex-row items-center p-6 gap-8">
                <img className="h-[188px] bg-contain bg-no-repeat bg-center drop-shadow-lg" src="/LandingKeiLineUp2.png" />
                <p className="text-lg text-center md:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <GoogleReviews />
            {/* Find Your Truck */}
            <div className="bg-grey-primary text-white pb-4">
                <h1 className="w-full text-center text-xl md:text-3xl font-semibold pt-2 md:pt-4">Find Your Truck Today!</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 pt-6 px-6 place-items-center md:gap-x-4">
                    <h2 className="text-center text-lg md:text-xl font-medium pt-2 md:pt-4 pb-2">North Carolina Titling of Mini Trucks</h2>
                    <img className="hidden md:block bg-contain bg-no-repeat bg-center rounded pb-4 md:row-span-4" src="/MiniHauler.png" />
                    <p className="text-lg text-center md:text-left pb-4">HB 179 was signed by Governor Cooper on June 21, 2019. Japanese mini trucks can be licensed and driven on the NC roadways. Many thanks to House Rep Sarah Stevens, Senator Deanna Ballard and their staff for partnering with Mayberry Mini Trucks to overcome this significant legal hurdle. We at Mayberry Mini Trucks would like to invite you to now partner with us to help you with all your mini truck needs.</p>
                    <img className="h-[188px] bg-contain bg-no-repeat bg-center rounded-md pb-4 md:row-span-4 md:hidden" src="/MiniHauler.png" />
                    <h2 className="text-center text-lg md:text-xl font-medium pb-2">Doorstep Delivery!</h2>
                    <p className="text-lg text-center md:text-left pb-2">Here at Mayberry Mini Trucks we make our customers the priority. With that we offer delivery services. We’ll deliver your truck right to where you need it, whether that is a place of business, residence, or anywhere else. We’ll work with you to get the truck where it needs to go. Let us know when and where you need your truck delivered!</p>
                    <Link className="mx-16 bg-action-yellow text-black font-medium rounded-full p-2 text-center mb-6" to="/tempLink">VIEW DETAILS HERE</Link>
                </div>
                <div className="flex-row text-center space-y-2 md:mx-6">
                    <h2 className="text-lg md:text-xl font-medium">See Our Inventory</h2>
                    <InventoryScroller className="basis-full" />
                </div>
                <div className="flex-row text-center space-y-2 md:mx-6 mt-4">
                    <Link to="/inventory" className="bg-action-yellow rounded-full text-black font-medium p-2">
                        VIEW FULL INVENTORY
                    </Link>
                </div>
            </div>
            {/* Newsletter Sub & Button */}
            <div className="flex flex-row py-4 px-2 gap-1">
                <p className="basis-7/12 font-medium">Subscribe to learn about new arrivals and our latest news</p>
                <Link className="basis-5/12 text-white text-center items-center font-medium pt-2">
                    <p className="bg-black rounded-full p-2">STAY IN TOUCH</p>
                </Link>
            </div>
        </>

    );
}