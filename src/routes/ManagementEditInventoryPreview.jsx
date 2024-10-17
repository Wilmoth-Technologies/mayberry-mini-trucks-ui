import { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { Carousel } from "flowbite-react";
import { numberFormatter } from '../shared/AppFunctions';
import { CURRENCY_FORMAT_STYLE } from '../shared/AppConstants';
import { useParams } from 'react-router-dom';


export default function ManagementEditInventoryPreview() {

    const [charCount, setCharCount] = useState(0);
    const [isCharCountMaxed, setCharCountMaxed] = useState(false);
    const MAX_CHAR_COUNT = 500;
    const props = {
        "title": "1994 Honda Attack",
        "price": 6800,
        "mileage": 56000,
    };
    const { vin } = useParams();

    const updateCharCounter = (event) => {
        setCharCount(event.target.value.length);
        setCharCountMaxed(event.target.value.length === MAX_CHAR_COUNT);
    };

    return (
        <div className="grid p-3 gap-3 md:grid-cols-2">
            <div className="hidden md:flex items-center md:col-span-2 justify-center gap-4">
                <Link to="/management/view" className="flex items-center gap-1 lg:bg-black rounded-full lg:text-white px-4 h-8 fourInventoryColBreakPoint:text-sm">
                    <IoArrowBackOutline />
                    Back to Edit Inventory
                </Link>
                <h2 className="font-bold text-2xl text-action-yellow">
                    Edit Inventory - {vin} - Preview
                </h2>
                <button className="flex items-center gap-1 lg:bg-black rounded-full lg:text-white px-4 h-8 fourInventoryColBreakPoint:text-sm">
                    Submit Inventory Update
                    <IoArrowForwardOutline />
                </button>
            </div>
            <div className="grid grid-cols-2 md:hidden items-center justify-center">
                <Link to="/management/view" className="flex items-center text-sm">
                    <IoArrowBackOutline />
                    Back to Edit Inventory
                </Link>
                <button className="flex items-center justify-end text-sm">
                    Submit Inventory Update
                    <IoArrowForwardOutline />
                </button>
                <h2 className="col-span-2 font-bold text-lg text-action-yellow text-center">
                    Edit Inventory
                </h2>
                <h2 className="col-span-2 font-bold text-lg text-action-yellow text-center">
                    {vin}
                </h2>
                <h2 className="col-span-2 font-bold text-lg text-action-yellow text-center">
                    Preview
                </h2>
            </div>
            <div className="flex justify-between md:hidden">
                <h2 className="text-xl font-semibold">{props.title}</h2>
                <h2 className="text-xl font-semibold text-action-yellow">{numberFormatter(CURRENCY_FORMAT_STYLE, 2).format(props.price)}</h2>
            </div>
            <div className="h-72 sm:h-64 md:h-[400px]">
                <Carousel pauseOnHover leftControl rightControl>
                    <img className="object-scale-down" src="/HondaForCarousel.jpg" alt="..." />
                    <img className="object-scale-down" src="/HondaForCarousel2.jpg" alt="..." />
                    <img className="object-scale-down" src="/HondaForCarousel3.jpg" alt="..." />
                    <img className="object-scale-down" src="/HondaForCarousel4.jpg" alt="..." />
                    <img className="object-scale-down" src="/HondaForCarousel5.jpg" alt="..." />
                </Carousel>
            </div>
            <div className="hidden md:grid md:grid-cols-2 md:gap-x-8">
                <h2 className="text-3xl font-semibold col-span-2 text-center">{props.title}</h2>
                <h2 className="text-2xl font-semibold text-action-yellow col-span-2 text-center pb-8">{numberFormatter(CURRENCY_FORMAT_STYLE, 2).format(props.price)}</h2>
                <h2 className="text-xl font-medium col-span-2 text-center">Contact for a Viewing or Test Drive</h2>
                <div className="grid grid-cols-2 gap-2 text-center col-span-2">
                    <label className="grid grid-cols-2 col-span-2 gap-2">
                        <input disabled className="disabled:line-through placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="First Name*" type="text" required name="firstName" />
                        <input disabled className="disabled:line-through placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Last Name*" type="text" required name="lastName" />
                        <input disabled className="disabled:line-through placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Email*" type="email" required name="email" />
                        <input disabled className="disabled:line-through placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Phone*" type="tel" required name="phone" />
                        <textarea disabled className="disabled:line-through placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 col-span-2 resize-y" maxLength={MAX_CHAR_COUNT} placeholder="Contact Request Details*" type="text" required name="contactRequestDetails" onChange={(event) => updateCharCounter(event)} />
                    </label>
                    <p className={"col-span-2 text-end -my-2 text-xs " + (isCharCountMaxed ? 'text-red-600' : 'text-gray-text')}>{charCount}/{MAX_CHAR_COUNT}</p>
                    <div className="col-span-2 justify-center">
                        <button disabled className="disabled:bg-gray-300 bg-black text-white rounded-full px-3 py-1 shadow-md">
                            Contact Seller
                        </button>
                    </div>
                </div>
            </div>
            <h2 className="text-xl font-semibold md:col-span-2">Key Specs</h2>
            <div className="grid grid-cols-2 gap-2 navLineWrapEnd:grid-cols-4 navLineWrapEnd:col-span-2 fourInventoryColBreakPoint:grid-flow-col fourInventoryColBreakPoint:col-span-2">
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">Honda</p>
                    <p className="text-gray-text font-light text-sm">Make</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">Attack</p>
                    <p className="text-gray-text font-light text-sm">Model</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">1994</p>
                    <p className="text-gray-text font-light text-sm">Year</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg font-sem">40,087 mi</p>
                    <p className="text-gray-text font-light text-sm">Mileage</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">White</p>
                    <p className="text-gray-text font-light text-sm">Exterior Color</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">Grey</p>
                    <p className="text-gray-text font-light text-sm">Interior Color</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">3cyl 660cc Gas</p>
                    <p className="text-gray-text font-light text-sm">Engine</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">4x4</p>
                    <p className="text-gray-text font-light text-sm">Options</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">4 Speed Manual</p>
                    <p className="text-gray-text font-light text-sm">Transmission</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center md:hidden">
                <p className="col-span-2 text-xl font-semibold">Contact for a Viewing or Test Drive</p>
                <label className="grid grid-cols-2 col-span-2 gap-2">
                    <input disabled className="disabled:line-through placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="First Name*" type="text" required name="firstName" />
                    <input disabled className="disabled:line-through placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Last Name*" type="text" required name="lastName" />
                    <input disabled className="disabled:line-through placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Email*" type="email" required name="email" />
                    <input disabled className="disabled:line-through placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Phone*" type="tel" required name="phone" />
                    <textarea disabled className="disabled:line-through placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 col-span-2 resize-y" maxLength={MAX_CHAR_COUNT} placeholder="Contact Request Details*" type="text" required name="contactRequestDetails" onChange={(event) => updateCharCounter(event)} />
                </label>
                <p className={"col-span-2 text-end -my-2 text-xs " + (isCharCountMaxed ? 'text-red-600' : 'text-gray-text')}>{charCount}/{MAX_CHAR_COUNT}</p>
                <div className="col-span-2 flex justify-center">
                    <button disabled className="disabled:bg-gray-300 bg-black text-white rounded-full px-3 py-1">
                        Contact Seller
                    </button>
                </div>
            </div>
            <p className="text-xl font-semibold md:col-span-2">Description</p>
            <p className="md:col-span-2">Stock #S27095-ACRR104 Street Legal Suzuki Mini Truck. This truck has 4x4, 5sp with only 12,079 miles. This truck is in great condition and has been well maintained. Pictured are some scratches with flash rust on the headache rack, tailgate and doors, and some pebble marks with flash rust on the front of the cab. Aside from this, the truck is in great shape and runs well. The cabin heat works well and will keep you warm this winter! It has been completely serviced with full synthetic motor oil, oil filter, and air filter. All other fluids are checked and serviced. We have strict guidelines for purchasing in Japan, so the vehicles that we sell are tight and ready for many years of reliable performance. This truck is ideal for off-road use, farming, hunting, or a warm trip to the store after it snows! This clean NC title has been applied for, and is expected to arrive within 6 to 8 weeks of application.</p>
            <p className="md:col-span-2">Mayberry Mini Trucks is responsible for mini trucks being street legal in North Carolina. We introduced the legislation and petitioned the governor to sign the bill into law. The NCDMV special titles department requires 8 to 10 weeks to process a title. Mayberry Mini Trucks will follow up with the NCDMV on a regular basis, to make sure the process is completed as soon as administratively feasible.
                While many states will transfer a North Carolina title and allow mini trucks to be driven on their roadways, Mayberry Mini Trucks, Inc. makes no claims and bears no responsibility regarding which states will or will not allow mini trucks to operate on their roadways.</p>
        </div>
    );
};