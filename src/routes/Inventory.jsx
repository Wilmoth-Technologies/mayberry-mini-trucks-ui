import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TbTrash } from "react-icons/tb";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import InventoryCard from "../shared/components/inventory/InventoryCard";
import { MAKE_BUTTON, MILEAGE_BUTTON, PRICE_BUTTON, MODEL_BUTTON, YEAR_BUTTON, TRANSMISSION_BUTTON, ENGINE_BUTTON, OPTIONS_BUTTON } from "../shared/AppConstants";
import EmailSubscriptionModal from "../shared/components/modals/EmailSubscriptionModal";
import axiosInstance from "../shared/AxiosConfig";
import { ErrorAlert } from "../shared/components/ErrorAlert";
import LoadingNonProvider from "../shared/components/LoadingNonProvider";
import { SuccessAlert } from "../shared/components/SuccessAlert";
import { useClickOutside } from "../shared/hooks/UseClickOutside";

export default function Inventory() {
    const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [isKeiComparisonOpen, setKeiComparisonOpen] = useState(false);
    const [isMakeFilterOpen, setMakeFilterOpen] = useState(false);
    const [isModelFilterOpen, setModelFilterOpen] = useState(false);
    const [isPriceFilterOpen, setPriceFilterOpen] = useState(false);
    const [isYearFilterOpen, setYearFilterOpen] = useState(false);
    const [isMileageFilterOpen, setMileageFilterOpen] = useState(false);
    const [isEngineFilterOpen, setEngineFilterOpen] = useState(false);
    const [isOptionsFilterOpen, setOptionsFilterOpen] = useState(false);
    const [isTransmissionFilterOpen, setTransmissionFilterOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [inventory, setInventory] = useState([]);
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

    //Filtering States:
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [years, setYears] = useState([]);
    const [engines, setEngines] = useState([]);
    const [transmissions, setTransmissions] = useState([]);
    const [options, setOptions] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        make: [],
        model: [],
        year: [],
        engine: [],
        transmission: [],
        option: [],
        price: { min: 0, max: 0 },  // Example range for price
        mileage: { min: 0, max: 0 } // Example range for mileage
    });

    const updateCharCounter = (event) => {
        setCharCount(event.target.value.length);
        setCharCountMaxed(event.target.value.length === MAX_CHAR_COUNT);
        handleChange(event);
    };

    // Handle page click
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/inventory/getInventoryMetaData');
                setInventory(response.data);
                setFilteredInventory(response.data);

                const allOptions = response?.data.flatMap(item =>
                    Array.isArray(item.options) ? item.options.map(opt => opt.option) : []
                );
                setOptions([...new Set(allOptions)]);

                setMakes([...new Set(response?.data.map(item => item.make))]);
                setModels([...new Set(response?.data.map(item => item.model))]);
                setYears([...new Set(response?.data.map(item => item.year))]);
                setEngines([...new Set(response?.data.map(item => item.engine))]);
                setTransmissions([...new Set(response?.data.map(item => item.transmission))]);

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
                setContactUsError({ isError: true, errorMessage: 'Contact Request Failed, Please Try Again.' })
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {
                setLoading(false);
            }
        }
    };

    const handleClearAllClick = () => {
        setSelectedFilters({
            make: [],
            model: [],
            year: [],
            engine: [],
            transmission: [],
            option: [],
            price: { min: 0, max: 0 },  // Example range for price
            mileage: { min: 0, max: 0 } // Example range for mileage
        });
    }

    // Handle checkbox selection
    const handleFilterChange = (filterType, value) => {
        setCurrentPage(0);
        setSelectedFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
            updatedFilters[filterType] = updatedFilters[filterType].includes(value)
                ? updatedFilters[filterType].filter(item => item !== value)
                : [...updatedFilters[filterType], value];
            return updatedFilters;
        });
    };

    // Calculate pagination based on filtered data
    const offset = currentPage * itemsPerPage;
    let currentItems = [];
    let pageCount = 0;
    currentItems = filteredInventory.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(filteredInventory.length / itemsPerPage);

    function findMatchingObjects(data, searchString) {
        // Convert searchString to lowercase for case-insensitive matching
        const searchLower = searchString.toLowerCase();

        return data.filter(item => {
            // Check if any option contains the search string
            const optionsMatch = item.options.some(option =>
                option.option.toLowerCase().includes(searchLower)
            );

            // Check if any other field (like make, model, year) contains the search string
            const fieldsMatch = [
                item.make,
                item.model,
                item.year,
                item.exteriorColor,
                item.interiorColor,
                item.transmission,
                item.engine,
                item.description
            ].some(field => field && field.toLowerCase().includes(searchLower));

            // Return true if either the options or other fields match
            return optionsMatch || fieldsMatch;
        });
    }

    useEffect(() => {
        const applyFilters = () => {
            setCurrentPage(0);
            // Step 1: Filter inventory based on selected filters
            const newFilteredInventory = inventory.filter(item => {
                return Object.keys(selectedFilters).every(filterType => {
                    if (selectedFilters[filterType].length === 0) return true;  // No filter for this type
                    if (filterType === "option") {
                        return selectedFilters[filterType].every(opt => item.options.some(o => o.option === opt));
                    }
                    if (filterType === "price") {
                        // Check if price is within the specified range
                        const minPrice = selectedFilters.price.min || 0;
                        const maxPrice = selectedFilters.price.max || Infinity;
                        return item.price >= minPrice && item.price <= maxPrice;
                    }

                    if (filterType === "mileage") {
                        // Check if mileage is within the specified range
                        const minMileage = selectedFilters.mileage.min || 0;
                        const maxMileage = selectedFilters.mileage.max || Infinity;
                        return item.mileage >= minMileage && item.mileage <= maxMileage;
                    }
                    return selectedFilters[filterType].includes(item[filterType]);
                });
            });

            // Step 2: Further filter by the search term
            const filteredDataVins = findMatchingObjects(newFilteredInventory, search).map(item => item.vin);

            // Step 3: Final filter of inventory based on both filters and search
            const finalFilteredInventory = inventory.filter(item => filteredDataVins.includes(item.vin));
            setFilteredInventory(finalFilteredInventory);
        };

        applyFilters();
    }, [selectedFilters, inventory, search]);

    const mobileFilterClick = () => {
        setMobileFilterOpen(prevMobileFilterState => !prevMobileFilterState);
    };

    const wrapperRef = useRef("mobileFilter");
    useClickOutside(wrapperRef, () => {
        setMobileFilterOpen(false);
    })

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
                    <button className="flex items-center text-lg" onClick={() => mobileFilterClick()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                        </svg>
                        <p className="pl-2">Filter</p>
                    </button>
                </div>
            </div>
            <div ref={wrapperRef} className={"fixed right-0 top-0 bg-white z-50 bg-opacity-90 w-3/4 text-black h-full flex-col justify-content-center origin-top animate-open-menu " + (isMobileFilterOpen ? 'flex' : 'hidden')} >
                <div className="m-4 flex flex-col border border-x-black border-y-black">
                    <div className="flex w-full p-1 justify-between">
                        <p className="font-semibold text-lg">Filters</p>
                        <button className="flex items-center" onClick={handleClearAllClick}>
                            <p className="pr-1 font-semibold text-lg">Clear All</p>
                            <TbTrash />
                        </button>
                    </div>
                    <div className="border-y border-y-black p-1">
                        <button id={MAKE_BUTTON} className="flex w-full justify-between font-semibold" onClick={() => setMakeFilterOpen(!isMakeFilterOpen)}>
                            Make
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isMakeFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-black " + (isMakeFilterOpen ? 'block' : 'hidden')}>
                            {makes && makes.map(make => (
                                <div key={make}>
                                    <input className="accent-black rounded-sm"
                                        type="checkbox"
                                        value={make}
                                        checked={selectedFilters.make.includes(make)}
                                        onChange={() => handleFilterChange('make', make)} />
                                    <label className="px-1">{make}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-y border-y-black p-1">
                        <button id={MODEL_BUTTON} className="flex w-full justify-between font-semibold" onClick={() => setModelFilterOpen(!isModelFilterOpen)}>
                            Model
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isModelFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-black " + (isModelFilterOpen ? 'block' : 'hidden')}>
                            {models && models.map(model => (
                                <div key={model}>
                                    <input className="accent-black rounded-sm"
                                        type="checkbox"
                                        value={model}
                                        checked={selectedFilters.model.includes(model)}
                                        onChange={() => handleFilterChange('model', model)} />
                                    <label className="px-1">{model}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-y border-y-black p-1">
                        <button id={PRICE_BUTTON} className="flex w-full justify-between font-semibold" onClick={() => setPriceFilterOpen(!isPriceFilterOpen)}>
                            Price
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isPriceFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-black gap-x-4 " + (isPriceFilterOpen ? 'block' : 'hidden')}>
                            <label>Min</label>
                            <label>Max</label>
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={selectedFilters.price.min}
                                onChange={(e) => setSelectedFilters({ ...selectedFilters, price: { ...selectedFilters.price, min: parseInt(e.target.value) || 0 } })}
                                className="border p-1 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={selectedFilters.price.max}
                                onChange={(e) => setSelectedFilters({ ...selectedFilters, price: { ...selectedFilters.price, max: parseInt(e.target.value) || Infinity } })}
                                className="border p-1 rounded"
                            />
                        </div>
                    </div>
                    <div className="border-y border-y-black p-1">
                        <button id={YEAR_BUTTON} className="flex w-full justify-between font-semibold" onClick={() => setYearFilterOpen(!isYearFilterOpen)}>
                            Year
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isYearFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-3 text-black " + (isYearFilterOpen ? 'block' : 'hidden')}>
                            {years && years.map(year => (
                                <div key={year}>
                                    <input className="accent-black rounded-sm"
                                        type="checkbox"
                                        value={year}
                                        checked={selectedFilters.year.includes(year)}
                                        onChange={() => handleFilterChange('year', year)} />
                                    <label className="px-1">{year}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-y border-y-black p-1">
                        <button id={MILEAGE_BUTTON} className="flex w-full justify-between font-semibold" onClick={() => setMileageFilterOpen(!isMileageFilterOpen)}>
                            Mileage
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isMileageFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-black gap-x-4 " + (isMileageFilterOpen ? 'block' : 'hidden')}>
                            <label>Min</label>
                            <label>Max</label>
                            <input
                                type="number"
                                placeholder="Min Mileage"
                                value={selectedFilters.mileage.min}
                                onChange={(e) => setSelectedFilters({ ...selectedFilters, mileage: { ...selectedFilters.mileage, min: parseInt(e.target.value) || 0 } })}
                                className="border p-1 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Max Mileage"
                                value={selectedFilters.mileage.max}
                                onChange={(e) => setSelectedFilters({ ...selectedFilters, mileage: { ...selectedFilters.mileage, max: parseInt(e.target.value) || Infinity } })}
                                className="border p-1 rounded"
                            />
                        </div>
                    </div>
                    <div className="border-y border-y-black p-1">
                        <button id={ENGINE_BUTTON} className="flex w-full justify-between font-semibold" onClick={() => setEngineFilterOpen(!isEngineFilterOpen)}>
                            Engine
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isEngineFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-black " + (isEngineFilterOpen ? 'block' : 'hidden')}>
                            {engines && engines.map(engine => (
                                <div key={engine}>
                                    <input className="accent-black rounded-sm"
                                        type="checkbox"
                                        value={engine}
                                        checked={selectedFilters.engine.includes(engine)}
                                        onChange={() => handleFilterChange('engine', engine)} />
                                    <label className="px-1">{engine}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-y border-y-black p-1">
                        <button id={TRANSMISSION_BUTTON} className="flex w-full justify-between font-semibold" onClick={() => setTransmissionFilterOpen(!isTransmissionFilterOpen)}>
                            Transmission
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isTransmissionFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-black " + (isTransmissionFilterOpen ? 'block' : 'hidden')}>
                            {transmissions && transmissions.map(transmission => (
                                <div key={transmission}>
                                    <input className="accent-black rounded-sm"
                                        type="checkbox"
                                        value={transmission}
                                        checked={selectedFilters.transmission.includes(transmission)}
                                        onChange={() => handleFilterChange('transmission', transmission)} />
                                    <label className="px-1">{transmission}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-y border-y-black p-1">
                        <button id={OPTIONS_BUTTON} className="flex w-full justify-between font-semibold" onClick={() => setOptionsFilterOpen(!isOptionsFilterOpen)}>
                            Options
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isOptionsFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-black " + (isOptionsFilterOpen ? 'block' : 'hidden')}>
                            {options && options.map(option => (
                                <div key={option}>
                                    <input className="accent-black rounded-sm"
                                        type="checkbox"
                                        value={option}
                                        checked={selectedFilters.option.includes(option)}
                                        onChange={() => handleFilterChange('option', option)} />
                                    <label className="px-1">{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* End Filtering Menu Mobile */}

            {/* Filtering Menu Medium Screens and Above */}
            <div className="hidden md:grid md:grid-cols-[320px_auto] md:px-3 gap-3">
                {/* Filtering */}
                <div className="flex flex-col border border-x-border-gray">
                    <div className="flex w-full p-1 justify-between">
                        <p className="">Filters</p>
                        <button className="flex items-center" onClick={handleClearAllClick}>
                            <p className="pr-1">Clear All</p>
                            <TbTrash />
                        </button>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={MAKE_BUTTON} className="flex w-full justify-between" onClick={() => setMakeFilterOpen(!isMakeFilterOpen)}>
                            Make
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isMakeFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-gray-text " + (isMakeFilterOpen ? 'block' : 'hidden')}>
                            {makes && makes.map(make => (
                                <div key={make}>
                                    <input className="accent-black rounded-sm"
                                        type="checkbox"
                                        value={make}
                                        checked={selectedFilters.make.includes(make)}
                                        onChange={() => handleFilterChange('make', make)} />
                                    <label className="px-1">{make}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={MODEL_BUTTON} className="flex w-full justify-between" onClick={() => setModelFilterOpen(!isModelFilterOpen)}>
                            Model
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isModelFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-gray-text " + (isModelFilterOpen ? 'block' : 'hidden')}>
                            {models && models.map(model => (
                                <div key={model}>
                                    <input className="accent-black rounded-sm"
                                        type="checkbox"
                                        value={model}
                                        checked={selectedFilters.model.includes(model)}
                                        onChange={() => handleFilterChange('model', model)} />
                                    <label className="px-1">{model}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={PRICE_BUTTON} className="flex w-full justify-between" onClick={() => setPriceFilterOpen(!isPriceFilterOpen)}>
                            Price
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isPriceFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-gray-text gap-x-4 " + (isPriceFilterOpen ? 'block' : 'hidden')}>
                            <label>Min</label>
                            <label>Max</label>
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={selectedFilters.price.min}
                                onChange={(e) => setSelectedFilters({ ...selectedFilters, price: { ...selectedFilters.price, min: parseInt(e.target.value) || 0 } })}
                                className="border p-1 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={selectedFilters.price.max}
                                onChange={(e) => setSelectedFilters({ ...selectedFilters, price: { ...selectedFilters.price, max: parseInt(e.target.value) || Infinity } })}
                                className="border p-1 rounded"
                            />
                        </div>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={YEAR_BUTTON} className="flex w-full justify-between" onClick={() => setYearFilterOpen(!isYearFilterOpen)}>
                            Year
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isYearFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-3 text-gray-text " + (isYearFilterOpen ? 'block' : 'hidden')}>
                            {years && years.map(year => (
                                <div key={year}>
                                    <input className="accent-black rounded-sm"
                                        type="checkbox"
                                        value={year}
                                        checked={selectedFilters.year.includes(year)}
                                        onChange={() => handleFilterChange('year', year)} />
                                    <label className="px-1">{year}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={MILEAGE_BUTTON} className="flex w-full justify-between" onClick={() => setMileageFilterOpen(!isMileageFilterOpen)}>
                            Mileage
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isMileageFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-gray-text gap-x-4 " + (isMileageFilterOpen ? 'block' : 'hidden')}>
                            <label>Min</label>
                            <label>Max</label>
                            <input
                                type="number"
                                placeholder="Min Mileage"
                                value={selectedFilters.mileage.min}
                                onChange={(e) => setSelectedFilters({ ...selectedFilters, mileage: { ...selectedFilters.mileage, min: parseInt(e.target.value) || 0 } })}
                                className="border p-1 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Max Mileage"
                                value={selectedFilters.mileage.max}
                                onChange={(e) => setSelectedFilters({ ...selectedFilters, mileage: { ...selectedFilters.mileage, max: parseInt(e.target.value) || Infinity } })}
                                className="border p-1 rounded"
                            />
                        </div>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={ENGINE_BUTTON} className="flex w-full justify-between" onClick={() => setEngineFilterOpen(!isEngineFilterOpen)}>
                            Engine
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isEngineFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-gray-text " + (isEngineFilterOpen ? 'block' : 'hidden')}>
                            {engines && engines.map(engine => (
                                <div key={engine}>
                                    <input className="accent-black rounded-sm"
                                        type="checkbox"
                                        value={engine}
                                        checked={selectedFilters.engine.includes(engine)}
                                        onChange={() => handleFilterChange('engine', engine)} />
                                    <label className="px-1">{engine}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={TRANSMISSION_BUTTON} className="flex w-full justify-between" onClick={() => setTransmissionFilterOpen(!isTransmissionFilterOpen)}>
                            Transmission
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isTransmissionFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-gray-text " + (isTransmissionFilterOpen ? 'block' : 'hidden')}>
                            {transmissions && transmissions.map(transmission => (
                                <div key={transmission}>
                                    <input className="accent-black rounded-sm"
                                        type="checkbox"
                                        value={transmission}
                                        checked={selectedFilters.transmission.includes(transmission)}
                                        onChange={() => handleFilterChange('transmission', transmission)} />
                                    <label className="px-1">{transmission}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-y border-y-border-gray p-1">
                        <button id={OPTIONS_BUTTON} className="flex w-full justify-between" onClick={() => setOptionsFilterOpen(!isOptionsFilterOpen)}>
                            Options
                            <span className={"pointer-events-none w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isOptionsFilterOpen ? '-rotate-135 mt-2' : 'rotate-45 mt-1')} />
                        </button>
                        <div className={"grid grid-cols-2 text-gray-text " + (isOptionsFilterOpen ? 'block' : 'hidden')}>
                            {options && options.map(option => (
                                <div key={option}>
                                    <input className="accent-black rounded-sm"
                                        type="checkbox"
                                        value={option}
                                        checked={selectedFilters.option.includes(option)}
                                        onChange={() => handleFilterChange('option', option)} />
                                    <label className="px-1">{option}</label>
                                </div>
                            ))}
                        </div>
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