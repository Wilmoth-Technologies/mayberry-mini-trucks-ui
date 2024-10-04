import { useRef, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useClickOutside } from "../hooks/UseClickOutside";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function NavBar() {
    const location = useLocation();
    const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();
    const [isBurgerOpen, setBurgerOpen] = useState(false);

    const mobileBurgerClick = () => {
        setBurgerOpen(prevBurgerState => !prevBurgerState);
    };

    const wrapperRef = useRef("NavBar");
    useClickOutside(wrapperRef, () => {
        setBurgerOpen(false);
    })

    let logoHeaderTextColor = "text-black md:text-white";
    let inventoryBgColor = "bg-black md:bg-white";
    let inventoryTextColor = "text-white";
    if (location.pathname.includes("/inventory/")) {
        inventoryBgColor = "bg-black";
        logoHeaderTextColor = "text-black";
        inventoryTextColor = "text-action-yellow";
    } else if (location.pathname.includes("/inventory")) {
        inventoryBgColor = "bg-white";
        logoHeaderTextColor = "text-white";
        inventoryTextColor = "text-black";
    }

    console.log(isLoading);
    console.log(isAuthenticated);
    console.log(error);
    console.log(user);

    const handleAuth = () => {
        if (isAuthenticated) {
            logout({ logoutParams: { returnTo: window.location.origin } });
        } else {
            loginWithRedirect();
        }
    };

    // Auth Error to Trigger React Router Error Page
    if (error) {
        throw new Response("Not Authorized", { status: 401});
    }

    return (
        <>
            <nav className='flex flex-row pt-4 md:text-center z-50 sticky' ref={wrapperRef}>
                <button className={'basis-1/6 text-center my-auto ' + (isBurgerOpen ? 'hidden' : 'md:block')} onClick={() => mobileBurgerClick()}>
                    <div className={'burger w-8 h-1 rounded-xl my-1.5 ml-4 md:ml-12 ' + inventoryBgColor} />
                    <div className={'burger w-8 h-1 rounded-xl my-1 ml-4 md:ml-12 ' + inventoryBgColor} />
                </button>
                <Link to='/inventory' className={"hidden basis-1/6 text-xl lg:text-2xl font-medium my-auto " + (isBurgerOpen ? '' : 'md:block ') + inventoryTextColor}>
                    Inventory
                </Link>
                <Link to='/contact' className={"hidden basis-1/6 text-xl lg:text-2xl font-medium my-auto " + (isBurgerOpen ? '' : 'md:block') + (window.location.href.includes("/inventory/") ? ' text-black' : ' text-white')}>
                    Contact Us
                </Link>
                <Link to='/' className={"font-semibold text-3xl navLineWrapEnd:text-2xl navLineWrapStart:text-4xl 2xl:text-4xl my-auto " + (isBurgerOpen ? 'hidden md:block md:basis-full ' : 'basis-5/6 md:basis-2/6 ') + logoHeaderTextColor}>
                    Mayberry Mini Trucks
                </Link>
                <Link to='/testimonials' className={"hidden basis-1/6 text-xl lg:text-2xl font-medium my-auto " + (isBurgerOpen ? '' : 'md:block') + (window.location.href.includes("/inventory/") ? ' text-black' : ' text-white')}>
                    Testimonials
                </Link>
                <Link to='/faq' className={"hidden basis-1/6 text-xl lg:text-2xl font-medium my-auto " + (isBurgerOpen ? '' : 'md:block') + (window.location.href.includes("/inventory/") ? ' text-black' : ' text-white')}>
                    FAQ
                </Link>
                <div className={'hidden basis-1/6 ' + (isBurgerOpen ? '' : 'md:block')} />
                <div id="mobile-menu" className={"absolute top-0 bg-white bg-opacity-80 w-full md:max-w-96 text-5xl flex-col justify-content-center origin-top animate-open-menu " + (isBurgerOpen ? 'flex' : 'hidden')} >
                    <div className="flex flex-row">
                        <button className="basis-1/6 text-5xl self-start pt-2" onClick={() => mobileBurgerClick()}>
                            &times;
                        </button>
                        <Link to='/' className={"basis-5/6 text-3xl pt-4 font-semibold " + (isBurgerOpen ? 'md:hidden' : '')}>
                            Mayberry Mini Trucks
                        </Link>
                    </div>
                    <nav className="flex flex-col min-h-screen items-center text-center py-8 text-3xl hover:opacity-80" aria-label="mobile">
                        <Link to='/inventory' className="w-full py-6">
                            Inventory
                        </Link>
                        <Link to='/gallery' className="w-full py-6">
                            Gallery
                        </Link>
                        <Link to='/testimonials' className="w-full py-6">
                            Testimonials
                        </Link>
                        <Link to='/nc-titling' className="w-full py-6">
                            NC Titling
                        </Link>
                        <Link to='/Linkuto-lenders' className="w-full py-6">
                            Auto Lenders
                        </Link>
                        <Link to='/faq' className="w-full py-6">
                            FAQ
                        </Link>
                        <Link to='/contact' className="w-full py-6">
                            Contact Us
                        </Link>
                        <button onClick={() => handleAuth()} className="w-full py-6">
                            {isAuthenticated ? 'Logout' : 'Log In'}
                        </button>
                    </nav>
                </div>
            </nav>
            <Outlet />
        </>
    )
}