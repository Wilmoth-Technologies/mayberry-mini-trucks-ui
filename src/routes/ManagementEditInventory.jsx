import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { FileInput, Label } from "flowbite-react";
import { ErrorAlert } from "../shared/components/ErrorAlert";
import axiosInstance from "../shared/AxiosConfig";
import ManagementPreviewInventory from "../shared/components/management/ManagementPreviewInventory";
import { isStringEmpty } from "../shared/AppFunctions";
import LoadingNonProvider from "../shared/components/LoadingNonProvider";
import { useAccessToken } from "../shared/hooks/UseAccessToken";

//TODO: Need to add in functionality that allows for Description Templating....
export default function ManagementEditInventory() {
    const { vin } = useParams();
    const [existingInventoryData, setExistingInventoryData] = useState([]);
    const [areImagesUpdated, setAreImagesUpdated] = useState(false);
    const [selectedMakeModel, setSelectedMakeModel] = useState({ make: "", model: "" });
    const [isOtherMakeModelSelected, setOtherMakeModelSelected] = useState(false);
    const [otherMakeValue, setOtherMakeValue] = useState("");
    const [otherModelValue, setOtherModelValue] = useState("");
    const [isError, setError] = useState({ isError: false, errorMessage: "" });
    const [isPreviewRendered, setPreviewRendered] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isCompressing, setIsCompressing] = useState(false);

    const getAccessToken = useAccessToken();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = await getAccessToken();
                const response = await axiosInstance.get('/management/getInventoryItem', { params: { vin: vin }, headers: { Authorization: `Bearer ${token}` }, });
                setExistingInventoryData(response.data);
                const inventoryResponse = response.data[0];

                //Setting Make & Model Data
                const makeList = ["Subaru", "Suzuki", "Honda", "Mitsubishi", "Daihatsu"];
                const modelList = ["Sambar", "Carry", "Acty", "Minicab", "Hijet"];
                if (makeList.includes(inventoryResponse.make) && modelList.includes(inventoryResponse.model)) {
                    setSelectedMakeModel({ make: inventoryResponse.make, model: inventoryResponse.model });
                } else { //Other Make & Model is Selected
                    setOtherMakeModelSelected(true);
                    setOtherMakeValue(inventoryResponse.make);
                    setOtherModelValue(inventoryResponse.model);
                }

                //Setting Input Field Data
                setFormValues({
                    make: inventoryResponse.make,
                    model: inventoryResponse.model,
                    year: inventoryResponse.year,
                    exteriorColor: inventoryResponse.exteriorColor,
                    interiorColor: inventoryResponse.interiorColor,
                    vin: inventoryResponse.vin,
                    modelCode: inventoryResponse.modelCode,
                    stockNumber: inventoryResponse.stockNumber,
                    mileage: inventoryResponse.mileage,
                    transmission: inventoryResponse.transmission,
                    engine: inventoryResponse.engine,
                    price: inventoryResponse.price,
                    description: inventoryResponse.description,
                    purchaseDate: inventoryResponse.purchaseDate,
                    titleInHand: inventoryResponse.titleInHand,
                    status: inventoryResponse.status,
                    embeddedVideoLink: 'embeddedVideoLink' in inventoryResponse ? inventoryResponse.embeddedVideoLink : '',
                });

                //Setting CheckBox Data
                inventoryResponse?.options?.map(option => {
                    setSelectedOptions((prevCheckboxes) => ({
                        ...prevCheckboxes,
                        [option.option]: true
                    }));
                });

                // Use imageLinks from the inventory response and convert GCS URLs to CDN URLs
                const imageObjects = inventoryResponse.imageLinks.map((url, index) => {
                    // Replace GCS URL with CDN URL
                    const cdnUrl = url.replace(
                        'https://storage.googleapis.com/mayberry-mini-trucks-inventory-images',
                        'https://cdn.mayberryminitrucks.com'
                    );
                    return { 
                        file: null, // No file object needed for existing images
                        preview: cdnUrl, // Use the CDN URL directly for preview
                        isUrl: true // Flag to indicate this is a URL, not a File
                    };
                });

                setSelectedFiles((prevFiles) => [...prevFiles, ...imageObjects]);

                setError({ isError: false });
            } catch (error) {
                setError({ isError: true, errorMessage: "Failed to Load Existing Inventory Data, Please Try Again." });
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // State to hold input values for all fields
    const [formValues, setFormValues] = useState({
        make: '',
        model: '',
        year: '',
        exteriorColor: '',
        interiorColor: '',
        vin: '',
        modelCode: '',
        stockNumber: '',
        mileage: '',
        transmission: '',
        engine: '',
        price: '',
        description: '',
        purchaseDate: '',
        titleInHand: false,
        status: 'In Stock',
        embeddedVideoLink: '',
    });

    const [selectedOptions, setSelectedOptions] = useState({
        '2WD': false,
        '4WD': false,
        'AWD': false,
        'Airbags': false,
        'A/C': false,
        'Crane': false,
        'Diesel': false,
        'Diff Lock': false,
        'Dump': false,
        'Ex Low 1': false,
        'Fire Truck': false,
        'Fuel Injected': false,
        'Hi/Low': false,
        'Power Locks': false,
        'Power Mirrors': false,
        'Power Steering': false,
        'Power Windows': false,
        'Scissor Lift': false,
        'Supercharged': false,
        'Turbo': false,
        'Ultra Low 1': false,
        'Ultra Low Reverse': false,
        'Van': false,
        'Van w Deck': false,
        'Jumbo': false,
        'Attack': false,
    })

    // State to store the selected files and previews
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [primaryImageIndex, setPrimaryImageIndex] = useState(0); // Track the primary image by its index

    // State to hold validation errors
    const [validationErrors, setValidationErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'make':
                if (!value) error = 'Selecting or Entering a Make & Model is required';
                break;
            case 'model':
                if (!value) error = 'Selecting or Entering a Make & Model is required';
                break;
            case 'year':
                if (!value) error = 'Year is required';
                else if (!/^\d{4}$/.test(value)) error = 'Year must be 4 digits';
                break;
            case 'exteriorColor':
                if (!value) error = 'Exterior color is required';
                break;
            case 'interiorColor':
                if (!value) error = 'Interior color is required';
                break;
            case 'modelCode':
                if (!value) error = 'Model code is required';
                break;
            case 'stockNumber':
                if (!value) error = 'Stock number is required';
                break;
            case 'mileage':
                if (!value) error = 'Mileage is required';
                else if (isNaN(value)) error = 'Mileage must be a number';
                break;
            case 'transmission':
                if (!value) error = 'Transmission is required';
                break;
            case 'engine':
                if (!value) error = 'Engine is required';
                break;
            case 'price':
                if (!value) error = 'Price is required';
                else if (isNaN(value)) error = 'Price must be a number';
                break;
            case 'description':
                if (!value) error = 'Description is required';
                break;
            case 'purchaseDate':
                if (!value) {
                    error = 'Purchase date is required';
                } else if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/.test(value)) {
                    error = 'Purchase date must be in mm/dd/yyyy format';
                }
                break;
            case 'embeddedVideoLink':
                if (!value) error;
                else if (!value.includes('embed')) error = 'Video Links Must be \'Embed\' Links';
                break;
            default:
                break;
        }

        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'make') {
            setOtherMakeValue(value);
        } else if (name === 'model') {
            setOtherModelValue(value);
        }

        // Update form values
        setFormValues({ ...formValues, [name]: value });

        // Validate the field and set the error if any
        const error = validateField(name, value);
        setValidationErrors({ ...validationErrors, [name]: error });

        if (isStringEmpty(error)) {
            setError({ isError: false });
        }
    };

    const handleMakeAndModelChange = (make, model) => {
        setOtherMakeModelSelected(false);
        setOtherMakeValue('');
        setOtherModelValue('');

        setFormValues({ ...formValues, make: make, model: model });
        setSelectedMakeModel({ make: make, model: model })

        const modelError = validateField('model', model);
        const makeError = validateField('make', make);
        if (makeError || modelError) {
            setValidationErrors({ ...validationErrors, ['model']: modelError, ['make']: makeError });
        } else {
            setValidationErrors({ ...validationErrors, ['model']: null, ['make']: null });
        }
    }

    const handleOtherMakeAndModelChange = () => {
        if (!isOtherMakeModelSelected) {
            setFormValues({ ...formValues, ['make']: '', ['model']: '' });
            setSelectedMakeModel({ make: '', model: '' });
            setOtherMakeModelSelected(true);
            const modelError = validateField('model', '');
            const makeError = validateField('make', '');
            if (makeError || modelError) {
                setValidationErrors({ ...validationErrors, ['model']: modelError, ['make']: makeError });
            } else {
                setValidationErrors({ ...validationErrors, ['model']: null, ['make']: null });
            }
        } else {
            const modelError = validateField('model', formValues.model);
            const makeError = validateField('make', formValues.make);
            if (makeError || modelError) {
                setValidationErrors({ ...validationErrors, ['model']: modelError, ['make']: makeError });
            } else {
                setValidationErrors({ ...validationErrors, ['model']: null, ['make']: null });
            }
        }
    }

    // Final validation for all fields before submission
    const validateAllFields = () => {
        const newErrors = {};
        Object.keys(formValues).forEach((field) => {
            const error = validateField(field, formValues[field]);
            if (error) newErrors[field] = error;
        });

        setValidationErrors(newErrors);

        // Return true if no errors are found
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission (for final validation or any action)
    const handleSubmit = (e) => {
        e.preventDefault()
        // Check if there are any remaining errors before submission
        const isValid = validateAllFields();

        if (isValid) {
            setPreviewRendered(true);
        } else {
            window.scrollTo(0, 0);
            setError({ isError: true, errorMessage: "Please correct all Input Errors and Submit Again." });
        }
    };

    // Handler for checkbox change
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        // Update the state for the particular checkbox
        if (name === 'titleInHand') {
            setFormValues({ ...formValues, [name]: checked });
        } else {
            setSelectedOptions((prevCheckboxes) => ({
                ...prevCheckboxes,
                [name]: checked
            }));
        }
    };

    // Get all selected checkboxes (those that are true)
    const selectedCheckboxes = Object.keys(selectedOptions).filter(
        (checkbox) => selectedOptions[checkbox]
    );

    const compressImage = (file, maxWidth = 800, maxHeight = 844, quality = 0.6) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    // Calculate new dimensions
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    // Convert to blob
                    canvas.toBlob(
                        (blob) => {
                            const compressedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now(),
                            });
                            resolve(compressedFile);
                        },
                        'image/jpeg',
                        quality
                    );
                };
            };
        });
    };

    // Handle file selection and generate previews
    const handleFileChange = async (e) => {
        setAreImagesUpdated(true);
        const files = Array.from(e.target.files); // Convert FileList to array
        setIsCompressing(true);
        try {
            // Compress all files and create preview URLs
            const compressedFilesWithPreviews = await Promise.all(
                files.map(async (file) => {
                    const compressedFile = await compressImage(file);
                    const preview = URL.createObjectURL(compressedFile);
                    console.log((file.size / 1024).toFixed(2));
                    console.log((compressedFile.size / 1024).toFixed(2));
            
                    return {
                        file: compressedFile,
                        preview
                    };
                })
            );
            setSelectedFiles(prevFiles => [...prevFiles, ...compressedFilesWithPreviews]);
        } catch (error) {
            console.error('Error compressing images:', error);
        } finally {
            setIsCompressing(false);
        }
    };

    // Remove a selected file
    const handleRemove = (index) => {
        setAreImagesUpdated(true);

        const updatedImages = selectedFiles.filter((_, i) => i !== index); // Remove image from list
        setSelectedFiles(updatedImages);
        if (index === primaryImageIndex) setPrimaryImageIndex(0); // Reset primary if the removed image was primary
        else if (index < primaryImageIndex) setPrimaryImageIndex(primaryImageIndex - 1); // Adjust primary if needed
    };

    const handleSetPrimary = (index) => {
        setAreImagesUpdated(true);
        const updatedFiles = [...selectedFiles]; // Copy the current images array

        //Remove the selected image from its current position
        const [primaryImage] = updatedFiles.splice(index, 1);

        //Insert the selected image at the first position
        updatedFiles.unshift(primaryImage);

        //Update the state with the new image order
        setSelectedFiles(updatedFiles);

        //Update primaryImageIndex to 0, since the primary is now first
        setPrimaryImageIndex(0);
    };

    return (
        <>
            {isLoading || isCompressing ? <LoadingNonProvider /> : null}
            {!isPreviewRendered ?
                <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="p-3">
                        <Link to={'/management/view'} className="hidden md:flex items-center md:col-span-2 -mb-9">
                            <IoArrowBackOutline />
                            <p>Back to View Inventory</p>
                        </Link>
                        <h1 className="text-center text-2xl border-b-2 font-semibold pt-2 mx-6">
                            Edit Inventory
                        </h1>
                    </div>
                    {isError.isError ?
                        <div className="px-3">
                            <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError} />
                        </div> : null
                    }
                    {/* Make & Model */}
                    <div className="grid grid-cols-2 gap-4 md:gap-2 lg:gap-4 p-4 items-center text-center md:grid-cols-6">
                        <div className="flex col-span-2 md:col-span-6 gap-2 items-center">
                            <h2 className="font-medium text-xl">Make & Model</h2>
                            {(validationErrors['make'] || validationErrors['model']) && <p style={{ color: 'red' }}>{validationErrors['make'] || validationErrors['model']}</p>}
                        </div>
                        <img id="subaru" className={"h-[130px] w-[160px] " + (selectedMakeModel.make == "Subaru" ? 'border-action-yellow border-2 rounded-md' : '')} src="/Subaru.png" onClick={() => handleMakeAndModelChange("Subaru", "Sambar")} />
                        <img className={"h-[130px] w-[160px] " + (selectedMakeModel.make == "Suzuki" ? 'border-action-yellow border-2 rounded-md' : '')} src="/Suzuki.png" onClick={() => handleMakeAndModelChange("Suzuki", "Carry")} />
                        <img className={"h-[130px] w-[160px] " + (selectedMakeModel.make == "Honda" ? 'border-action-yellow border-2 rounded-md' : '')} src="/Honda.png" onClick={() => handleMakeAndModelChange("Honda", "Acty")} />
                        <img className={"h-[130px] w-[160px] " + (selectedMakeModel.make == "Mitsubishi" ? 'border-action-yellow border-2 rounded-md' : '')} src="/Mitsubishi.png" onClick={() => handleMakeAndModelChange("Mitsubishi", "Minicab")} />
                        <img className={"h-[130px] w-[160px] " + (selectedMakeModel.make == "Daihatsu" ? 'border-action-yellow border-2 rounded-md' : '')} src="/Daihatsu.png" onClick={() => handleMakeAndModelChange("Daihatsu", "Hijet")} />
                        <div className={"flex flex-col items-center gap-y-2 " + (isOtherMakeModelSelected ? 'border-action-yellow border-2 rounded-md' : '')} onClick={() => handleOtherMakeAndModelChange()}>
                            <h2 className="text-lg font-medium">Other:</h2>
                            <label className="grid grid-cols-1 gap-2 px-2 pb-2">
                                <input
                                    className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                    placeholder="Make"
                                    type="text"
                                    name="make"
                                    value={otherMakeValue}
                                    onChange={handleInputChange} />
                                <input
                                    className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                    placeholder="Model"
                                    type="text"
                                    name="model"
                                    value={otherModelValue}
                                    onChange={handleInputChange} />
                            </label>
                        </div>
                    </div>
                    {/* Details */}
                    <div className="grid grid-cols-2 gap-2 items-center p-4">
                        <h2 className="col-span-2 font-medium text-xl text-center md:text-left">Details</h2>
                        <div className="col-span-2 flex flex-col justify-center">
                            <label>
                                <input
                                    className="accent-black rounded-sm mr-1"
                                    type="checkbox"
                                    name="titleInHand"
                                    checked={formValues['titleInHand']}
                                    onChange={handleCheckboxChange}
                                />
                                Title in Hand
                            </label>
                        </div>
                        {
                            Object.keys(formValues).map((field, index) => (
                                field === 'make' || field === 'model' || field === 'description' || field === 'titleInHand' || field === 'status' ? null :
                                    <div className="flex flex-col" key={index}>
                                        <div className="flex gap-2">
                                            <p>{field.charAt(0).toUpperCase() + field.replace(/([A-Z])/g, ' $1').trim().substring(1)}</p>
                                            {field === "vin" || field === "year" ? <p className="text-gray-400">Note: Field is Disabled in Edit Mode</p> : null}

                                            {validationErrors[field] && <p style={{ color: 'red' }}>{validationErrors[field]}</p>}
                                        </div>
                                        <input
                                            className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                            placeholder={field.charAt(0).toUpperCase() + field.replace(/([A-Z])/g, ' $1').trim().substring(1) + (field === 'embeddedVideoLink' ? '' : '*')}
                                            type="text"
                                            name={field}
                                            disabled={field === "vin" || field === "year"}
                                            value={formValues[field]}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                            ))
                        }
                        <div className="flex flex-col">
                            <label htmlFor="status">Status</label>
                            <select
                                className="bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                name="status"
                                id="status"
                                value={formValues.status}
                                onChange={handleInputChange}
                            >
                                <option value="In Stock">In Stock</option>
                                <option value="Out of Service">Out of Service</option>
                                <option value="Pending Sale">Pending Sale</option>
                                <option value="Sold">Sold</option>
                            </select>
                        </div>
                        <div className="col-span-2 flex flex-col">
                            <div className="flex gap-2 items-center">
                                <p className="text-lg">Description</p>
                                {(validationErrors['description']) && <p style={{ color: 'red' }}>{validationErrors['description']}</p>}
                            </div>
                            <textarea
                                className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 col-span-2 resize-y h-72"
                                placeholder="Description*"
                                type="text"
                                required
                                name="description"
                                value={formValues['description']}
                                onChange={handleInputChange} />
                        </div>
                    </div>
                    {/* Options */}
                    <div className="grid grid-cols-2 gap-2 items-center p-4 text-center md:grid-cols-6">
                        <h2 className="col-span-2 font-medium text-xl md:col-span-6 md:text-left">Options</h2>
                        {/* Render checkboxes dynamically */}
                        {Object.keys(selectedOptions).map((checkbox, index) => (
                            <div key={index} className="flex items-center text-center">
                                <label>
                                    <input
                                        className="accent-black rounded-sm mr-1"
                                        type="checkbox"
                                        name={checkbox}
                                        checked={selectedOptions[checkbox]}
                                        onChange={handleCheckboxChange}
                                    />
                                    {checkbox.replace('checkbox', 'Option ')}
                                </label>
                            </div>
                        ))}
                    </div>
                    {/* Photos */}
                    <div className="grid grid-cols-1 gap-2 items-center p-4 text-center">
                        <h2 className="font-medium text-xl md:text-left">Photos</h2>
                        <div className="flex w-full items-center justify-center">
                            <Label
                                htmlFor="dropzone-file"
                                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <svg
                                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span>
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG</p>
                                </div>
                                <FileInput
                                    id="dropzone-file"
                                    className="hidden"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange} />
                            </Label>
                        </div>
                        {/* Display image previews */}
                        {selectedFiles.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                {selectedFiles.map((fileObj, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={fileObj.preview}
                                            alt={`preview-${index}`}
                                            className="h-full w-full object-cover rounded-lg"
                                        />
                                        {/* Primary Button */}
                                        <button
                                            type="button"
                                            onClick={() => handleSetPrimary(index)}
                                            className={"absolute top-0 left-0 m-1 px-2 py-1 rounded-md text-white " + (index === primaryImageIndex ? 'bg-action-yellow' : 'bg-gray-400')}
                                        >
                                            {index === primaryImageIndex ? 'Primary ★' : 'Set as Primary'}
                                        </button>
                                        {/* Remove button overlay */}
                                        <button
                                            type="button"
                                            onClick={() => handleRemove(index)}
                                            className="absolute top-0 right-0 m-1 px-2 py-1 rounded-md bg-red-700 text-white"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Preview */}
                    <div className="flex items-center justify-center pb-3">
                        <button type="submit" disabled={isError.isError} className="bg-black disabled:bg-gray-400 disabled:line-through rounded-full text-white text-center items-center font-medium text-nowrap px-8 py-1">
                            Preview
                        </button>
                    </div>
                </form> :
                <ManagementPreviewInventory formValues={formValues} selectedOptions={selectedCheckboxes} selectedFiles={selectedFiles} setPreviewRendered={setPreviewRendered} isAddInventory={false} areImagesUpdated={areImagesUpdated} existingInventoryData={existingInventoryData} />
            }
        </>
    );
}