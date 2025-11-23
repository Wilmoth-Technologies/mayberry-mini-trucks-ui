import { useState, useEffect } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { numberFormatter, milageFormatter, isStringEmpty } from '../../AppFunctions';
import { CURRENCY_FORMAT_STYLE } from '../../AppConstants';
import SwipeableCarousel from "../SwipeableCarousel";
import axiosInstance from "../../AxiosConfig";
import { useLoading } from "../../providers/Loading";
import { ErrorAlert } from "../ErrorAlert";
import { useNavigate } from 'react-router-dom';
import { useAccessToken } from "../../hooks/UseAccessToken";

export default function ManagementPreviewInventory({ formValues, selectedOptions, selectedFiles, setPreviewRendered, isAddInventory = true, areImagesUpdated = false, existingInventoryData = {} }) {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const [isError, setError] = useState({ isError: false, errorMessage: "" });
    const [charCount, setCharCount] = useState(0);
    const [isCharCountMaxed, setCharCountMaxed] = useState(false);
    const MAX_CHAR_COUNT = 500;

    const updateCharCounter = (event) => {
        setCharCount(event.target.value.length);
        setCharCountMaxed(event.target.value.length === MAX_CHAR_COUNT);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getAccessToken = useAccessToken();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            showLoading();
            const optionsList = selectedOptions?.map(option => {
                return { "option": option };
            })
            formValues.options = optionsList;

            const formData = new FormData();
            if (!isAddInventory && !areImagesUpdated) {
                formValues['imageLinks'] = existingInventoryData[0]?.imageLinks;
                formData.append('inventory', JSON.stringify(formValues));
            } else {
                formData.append('inventory', JSON.stringify(formValues));
            }

            // Append files to the form data (allowing multiple files)
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('image', selectedFiles[i].file);
            }

            const token = await getAccessToken();

            if (isAddInventory) {
                const response = await axiosInstance.post('/management/addInventory', formData, {
                    timeout: 120000,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 201) {
                    const formData = {
                        vin: formValues.vin,
                        message: "Successfully Added New Inventory Item: ",
                    };
                    navigate('/management', { state: { formData } });
                } else {
                    setError({ isError: true, errorMessage: "Failed to Submit Inventory, Please Try Again." });
                }
            } else {
                const response = await axiosInstance.put('/management/updateInventory', formData, {
                    timeout: 120000,
                    params: { areImagesUpdated: areImagesUpdated },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 204) {
                    const formData = {
                        vin: formValues.vin,
                        message: "Successfully Updated Inventory Item: ",
                    };
                    navigate('/management', { state: { formData } });
                } else {
                    setError({ isError: true, errorMessage: "Failed to Submit Inventory, Please Try Again." });
                }
            }
            setError({ isError: false });
        } catch (error) {
            setError({ isError: true, errorMessage: "Failed to Submit Inventory, Please Try Again." });
            console.error(error.response
                ? error.response.data.message
                : error.message)
        } finally {
            hideLoading();
        }
    };

    return (
        <div className="grid p-3 gap-3 md:grid-cols-2">
            {isError.isError ?
                <div className="md:col-span-2">
                    <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError} />
                </div> : null}
            <div className="hidden md:flex items-center md:col-span-2 justify-center gap-4">
                <button onClick={() => setPreviewRendered(false)} className="flex items-center gap-1 bg-black rounded-full text-white px-4 h-8 fourInventoryColBreakPoint:text-sm">
                    <IoArrowBackOutline />
                    Back to {isAddInventory ? 'Add' : 'Edit'} Inventory
                </button>
                <h2 className="font-bold text-2xl text-action-yellow">
                    {isAddInventory ? 'Add' : 'Edit'} Inventory - {formValues.vin} - Preview
                </h2>
                <button onClick={handleSubmit} className="flex items-center gap-1 bg-black rounded-full text-white px-4 h-8 fourInventoryColBreakPoint:text-sm">
                    {isAddInventory ? 'Submit' : 'Update'} Inventory
                    <IoArrowForwardOutline />
                </button>
            </div>
            <div className="grid grid-cols-2 md:hidden items-center justify-center">
                <button onClick={() => setPreviewRendered(false)} className="flex items-center text-sm">
                    <div className="flex bg-black rounded-full text-white items-center px-4 h-8">
                        <IoArrowBackOutline />
                        Back to {isAddInventory ? 'Add' : 'Edit'}
                    </div>
                </button>
                <button onClick={handleSubmit} className="flex items-center justify-end text-sm">
                    <div className="flex bg-black rounded-full text-white items-center px-4 h-8">
                        {isAddInventory ? 'Submit' : 'Update'} Inventory
                        <IoArrowForwardOutline />
                    </div>
                </button>
                <h2 className="col-span-2 font-bold text-lg text-action-yellow text-center">
                    {isAddInventory ? 'Add' : 'Edit'} Inventory
                </h2>
                <h2 className="col-span-2 font-bold text-lg text-action-yellow text-center">
                    {formValues.vin}
                </h2>
                <h2 className="col-span-2 font-bold text-lg text-action-yellow text-center">
                    Preview
                </h2>
            </div>
            {formValues.status === "Pending Sale" ? <h1 className="md:col-span-2 bg-red-400 text-center font-bold">Pending Sale</h1> : null}
            <div className="flex justify-between md:hidden">
                <h2 className="text-xl font-semibold">{formValues.year} {formValues.make} {formValues.model}</h2>
                <h2 className="text-xl font-semibold text-action-yellow">{numberFormatter(CURRENCY_FORMAT_STYLE, 2).format(formValues.price)}</h2>
            </div>
            {formValues.titleInHand ? <h2 className="md:hidden text-action-yellow text-lg font-semibold text-center">Title in Hand</h2> : null}
            <div className="h-72 sm:h-64 md:h-[400px]">
                <SwipeableCarousel images={selectedFiles?.map(file => { return file.preview })} />
            </div>
            <div className="hidden md:grid md:grid-cols-2 md:gap-x-8">
                <h2 className="text-3xl font-semibold col-span-2 text-center">{formValues.year} {formValues.make} {formValues.model}</h2>
                <h2 className={"text-2xl font-semibold text-action-yellow col-span-2 text-center " + (formValues.titleInHand ? '' : 'pb-8')}>{numberFormatter(CURRENCY_FORMAT_STYLE, 2).format(formValues.price)}</h2>
                {formValues.titleInHand ? <h2 className="text-action-yellow text-lg font-semibold col-span-2 text-center">Title in Hand</h2> : null}
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
            <div className="flex justify-between md:col-span-2">
                <h2 className="text-xl font-semibold">Key Specs</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 navLineWrapEnd:grid-cols-4 navLineWrapEnd:col-span-2">
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">{formValues.make}</p>
                    <p className="text-gray-text font-light text-sm">Make</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">{formValues.model}</p>
                    <p className="text-gray-text font-light text-sm">Model</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">{formValues.modelCode}</p>
                    <p className="text-gray-text font-light text-sm">Model Code</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">{formValues.year}</p>
                    <p className="text-gray-text font-light text-sm">Year</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg font-sem">{(milageFormatter().format(formValues.mileage).toString() + ' mi')}</p>
                    <p className="text-gray-text font-light text-sm">Mileage</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">{formValues.exteriorColor}</p>
                    <p className="text-gray-text font-light text-sm">Exterior Color</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">{formValues.interiorColor}</p>
                    <p className="text-gray-text font-light text-sm">Interior Color</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">{formValues.engine}</p>
                    <p className="text-gray-text font-light text-sm">Engine</p>
                </div>
                <div className="border border-border-gray rounded-md px-2 py-1">
                    <p className="text-lg">{formValues.transmission}</p>
                    <p className="text-gray-text font-light text-sm">Transmission</p>
                </div>
                {
                    selectedOptions?.map(option => (
                        <div key={option} className="border border-border-gray rounded-md px-2 py-1">
                            <p className="text-lg">{option}</p>
                            <p className="text-gray-text font-light text-sm">Option</p>
                        </div>
                    ))
                }
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
            <p className="md:col-span-2">{formValues.description}</p>

            {'embeddedVideoLink' in formValues && !isStringEmpty(formValues.embeddedVideoLink) ? <div className="relative mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl aspect-video md:col-span-2">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={formValues.embeddedVideoLink}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div> : null}
        </div>
    );
};