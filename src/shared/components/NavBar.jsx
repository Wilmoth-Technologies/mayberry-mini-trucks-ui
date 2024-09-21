import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/UseClickOutside";

export default function NavBar() {

    const [isBurgerOpen, setBurgerOpen] = useState(false);

    const mobileBurgerClick = () => {
        setBurgerOpen(prevBurgerState => !prevBurgerState);
    };

    const wrapperRef = useRef("NavBar");
    useClickOutside(wrapperRef, () => {
        setBurgerOpen(false);
    })

    return (
        <nav className='flex flex-row pt-4 md:text-center z-50 sticky' ref={wrapperRef}>
            <button className={'basis-1/6 text-center my-auto ' + (isBurgerOpen ? 'hidden' : 'md:block')} onClick={() => mobileBurgerClick()}>
                <div className={'burger w-8 h-1 md:bg-white rounded-xl my-1.5 ml-4 md:ml-12' + (window.location.href.includes("/inventory") ? ' bg-white': ' bg-black')} />
                <div className={'burger w-8 h-1 md:bg-white rounded-xl my-1 ml-4 md:ml-12' + (window.location.href.includes("/inventory") ? ' bg-white': ' bg-black')} />
            </button>
            <a href='/inventory' className={"hidden basis-1/6 text-xl lg:text-2xl font-medium my-auto " + (isBurgerOpen ? '' : 'md:block') + (window.location.href.includes("/inventory") ? ' text-black': ' text-white')}>
                Inventory
            </a>
            <a href='/contact' className={"hidden basis-1/6 text-xl lg:text-2xl font-medium my-auto text-white " + (isBurgerOpen ? '' : 'md:block')}>
                Contact Us
            </a>
            <a href='/' className={"font-semibold text-3xl navLineWrapEnd:text-2xl navLineWrapStart:text-4xl 2xl:text-4xl my-auto text-black md:text-white " + (isBurgerOpen ? 'hidden md:block md:basis-full' : 'basis-5/6 md:basis-2/6') + (window.location.href.includes("/inventory") ? ' text-white': ' text-black')}>
                Mayberry Mini Trucks
            </a>
            <a href='/testimonials' className={"hidden basis-1/6 text-xl lg:text-2xl font-medium my-auto text-white " + (isBurgerOpen ? '' : 'md:block')}>
                Testimonials
            </a>
            <a href='/faq' className={"hidden basis-1/6 text-xl lg:text-2xl font-medium my-auto text-white " + (isBurgerOpen ? '' : 'md:block')}>
                FAQ
            </a>
            <div className={'hidden basis-1/6 ' + (isBurgerOpen ? '' : 'md:block')} />
            <div id="mobile-menu" className={"absolute top-0 bg-white bg-opacity-80 w-full md:max-w-96 text-5xl flex-col justify-content-center origin-top animate-open-menu " + (isBurgerOpen ? 'flex' : 'hidden')} >
                <div className="flex flex-row">
                    <button className="basis-1/6 text-5xl self-start pt-2" onClick={() => mobileBurgerClick()}>
                        &times;
                    </button>
                    <a href='/' className={"basis-5/6 text-3xl pt-4 font-semibold " + (isBurgerOpen ? 'md:hidden' : '')}>
                        Mayberry Mini Trucks
                    </a>
                </div>
                <nav className="flex flex-col min-h-screen items-center text-center py-8 text-3xl hover:opacity-80" aria-label="mobile">
                    <a href='/inventory' className="w-full py-6">
                        Inventory
                    </a>
                    <a href='/gallery' className="w-full py-6">
                        Gallery
                    </a>
                    <a href='/testimonials' className="w-full py-6">
                        Testimonials
                    </a>
                    <a href='/nc-titling' className="w-full py-6">
                        NC Titling
                    </a>
                    <a href='/auto-lenders' className="w-full py-6">
                        Auto Lenders
                    </a>
                    <a href='/faq' className="w-full py-6">
                        FAQ
                    </a>
                    <a href='/contact' className="w-full py-6">
                        Contact Us
                    </a>
                    <a href='/log-in' className="w-full py-6">
                        Log In
                    </a>
                </nav>
            </div>
        </nav>
    )
}