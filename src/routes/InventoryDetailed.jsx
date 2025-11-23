import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { isStringEmpty, numberFormatter } from '../shared/AppFunctions';
import { CURRENCY_FORMAT_STYLE } from '../shared/AppConstants';
import EmailSubscriptionModal from "../shared/components/modals/EmailSubscriptionModal";
import axiosInstance from "../shared/AxiosConfig";
import SwipeableCarousel from "../shared/components/SwipeableCarousel";
import LoadingNonProvider from "../shared/components/LoadingNonProvider";
import { ErrorAlert } from "../shared/components/ErrorAlert";
import { SuccessAlert } from "../shared/components/SuccessAlert";

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
    const [isSuccess, setSuccess] = useState({ isSuccess: false, successMessage: "" });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        description: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isContactUsError, setContactUsError] = useState({ isError: false, errorMessage: "" });
    const [isContactUsSuccess, setContactUsSuccess] = useState({ isSuccess: false, successMessage: "" });
    const navigate = useNavigate();

    const handleBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    const updateCharCounter = (event) => {
        setCharCount(event.target.value.length);
        setCharCountMaxed(event.target.value.length === MAX_CHAR_COUNT);
        handleChange(event);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/inventory/getInventoryItem', { params: { vin: vin } });
                setInventoryData(response.data[0]);

                // Use imageLinks from the inventory response and convert GCS URLs to CDN URLs
                const imageObjects = response.data[0].imageLinks.map((url, index) => {
                    // Replace GCS URL with CDN URL
                    const cdnUrl = url.replace(
                        'https://storage.googleapis.com/mayberry-mini-trucks-inventory-images',
                        'https://cdn.mayberryminitrucks.com'
                    );
                    return { 
                        file: null, // No file object needed for CDN images
                        preview: cdnUrl // Use the CDN URL directly for preview
                    };
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

    // Handles form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Validates the form fields
    const validateForm = () => {
        const newErrors = {};

        // First name and last name should not be empty
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
        }

        // Email is required and must be in a valid format
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Phone is optional but must be in a valid format if provided
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits';
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                setLoading(true);
                const response = await axiosInstance.post('/inventory/contactus', { ...formData, vin: vin });
                setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', description: '' });
                setCharCount(0);
                setCharCountMaxed(false);
                setContactUsError({ isError: false })
                setContactUsSuccess({ isSuccess: true, successMessage: `Successfully sent Contact Request.` });
            } catch (error) {
                setContactUsError({ isError: true, errorMessage: 'Contact Request Failed, Please Try Again.'})
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <>
            {isLoading ? <LoadingNonProvider /> : null}
            {isError.isError ?
                <div className="px-3 pt-3">
                    <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError} />
                </div> : null
            }
            <div className="grid p-3 gap-3 md:grid-cols-2">
                <a href="#" onClick={handleBack} className="flex items-center md:col-span-2">
                    <IoArrowBackOutline />
                    <p>Back to Inventory</p>
                </a>
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
                    <form className="grid grid-cols-2 gap-2 text-center col-span-2" onSubmit={handleSubmit}>
                        <div className="text-left">
                            <label>First name:</label>
                            <input
                                className="w-full placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                placeholder="First Name*"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange} />
                            {formErrors.firstName && <p style={{ color: 'red' }}>{formErrors.firstName}</p>}
                        </div>
                        <div className="text-left">
                            <label>Last name:</label>
                            <input
                                className="w-full placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                placeholder="Last Name*"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange} />
                            {formErrors.lastName && <p style={{ color: 'red' }}>{formErrors.lastName}</p>}
                        </div>
                        <div className="text-left">
                            <label>Email:</label>
                            <input
                                className="w-full placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                placeholder="Email*"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange} />
                            {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
                        </div>
                        <div className="text-left">
                            <label>Phone Number:</label>
                            <input
                                className="w-full placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                placeholder="Phone*"
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange} />
                            {formErrors.phoneNumber && <p style={{ color: 'red' }}>{formErrors.phoneNumber}</p>}
                        </div>
                        <textarea
                            className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 col-span-2 resize-y"
                            maxLength={MAX_CHAR_COUNT}
                            placeholder="Contact Request Details*"
                            required
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={(event) => updateCharCounter(event)} />
                        <p className={"col-span-2 text-end -my-2 text-xs " + (isCharCountMaxed ? 'text-red-600' : 'text-gray-text')}>{charCount}/{MAX_CHAR_COUNT}</p>
                        <div className="col-span-2 justify-center">
                            <button type="submit" className="bg-black text-white rounded-full px-3 py-1 shadow-md">
                                Contact Seller
                            </button>
                        </div>
                        {isContactUsSuccess.isSuccess ?
                            <div className="col-span-2">
                                <SuccessAlert message={isContactUsSuccess.successMessage} dismissFunction={setContactUsSuccess} />
                            </div> : null
                        }
                        {isContactUsError.isError ?
                            <div className="col-span-2">
                                <ErrorAlert errorMessage={isContactUsError.errorMessage} dismissFunction={setContactUsError} />
                            </div> : null
                        }
                    </form>
                </div>
                <h2 className="text-xl font-semibold md:col-span-2">Key Specs</h2> 
                <div className="grid grid-cols-2 gap-2 navLineWrapEnd:grid-cols-4 navLineWrapEnd:col-span-2 fourInventoryColBreakPoint2:grid-flow-col fourInventoryColBreakPoint2:col-span-2">
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
                        <p className="text-lg font-sem">{inventoryData.mileage}</p>
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
                    <form className="grid grid-cols-2 gap-2 text-center col-span-2" onSubmit={handleSubmit}>
                        <div className="text-left">
                            <label>First name:</label>
                            <input
                                className="w-full placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                placeholder="First Name*"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange} />
                            {formErrors.firstName && <p style={{ color: 'red' }}>{formErrors.firstName}</p>}
                        </div>
                        <div className="text-left">
                            <label>Last name:</label>
                            <input
                                className="w-full placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                placeholder="Last Name*"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange} />
                            {formErrors.lastName && <p style={{ color: 'red' }}>{formErrors.lastName}</p>}
                        </div>
                        <div className="text-left">
                            <label>Email:</label>
                            <input
                                className="w-full placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                placeholder="Email*"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange} />
                            {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
                        </div>
                        <div className="text-left">
                            <label>Phone Number:</label>
                            <input
                                className="w-full placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                placeholder="Phone*"
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange} />
                            {formErrors.phoneNumber && <p style={{ color: 'red' }}>{formErrors.phoneNumber}</p>}
                        </div>
                        <textarea
                            className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 col-span-2 resize-y"
                            maxLength={MAX_CHAR_COUNT}
                            placeholder="Contact Request Details*"
                            required
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={(event) => updateCharCounter(event)} />
                        <p className={"col-span-2 text-end -my-2 text-xs " + (isCharCountMaxed ? 'text-red-600' : 'text-gray-text')}>{charCount}/{MAX_CHAR_COUNT}</p>
                        <div className="col-span-2 justify-center">
                            <button type="submit" className="bg-black text-white rounded-full px-3 py-1 shadow-md">
                                Contact Seller
                            </button>
                        </div>
                        {isContactUsSuccess.isSuccess ?
                            <div className="col-span-2">
                                <SuccessAlert message={isContactUsSuccess.successMessage} dismissFunction={setContactUsSuccess} />
                            </div> : null
                        }
                        {isContactUsError.isError ?
                            <div className="col-span-2">
                                <ErrorAlert errorMessage={isContactUsError.errorMessage} dismissFunction={setContactUsError} />
                            </div> : null
                        }
                    </form>
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
                {isSuccess.isSuccess ?
                    <div className="pt-3 col-span-2">
                        <SuccessAlert message={isSuccess.successMessage} dismissFunction={setSuccess} />
                    </div> : null
                }
                <div className="grid place-content-center p-3 md:col-span-2">
                    <div className="flex text-center gap-3 items-center">
                        <p className="font-medium">Subscribe to learn about new arrivals and our latest news</p>
                        <button className="bg-black rounded-full text-white text-center items-center font-medium text-nowrap px-4 h-8" onClick={() => setModalOpen(true)}>
                            STAY IN TOUCH
                        </button>
                    </div>
                </div>
                {modalOpen && <EmailSubscriptionModal onClose={() => setModalOpen(false)} setSuccess={setSuccess} />}
            </div>
        </>
    );
};