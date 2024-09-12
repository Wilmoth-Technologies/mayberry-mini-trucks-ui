import GoogleReviews from "../shared/components/GoogleReviews.jsx";

export default function Root() {
    return (
        <>
            <div className="bg-mobile-landing-page md:bg-desktop-landing-page md:h-screen h-[600px] bg-cover bg-no-repeat md:-mt-28 bg-top" />
            <h1 className="w-full text-center text-2xl font-semibold pt-2 md:pt-4">About Us</h1>
            <div className="flex flex-col-reverse justify-center sm:flex-row items-center p-6 gap-8">
                <img className="h-[188px] bg-contain bg-no-repeat bg-center" src="/LandingKeiLineUp2.png" />
                <p className="text-lg text-center md:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <GoogleReviews/>
        </>

    );
}