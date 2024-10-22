import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { Carousel } from "flowbite-react";
import { numberFormatter, milageFormatter } from '../shared/AppFunctions';
import { CURRENCY_FORMAT_STYLE } from '../shared/AppConstants';
import { useParams } from 'react-router-dom';
import axiosInstance from "../shared/AxiosConfig";
import { ErrorAlert } from "../shared/components/ErrorAlert";
import { useLoading } from "../shared/providers/Loading";

export default function ManagementEditInventoryPreview() {
    const { showLoading, hideLoading, isLoading } = useLoading();
    const [charCount, setCharCount] = useState(0);
    const [isCharCountMaxed, setCharCountMaxed] = useState(false);
    const [inventory, setInventory] = useState({});
    const [isError, setError] = useState({ isError: false, errorMessage: "" });
    const MAX_CHAR_COUNT = 500;
    const { vin } = useParams();

    const updateCharCounter = (event) => {
        setCharCount(event.target.value.length);
        setCharCountMaxed(event.target.value.length === MAX_CHAR_COUNT);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoading();
                const response = await axiosInstance.get('/management/getInventoryItem', { params: { vin: vin } });
                const inventoryItem = response.data.map(inventoryItem => {
                    return {
                        ...inventoryItem,
                        price: numberFormatter(CURRENCY_FORMAT_STYLE, 2).format(inventoryItem.price),
                        mileage: (milageFormatter().format(inventoryItem.mileage).toString() + ' mi'),
                    }
                })[0];
                setInventory(inventoryItem);
                setError({ isError: false });
            } catch (error) {
                setError({ isError: true, errorMessage: "Failed to Load Inventory Item: " + vin + ", Please Try Again." });
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {
                hideLoading();
            }
        };

        fetchData();
    }, []);

    if (!isLoading) {
        return (
            <div className="grid p-3 gap-3 md:grid-cols-2">
                {isError.isError ?
                    <div className="md:col-span-2">
                        <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError}/>
                    </div> : null}
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
                    <h2 className="text-xl font-semibold">{inventory.year} {inventory.make} {inventory.model}</h2>
                    <h2 className="text-xl font-semibold text-action-yellow">{inventory.price}</h2>
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
                    <h2 className="text-3xl font-semibold col-span-2 text-center">{inventory.year} {inventory.make} {inventory.model}</h2>
                    <h2 className="text-2xl font-semibold text-action-yellow col-span-2 text-center pb-8">{inventory.price}</h2>
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
                        <p className="text-lg">{inventory.make}</p>
                        <p className="text-gray-text font-light text-sm">Make</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventory.model}</p>
                        <p className="text-gray-text font-light text-sm">Model</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventory.year}</p>
                        <p className="text-gray-text font-light text-sm">Year</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg font-sem">{inventory.mileage}</p>
                        <p className="text-gray-text font-light text-sm">Mileage</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventory.exteriorColor}</p>
                        <p className="text-gray-text font-light text-sm">Exterior Color</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventory.interiorColor}</p>
                        <p className="text-gray-text font-light text-sm">Interior Color</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventory.engine}</p>
                        <p className="text-gray-text font-light text-sm">Engine</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">4x4</p>
                        <p className="text-gray-text font-light text-sm">Options</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventory.transmission}</p>
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
                <p className="md:col-span-2">{inventory.description}</p>
            </div>
        );
    }
};