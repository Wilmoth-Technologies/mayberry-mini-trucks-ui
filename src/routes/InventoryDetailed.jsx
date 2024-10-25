import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { isStringEmpty, numberFormatter } from '../shared/AppFunctions';
import { CURRENCY_FORMAT_STYLE } from '../shared/AppConstants';
import EmailSubscriptionModal from "../shared/components/modals/EmailSubscriptionModal";
import axiosInstance from "../shared/AxiosConfig";
import SwipeableCarousel from "../shared/components/SwipeableCarousel";
import LoadingNonProvider from "../shared/components/LoadingNonProvider";
import { ErrorAlert } from "../shared/components/ErrorAlert";

export default function InventoryDetailed() {
    const { vin } = useParams();
    const [inventoryData, setInventoryData] = useState([]);
    const [images, setImages] = useState([]);
    const [isError, setError] = useState({ isError: false, errorMessage: "" });
    const [charCount, setCharCount] = useState(0);
    const [isCharCountMaxed, setCharCountMaxed] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const MAX_CHAR_COUNT = 500;

    const updateCharCounter = (event) => {
        setCharCount(event.target.value.length);
        setCharCountMaxed(event.target.value.length === MAX_CHAR_COUNT);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/inventory/getInventoryItem', { params: { vin: vin } });
                setInventoryData(response.data[0]);

                const { data } = await axiosInstance.get('/inventory/getInventoryItemPhotos', { params: { vin: vin } });
                const imageObjects = data.map((img, index) => {
                    // Convert binary data back into a Blob for preview
                    const byteCharacters = img.binaryData.map(b => String.fromCharCode(parseInt(b, 10))).join('');
                    const byteNumbers = Array.from(byteCharacters).map(c => c.charCodeAt(0));
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: img.contentType });
                    const file = new File([blob], `image-${index}`, { type: img.contentType });
                    const preview = URL.createObjectURL(blob);

                    return { file, preview };
                });

                setImages((prevFiles) => [...prevFiles, ...imageObjects]);

                setError({ isError: false });
            } catch (error) {
                setError({ isError: true, errorMessage: `Failed to Load Inventory Data for Vehicle: ${vin}, Please Try Again.` });
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
            {isError.isError ?
                <div className="px-3 pt-3">
                    <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError} />
                </div> : null
            }
            <div className="grid p-3 gap-3 md:grid-cols-2">
                <Link to={'/inventory'} className="flex items-center md:col-span-2">
                    <IoArrowBackOutline />
                    <p>Back to Inventory</p>
                </Link>
                {inventoryData.status === "Pending Sale" ? <h1 className="md:col-span-2 bg-red-400 text-center font-bold">Pending Sale</h1> : null}
                <div className="flex justify-between md:hidden">
                    <h2 className="text-xl font-semibold">{inventoryData.year} {inventoryData.make} {inventoryData.model}</h2>
                    <h2 className="text-xl font-semibold text-action-yellow">{numberFormatter(CURRENCY_FORMAT_STYLE, 2).format(inventoryData.price)}</h2>
                </div>
                {inventoryData.titleInHand ? <h2 className="md:hidden text-action-yellow text-lg font-semibold text-center">Title in Hand</h2> : null}
                <div className="h-72 sm:h-64 md:h-[400px]">
                    <SwipeableCarousel images={images?.map(file => { return file.preview })} />
                </div>
                <div className="hidden md:grid md:grid-cols-2 md:gap-x-8">
                    <h2 className="text-3xl font-semibold col-span-2 text-center">{inventoryData.year} {inventoryData.make} {inventoryData.model}</h2>
                    <h2 className={"text-2xl font-semibold text-action-yellow col-span-2 text-center " + (inventoryData.titleInHand ? '' : 'pb-8')}>{numberFormatter(CURRENCY_FORMAT_STYLE, 2).format(inventoryData.price)}</h2>
                    {inventoryData.titleInHand ? <h2 className="text-action-yellow text-lg font-semibold col-span-2 text-center">Title in Hand</h2> : null}
                    <h2 className="text-xl font-medium col-span-2 text-center">Contact for a Viewing or Test Drive</h2>
                    <div className="grid grid-cols-2 gap-2 text-center col-span-2">
                        <label className="grid grid-cols-2 col-span-2 gap-2">
                            <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="First Name*" type="text" required name="firstName" />
                            <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Last Name*" type="text" required name="lastName" />
                            <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Email*" type="email" required name="email" />
                            <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Phone*" type="tel" required name="phone" />
                            <textarea className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 col-span-2 resize-y" maxLength={MAX_CHAR_COUNT} placeholder="Contact Request Details*" type="text" required name="contactRequestDetails" onChange={(event) => updateCharCounter(event)} />
                        </label>
                        <p className={"col-span-2 text-end -my-2 text-xs " + (isCharCountMaxed ? 'text-red-600' : 'text-gray-text')}>{charCount}/{MAX_CHAR_COUNT}</p>
                        <div className="col-span-2 justify-center">
                            <button className="bg-black text-white rounded-full px-3 py-1 shadow-md">
                                Contact Seller
                            </button>
                        </div>
                    </div>
                </div>
                <h2 className="text-xl font-semibold md:col-span-2">Key Specs</h2>
                <div className="grid grid-cols-2 gap-2 navLineWrapEnd:grid-cols-4 navLineWrapEnd:col-span-2 fourInventoryColBreakPoint:grid-flow-col fourInventoryColBreakPoint:col-span-2">
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventoryData.make}</p>
                        <p className="text-gray-text font-light text-sm">Make</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventoryData.model}</p>
                        <p className="text-gray-text font-light text-sm">Model</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventoryData.year}</p>
                        <p className="text-gray-text font-light text-sm">Year</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg font-sem">40,087 mi</p>
                        <p className="text-gray-text font-light text-sm">Mileage</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventoryData.exteriorColor}</p>
                        <p className="text-gray-text font-light text-sm">Exterior Color</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventoryData.interiorColor}</p>
                        <p className="text-gray-text font-light text-sm">Interior Color</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventoryData.engine}</p>
                        <p className="text-gray-text font-light text-sm">Engine</p>
                    </div>
                    <div className="border border-border-gray rounded-md px-2 py-1">
                        <p className="text-lg">{inventoryData.transmission}</p>
                        <p className="text-gray-text font-light text-sm">Transmission</p>
                    </div>
                    {
                        inventoryData.options?.map(option => (
                            <div key={option.option} className="border border-border-gray rounded-md px-2 py-1">
                                <p className="text-lg">{option.option}</p>
                                <p className="text-gray-text font-light text-sm">Option</p>
                            </div>
                        ))
                    }
                </div>
                <div className="grid grid-cols-2 gap-2 text-center md:hidden">
                    <p className="col-span-2 text-xl font-semibold">Contact for a Viewing or Test Drive</p>
                    <label className="grid grid-cols-2 col-span-2 gap-2">
                        <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="First Name*" type="text" required name="firstName" />
                        <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Last Name*" type="text" required name="lastName" />
                        <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Email*" type="email" required name="email" />
                        <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Phone*" type="tel" required name="phone" />
                        <textarea className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 col-span-2 resize-y" maxLength={MAX_CHAR_COUNT} placeholder="Contact Request Details*" type="text" required name="contactRequestDetails" onChange={(event) => updateCharCounter(event)} />
                    </label>
                    <p className={"col-span-2 text-end -my-2 text-xs " + (isCharCountMaxed ? 'text-red-600' : 'text-gray-text')}>{charCount}/{MAX_CHAR_COUNT}</p>
                    <div className="col-span-2 flex justify-center">
                        <button className="bg-black text-white rounded-full px-3 py-1">
                            Contact Seller
                        </button>
                    </div>
                </div>
                <p className="text-xl font-semibold md:col-span-2">Description</p>
                <p className="md:col-span-2">{inventoryData.description}</p>

                {'embeddedVideoLink' in inventoryData && !isStringEmpty(inventoryData.embeddedVideoLink) ? <div className="relative mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl aspect-video md:col-span-2">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={inventoryData.embeddedVideoLink}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div> : null}

                {/* Newsletter Sub & Button */}
                {/* TODO: Move to Main and then render based on what route we are currently on... */}
                <div className="grid place-content-center p-3 md:col-span-2">
                    <div className="flex text-center gap-3 items-center">
                        <p className="font-medium">Subscribe to learn about new arrivals and our latest news</p>
                        <button className="bg-black rounded-full text-white text-center items-center font-medium text-nowrap px-4 h-8" onClick={() => setModalOpen(true)}>
                            STAY IN TOUCH
                        </button>
                    </div>
                </div>
                {modalOpen && <EmailSubscriptionModal onClose={() => setModalOpen(false)} />}
            </div>
        </>
    );
};