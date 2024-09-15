import GoogleReviews from "../shared/components/GoogleReviews.jsx";
import InventoryScroller from "../shared/components/InventoryScroller.jsx";

export default function Root() {
    return (
        <>
            <div className="bg-mobile-landing-page md:bg-desktop-landing-page md:h-screen h-[600px] bg-cover bg-no-repeat -mt-28 bg-top drop-shadow-lg" />
            {/* About Us */}
            <h1 className="w-full text-center text-xl md:text-3xl font-semibold pt-2 md:pt-4">About Us</h1>
            <div className="flex flex-col-reverse justify-center sm:flex-row items-center p-6 gap-8">
                <img className="h-[188px] bg-contain bg-no-repeat bg-center" src="/LandingKeiLineUp2.png" />
                <p className="text-lg text-center md:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <GoogleReviews />
            {/* Find Your Truck */}
            <div className="bg-grey-primary text-white">
                <h1 className="w-full text-center text-xl md:text-3xl font-semibold pt-2 md:pt-4">Find Your Truck Today!</h1>
                <div className="flex flex-col-reverse justify-center sm:flex-row items-center p-6 gap-8">
                    <a className="bg-action-yello text-black font-medium rounded-full p-2" href="/tempLink">VIEW FULL INVENTORY</a>
                    <InventoryScroller />
                    <h2 className="text-center text-lg md:text-xl font-medium pt-2 md:pt-4">See Our Inventory</h2>
                    <a className="bg-action-yello text-black font-medium rounded-full p-2" href="/tempLink">VIEW DETAILS HERE</a>
                    <p className="text-lg text-center md:text-left">Here at Mayberry Mini Trucks we make our customers the priority. With that we offer delivery services. We’ll deliver your truck right to where you need it, whether that is a place of business, residence, or anywhere else. We’ll work with you to get the truck where it needs to go. Let us know when and where you need your truck delivered!</p>
                    <h2 className="text-center text-lg md:text-xl font-medium pt-2 md:pt-4">Doorstep Delivery!</h2>
                    <img className="h-[188px] bg-contain bg-no-repeat bg-center rounded-md" src="/MiniHauler.png" />
                    <p className="text-lg text-center md:text-left">HB 179 was signed by Governor Cooper on June 21, 2019. Japanese mini trucks can be licensed and driven on the NC roadways. Many thanks to House Rep Sarah Stevens, Senator Deanna Ballard and their staff for partnering with Mayberry Mini Trucks to overcome this significant legal hurdle. We at Mayberry Mini Trucks would like to invite you to now partner with us to help you with all your mini truck needs.</p>
                    <h2 className="text-center text-lg md:text-xl font-medium pt-2 md:pt-4">North Carolina Titling of Mini Trucks</h2>
                </div>
            </div>
            {/* Newsletter Sub & Button */}
        </>

    );
}