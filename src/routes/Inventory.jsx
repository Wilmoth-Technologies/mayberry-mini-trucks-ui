import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbTrash } from "react-icons/tb";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import InventoryCard from "../shared/components/inventory/InventoryCard";
import { MAKE_BUTTON, MILEAGE_BUTTON, PRICE_BUTTON, MODEL_BUTTON, YEAR_BUTTON, DRIVE_TRAIN_BUTTON, TRANSMISSION_BUTTON, ENGINE_BUTTON } from "../shared/AppConstants";
import EmailSubscriptionModal from "../shared/components/modals/EmailSubscriptionModal";
import axiosInstance from "../shared/AxiosConfig";
import { ErrorAlert } from "../shared/components/ErrorAlert";
import LoadingNonProvider from "../shared/components/LoadingNonProvider";
import { isStringEmpty } from "../shared/AppFunctions";
import { SuccessAlert } from "../shared/components/SuccessAlert";

export default function Inventory() {
    const [isKeiComparisonOpen, setKeiComparisonOpen] = useState(false);
    const [isMakeFilterOpen, setMakeFilterOpen] = useState(true);
    const [isModelFilterOpen, setModelFilterOpen] = useState(true);
    const [isPriceFilterOpen, setPriceFilterOpen] = useState(true);
    const [isYearFilterOpen, setYearFilterOpen] = useState(true);
    const [isMileageFilterOpen, setMileageFilterOpen] = useState(true);
    const [isEngineFilterOpen, setEngineFilterOpen] = useState(true);
    const [isDriveTrainFilterOpen, setDriveTrainFilterOpen] = useState(true);
    const [isTransmissionFilterOpen, setTransmissionFilterOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [inventoryWithMetaData, setInventoryWithMetaData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState({ isError: false, errorMessage: "" });
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    const itemsPerPage = 24;
    const MAX_CHAR_COUNT = 500;
    const [charCount, setCharCount] = useState(0);
    const [isCharCountMaxed, setCharCountMaxed] = useState(false);
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

    const updateCharCounter = (event) => {
        setCharCount(event.target.value.length);
        setCharCountMaxed(event.target.value.length === MAX_CHAR_COUNT);
        handleChange(event);
    };

    // Handle page click
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Filter items based on the search term
    const filteredDataVins = inventoryWithMetaData.filter(item => Object.values(item).some(value => typeof value == "string" ? value.toLowerCase().includes(search.toLowerCase()) : false)).map(item => item.vin);
    const filteredInventory = inventory.filter(item => filteredDataVins.includes(item.vin))

    // Calculate pagination based on filtered data
    const offset = currentPage * itemsPerPage;
    let currentItems = [];
    let pageCount = 0;
    if (isStringEmpty(search)) {
        currentItems = inventory.slice(offset, offset + itemsPerPage);
        pageCount = Math.ceil(inventory.length / itemsPerPage);
    } else {
        currentItems = filteredInventory.slice(offset, offset + itemsPerPage);
        pageCount = Math.ceil(filteredInventory.length / itemsPerPage);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/inventory/getInventoryMetaData');
                setInventory(response.data);
                const listOfObjectFlattenedMetaData = response?.data.map(item => {
                    //Flatten the options list of object and create elements at the top
                    //level object based on each option + index to allow for searching
                    const optionsObject = item.options.reduce((acc, option, index) => {
                        acc[`option${index}`] = option.option;
                        return acc;
                    }, {});

                    delete item.options;
                    return { ...item, ...optionsObject };
                });
                setInventoryWithMetaData(listOfObjectFlattenedMetaData);

                setError({ isError: false });
            } catch (error) {
                setError({ isError: true, errorMessage: "Failed to Load Inventory Data, Please Try Again." });
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const keiComparisonClick = () => {
        setKeiComparisonOpen(prevKeiComparisonState => !prevKeiComparisonState);
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(0); // Reset to first page on new search
    };

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
                const response = await axiosInstance.post('/inventory/contactus', { ...formData, isFailedFilter: true });
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
            {/* Header Background */}
            <div className="p-3">
                <div className="bg-inventory-kei-banner md:h-[700px] h-[400px] bg-cover bg-no-repeat -mt-14 bg-right md:bg-top drop-shadow-lg"></div>
            </div>

            {/* Kei Truck Comparison DropDown */}
            {isLoading ? <LoadingNonProvider /> : null}
            {isError.isError ?
                <div className="px-3">
                    <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError} />
                </div> : null
            }
            <div className="pb-1">
                <button className="flex px-3 gap-2 largerMobile:gap-4 items-center md:w-full md:justify-center" onClick={() => keiComparisonClick()}>
                    <h2 className="font-medium text-2xl">Kei Truck Comparison</h2>
                    <div className="bg-gray-300 h-0.5 w-16 largerMobile:w-28 md:w-96 rounded-full" />
                    <div className={"w-4 h-4 border-black border-r-2 border-b-2 transform -mt-2 " + (isKeiComparisonOpen ? '-rotate-135 mt-2' : 'rotate-45')} />
                </button>
                <div className={"flex-col border-border-gray border-2 border-t-0 mx-3 px-3 pb-3 overflow-auto " + (isKeiComparisonOpen ? '' : 'hidden')}>
                    <table className="table-auto md:w-full md:justify-center">
                        <thead>
                            <tr className="flex items-center justify-center place-items-center">
                                <th className="h-[150px] w-[190px]"><img className="h-[150px] w-[190px]" src="/Subaru.png" /></th>
                                <th className="h-[150px] w-[190px]"><img className="h-[150px] w-[190px]" src="/Suzuki.png" /></th>
                                <th className="h-[150px] w-[190px]"><img className="h-[150px] w-[190px]" src="/Honda.png" /></th>
                                <th className="h-[150px] w-[190px]"><img className="h-[150px] w-[190px]" src="/Mitsubishi.png" /></th>
                                <th className="h-[150px] w-[190px]"><img className="h-[150px] w-[190px]" src="/Daihatsu.png" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="flex text-center md:w-full md:justify-center">
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Est. Range</h3>
                                        <p>200 mi</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray ">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Est. Range</h3>
                                        <p>200 mi</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Est. Range</h3>
                                        <p>200 mi</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Est. Range</h3>
                                        <p>200 mi</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Est. Range</h3>
                                        <p>200 mi</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className="flex text-center md:w-full md:justify-center">
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Gross Weight</h3>
                                        <p>1,450 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Gross Weight</h3>
                                        <p>1,450 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Gross Weight</h3>
                                        <p>1,450 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Gross Weight</h3>
                                        <p>1,450 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Gross Weight</h3>
                                        <p>1,450 lbs</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className="flex text-center md:w-full md:justify-center">
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Drive Train</h3>
                                        <p>AWD</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Drive Train</h3>
                                        <p>AWD</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Drive Train</h3>
                                        <p>AWD</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Drive Train</h3>
                                        <p>AWD</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Drive Train</h3>
                                        <p>AWD</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className="flex text-center md:w-full md:justify-center">
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Load Capacity</h3>
                                        <p>770 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Load Capacity</h3>
                                        <p>770 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Load Capacity</h3>
                                        <p>770 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Load Capacity</h3>
                                        <p>770 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Load Capacity</h3>
                                        <p>770 lbs</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className="flex text-center md:w-full md:justify-center">
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Dump Offerings?</h3>
                                        <p>Yes</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Dump Offerings?</h3>
                                        <p>Yes</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Dump Offerings?</h3>
                                        <p>Yes</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Dump Offerings?</h3>
                                        <p>Yes</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Dump Offerings?</h3>
                                        <p>Yes</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Filtering Menu Mobile */}
            <div className="flex flex-col px-3 gap-y-1 md:hidden">
                <p className="text-xs font-semibold">{filteredInventory.length} Results</p>
                <div className="flex gap-x-2">
                    <label className="relative block">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <svg className="h-5 w-5 fill-gray-600" viewBox="0 0 20 20"><path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            /></svg>
                        </span>
                        <input
                            onChange={handleSearchChange}
                            value={search}
                            className="placeholder:italic placeholder:text-gray-text block bg-white w-auto largerMobile:w-72 border border-border-gray rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            placeholder="Search Make, Model, or Keyword"
                            type="text"
                            name="search" />
                    </label>
                    <button className="flex items-center text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                        </svg>
                        <p className="pl-2">Filter</p>
                    </button>
                </div>
                <div className="flex gap-2 pt-2 items-center">
                    <button className="border border-border-gray rounded-full text-gray-text py-1 px-3 largerMobile:px-6">Make</button>
                    <button className="border border-border-gray rounded-full text-gray-text py-1 px-3 largerMobile:px-6">Model</button>
                    <button className="border border-border-gray rounded-full text-gray-text py-1 px-3 largerMobile:px-6">Price</button>
                    <button className="flex items-center gap-1">
                        <div className="w-2 h-2 border-black border-r-2 border-b-2 transform rotate-45 -mt-2" />
                        <p>Sort by price</p>
                    </button>
                </div>
            </div>

            {/* Filtering Menu Medium Screens and Above */}
            <div className="hidden md:grid md:grid-cols-[320px_auto] md:px-3 gap-3">
                {/* Filtering */}
                <div className="flex flex-col border border-x-border-gray">
                    <div className="flex w-full p-1 justify-between">
                        <p className="">Filters</p>
                        <button className="flex items-center">
                            <p className="pr-1">Clear All</p>
                            <TbTrash />
                        </button>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={MAKE_BUTTON} className="flex w-full justify-between" onClick={() => setMakeFilterOpen(!isMakeFilterOpen)}>
                            Make
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isMakeFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-3 text-gray-text " + (isMakeFilterOpen ? 'block' : 'hidden')}>
                            <div>
                                <input className="accent-black rounded-sm" type="checkbox" id="honda" />
                                <label className="px-1" htmlFor="honda">Honda</label>
                            </div>
                            <div>
                                <input className="accent-black rounded-sm" type="checkbox" id="suzki" />
                                <label className="px-1" htmlFor="suzki">Suzki</label>
                            </div>
                            <div>
                                <input className="accent-black rounded-sm" type="checkbox" id="daihatsu" />
                                <label className="px-1" htmlFor="daihatsu">Daihatsu</label>
                            </div>
                            <div>
                                <input className="accent-black rounded-sm" type="checkbox" id="mitsubishi" />
                                <label className="px-1" htmlFor="mitsubishi">Mitsubishi</label>
                            </div>
                            <div>
                                <input className="accent-black rounded-sm" type="checkbox" id="subaru" />
                                <label className="px-1" htmlFor="subaru">Subaru</label>
                            </div>
                            <div>
                                <input className="accent-black rounded-sm" type="checkbox" id="toyota" />
                                <label className="px-1" htmlFor="toyota">Toyota</label>
                            </div>
                            <div>
                                <input className="accent-black rounded-sm" type="checkbox" id="mazda" />
                                <label className="px-1" htmlFor="mazda">Mazda</label>
                            </div>
                        </div>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={MODEL_BUTTON} className="flex w-full justify-between" onClick={() => setModelFilterOpen(!isModelFilterOpen)}>
                            Model
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isModelFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={PRICE_BUTTON} className="flex w-full justify-between" onClick={() => setPriceFilterOpen(!isPriceFilterOpen)}>
                            Price
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isPriceFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={YEAR_BUTTON} className="flex w-full justify-between" onClick={() => setYearFilterOpen(!isYearFilterOpen)}>
                            Year
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isYearFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={MILEAGE_BUTTON} className="flex w-full justify-between" onClick={() => setMileageFilterOpen(!isMileageFilterOpen)}>
                            Mileage
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isMileageFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={ENGINE_BUTTON} className="flex w-full justify-between" onClick={() => setEngineFilterOpen(!isEngineFilterOpen)}>
                            Engine
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isEngineFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={DRIVE_TRAIN_BUTTON} className="flex w-full justify-between" onClick={() => setDriveTrainFilterOpen(!isDriveTrainFilterOpen)}>
                            Drive Train
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isDriveTrainFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={TRANSMISSION_BUTTON} className="flex w-full justify-between" onClick={() => setTransmissionFilterOpen(!isTransmissionFilterOpen)}>
                            Transmission
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isTransmissionFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="relative block">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <svg className="h-5 w-5 fill-gray-600" viewBox="0 0 20 20"><path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            /></svg>
                        </span>
                        <input
                            onChange={handleSearchChange}
                            value={search}
                            className="placeholder:italic placeholder:text-gray-text block bg-search-background w-full border border-border-gray rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                            placeholder="Search Make, Model, or Keyword"
                            type="text"
                            name="search" />
                    </label>
                    <p className="text-xs font-semibold">{filteredInventory.length} Results</p>
                    <div className="p-3 rounded-lg grid grid-cols-2 threeInventoryColBreakPoint:grid-cols-3 fourInventoryColBreakPoint:grid-cols-4 fiveInventoryColBreakPoint:grid-cols-5 sixInventoryColBreakPoint:grid-cols-6 eightInventoryColBreakPoint:grid-cols-8 gap-4 place-items-center">
                        {currentItems.length ? currentItems.map((item) => (
                            <Link key={item.vin} to={"/inventory/" + item.vin}>
                                <InventoryCard year={item.year} make={item.make} model={item.model} price={item.price} mileage={item.mileage} status={item.status} imgLink={item.imageLinks} />
                            </Link>
                        )) :
                            <div className="col-span-2 threeInventoryColBreakPoint:col-span-3 fourInventoryColBreakPoint:col-span-4 fiveInventoryColBreakPoint:col-span-5 sixInventoryColBreakPoint:col-span-6 eightInventoryColBreakPoint:col-span-8">
                                <h2 className="text-xl font-medium col-span-2 text-center text-gray-text">Sorry, no results found for your search...</h2>
                                <h2 className="text-xl font-medium col-span-2 text-center">Contact Us for Special Requests</h2>
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
                                        type="text"
                                        required
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
                            </div>}
                    </div>
                </div>
            </div>

            <div className="md:hidden p-3 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
                {currentItems.length ? currentItems.map((item) => (
                    <Link key={item.vin} to={"/inventory/" + item.vin}>
                        <InventoryCard year={item.year} make={item.make} model={item.model} price={item.price} mileage={item.mileage} status={item.status} imgLink={item.imageLinks} />
                    </Link>
                )) :
                    <div className="col-span-2 threeInventoryColBreakPoint:col-span-3 fourInventoryColBreakPoint:col-span-4 fiveInventoryColBreakPoint:col-span-5 sixInventoryColBreakPoint:col-span-6 eightInventoryColBreakPoint:col-span-8">
                        <h2 className="text-xl font-medium col-span-2 text-center text-gray-text">Sorry, no results found for your search...</h2>
                        <h2 className="text-xl font-medium col-span-2 text-center">Contact Us for Special Requests</h2>
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
                                type="text"
                                required
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
                    </div>}
            </div>

            <ReactPaginate className="flex gap-6 items-center justify-center pt-4"
                previousLabel={<span>
                    <BsChevronLeft />
                </span>}
                nextLabel={<span>
                    <BsChevronRight />
                </span>}
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="border-black rounded-full border-2 p-0.5 h-8 w-8 text-center"
                // eslint-disable-next-line no-unused-vars
                hrefBuilder={(page, pageCount, selected) =>
                    page >= 1 && page <= pageCount ? `/page/${page}` : '#'
                }
                hrefAllControls
                onPageChange={handlePageClick}
            />

            {/* Newsletter Sub & Button */}
            {isSuccess.isSuccess ?
                <div className="pt-3 px-3">
                    <SuccessAlert message={isSuccess.successMessage} dismissFunction={setSuccess} />
                </div> : null
            }
            <div className="grid place-content-center p-3">
                <div className="flex text-center gap-3 items-center">
                    <p className="font-medium">Subscribe to learn about new arrivals and our latest news</p>
                    <button className="bg-black rounded-full text-white text-center items-center font-medium text-nowrap px-4 h-8" onClick={() => setModalOpen(true)}>
                        STAY IN TOUCH
                    </button>
                </div>
            </div>
            {modalOpen && <EmailSubscriptionModal onClose={() => setModalOpen(false)} setSuccess={setSuccess} />}
        </>
    );
};