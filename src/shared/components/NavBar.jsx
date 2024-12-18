import { useRef, useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useClickOutside } from "../hooks/UseClickOutside";
import { Outlet, Link, useLocation } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { useLoading } from "../providers/Loading";
import ScrollToTop from "./ScrollToTop";
import { getCurrentDate } from "../AppFunctions";
import { GeneralAlert } from "./GeneralAlert";
import LoadingNonProvider from "./LoadingNonProvider";
import axiosInstance from "../AxiosConfig";

export default function NavBar() {
    const location = useLocation();
    const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
    const [isBurgerOpen, setBurgerOpen] = useState(false);
    const [userPermissions, setUserPermissions] = useState([]);
    const { showLoading, hideLoading } = useLoading();
    const [isGeneralAlert, setGeneralAlert] = useState({ isAlertOpen: false, message: "" });
    const [notificationList, setNotificationList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const mobileBurgerClick = () => {
        setBurgerOpen(prevBurgerState => !prevBurgerState);
    };

    const wrapperRef = useRef("NavBar");
    useClickOutside(wrapperRef, () => {
        setBurgerOpen(false);
    })

    let logoHeaderTextColor = "text-white";
    let inventoryBgColor = "bg-white";
    let inventoryTextColor = "text-white";
    let contactUsTextColor = "text-white";
    let testimonialsTextColor = "text-white";
    let faqTextColor = "text-white";
    if (location.pathname.includes("/inventory/")) {
        inventoryBgColor = "bg-black";
        logoHeaderTextColor = "text-black";
        inventoryTextColor = "text-action-yellow";
        contactUsTextColor = "text-black";
        testimonialsTextColor = "text-black";
        faqTextColor = "text-black";
    } else if (location.pathname.includes("/inventory")) {
        inventoryTextColor = "text-action-yellow";
        inventoryBgColor = "bg-white";
        logoHeaderTextColor = "text-white";
    } else if (location.pathname.includes("/contact")) {
        inventoryBgColor = "bg-black";
        logoHeaderTextColor = "text-black";
        inventoryTextColor = "text-black";
        contactUsTextColor = "text-action-yellow";
        testimonialsTextColor = "text-black";
        faqTextColor = "text-black";
    } else if (location.pathname.includes("/testimonials")) {
        inventoryBgColor = "bg-black";
        logoHeaderTextColor = "text-black";
        inventoryTextColor = "text-black";
        contactUsTextColor = "text-black";
        testimonialsTextColor = "text-action-yellow";
        faqTextColor = "text-black";
    } else if (location.pathname.includes("/faq")) {
        inventoryBgColor = "bg-black";
        logoHeaderTextColor = "text-black";
        inventoryTextColor = "text-black";
        contactUsTextColor = "text-black";
        testimonialsTextColor = "text-black";
        faqTextColor = "text-action-yellow";
    } else if (location.pathname.includes("/unauthorized") ||
        location.pathname.includes("/management/add") ||
        location.pathname.includes("/management/view") ||
        location.pathname.includes("/management/edit/") ||
        location.pathname.includes("/management/schedule/banners") ||
        location.pathname.includes("/management/email/list") ||
        location.pathname.includes("/contact") ||
        location.pathname.includes("/faq") ||
        location.pathname.includes("/testimonials") ||
        location.pathname.includes("/lenders")) {
        inventoryBgColor = "bg-black";
        logoHeaderTextColor = "text-black";
        inventoryTextColor = "text-black";
        contactUsTextColor = "text-black";
        testimonialsTextColor = "text-black";
        faqTextColor = "text-black";
    } else if (location.pathname.includes("/unsubscribed")) {
        inventoryBgColor = "bg-white";
        logoHeaderTextColor = "text-white";
    }

    const handleAuth = () => {
        if (isAuthenticated) {
            logout({ logoutParams: { returnTo: window.location.origin } });
        } else {
            loginWithRedirect();
        }
    };

    useEffect(() => {
        const fetchPermissions = async () => {
            if (isAuthenticated) {
                try {
                    showLoading();
                    const accessToken = await getAccessTokenSilently({
                        authorizationParams: {
                            audience: 'https://service.mayberryminitrucks.com/',
                        }
                    });
                    const decodedToken = jwtDecode(accessToken);
                    const permissions = decodedToken.permissions;
                    setUserPermissions(permissions);
                    hideLoading();
                } catch (error) {
                    console.error('Error fetching permissions in NavBar:', error);
                    hideLoading();
                }
            }
        };

        fetchPermissions();
    }, [isAuthenticated, getAccessTokenSilently]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const notificationResponse = await axiosInstance.get('/notification/getNotification', { params: { date: getCurrentDate() } });
                setNotificationList(notificationResponse.data);
                if (notificationResponse.data.length) {
                    setGeneralAlert({ isAlertOpen: true, message: notificationResponse.data[0].description })
                }
            } catch (error) {
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     // Fetch CSRF token when app initializes
    //     const fetchCsrfToken = async () => {
    //         try {
    //             await axiosInstance.get('/csrfToken');
    //         } catch (error) {
    //             console.error('Error fetching CSRF token:', error);
    //         }
    //     };

    //     fetchCsrfToken();
    // }, []);

    return (
        <>
            {isLoading ? <LoadingNonProvider /> : null}
            <ScrollToTop />
            <nav className='flex flex-row pt-4 md:text-center z-30 sticky' ref={wrapperRef}>
                <button className={'basis-1/6 text-center my-auto ' + (isBurgerOpen ? 'hidden' : 'md:block')} onClick={() => mobileBurgerClick()}>
                    <div className={'burger w-8 h-1 rounded-xl my-1.5 ml-4 md:ml-12 ' + inventoryBgColor} />
                    <div className={'burger w-8 h-1 rounded-xl my-1 ml-4 md:ml-12 ' + inventoryBgColor} />
                </button>
                <Link to='/inventory' className={"hidden basis-1/6 text-xl lg:text-2xl font-medium my-auto " + (isBurgerOpen ? '' : 'md:block ') + inventoryTextColor}>
                    Inventory
                </Link>
                <Link to='/contact' className={"hidden basis-1/6 text-xl lg:text-2xl font-medium my-auto " + (isBurgerOpen ? '' : 'md:block ') + contactUsTextColor}>
                    Contact Us
                </Link>
                <Link to='/' className={"font-semibold text-3xl navLineWrapEnd:text-2xl navLineWrapStart:text-4xl 2xl:text-4xl my-auto " + (isBurgerOpen ? 'hidden md:block md:basis-full ' : 'basis-5/6 md:basis-2/6 ') + logoHeaderTextColor}>
                    Mayberry Mini Trucks
                </Link>
                <Link to='/testimonials' className={"hidden basis-1/6 text-xl lg:text-2xl font-medium my-auto " + (isBurgerOpen ? '' : 'md:block ') + testimonialsTextColor}>
                    Testimonials
                </Link>
                <Link to='/faq' className={"hidden basis-1/6 text-xl lg:text-2xl font-medium my-auto " + (isBurgerOpen ? '' : 'md:block ') + faqTextColor}>
                    FAQ
                </Link>
                <div className={'hidden basis-1/6 ' + (isBurgerOpen ? '' : 'md:block my-auto')}>
                    <Link to='/management' className={"flex justify-center " + (userPermissions.includes('manage:inventory') ? '' : 'hidden')}>
                        <IoSettingsSharp className="text-action-yellow text-3xl" />
                    </Link>
                </div>
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
                        <Link to='/inventory' className="w-full py-6" onClick={() => mobileBurgerClick()}>
                            Inventory
                        </Link>
                        <Link to='/testimonials' className="w-full py-6" onClick={() => mobileBurgerClick()}>
                            Testimonials
                        </Link>
                        <Link to='/faq' className="w-full py-6" onClick={() => mobileBurgerClick()}>
                            FAQ
                        </Link>
                        <Link to='/contact' className="w-full py-6" onClick={() => mobileBurgerClick()}>
                            Contact Us
                        </Link>
                        <Link to='/lenders' className="w-full py-6" onClick={() => mobileBurgerClick()}>
                            Auto Lenders
                        </Link>
                        <a className="w-full py-6" href="https://www.lulu.com/spotlight/tkojames" target="_blank" rel="noopener noreferrer" onClick={() => mobileBurgerClick()}>
                            Manuals
                        </a>
                        <button onClick={() => handleAuth()} className="w-full py-6">
                            {isAuthenticated ? 'Logout' : 'Log In'}
                        </button>
                        <Link to='/management' className={"text-action-yellow py-6 " + (userPermissions.includes('manage:inventory') ? '' : 'hidden')} onClick={() => mobileBurgerClick()}>
                            Management Menu
                        </Link>
                    </nav>
                </div>
            </nav>
            {isGeneralAlert.isAlertOpen ?
                <div className="absolute -top-4 left-0 right-0 pt-20 z-20 px-3 pb-2">
                    <GeneralAlert message={notificationList[0].description} dismissFunction={setGeneralAlert} />
                </div> : null}
            <Outlet />
        </>
    )
}