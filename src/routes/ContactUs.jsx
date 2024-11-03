import { useState } from "react";
import { ErrorAlert } from "../shared/components/ErrorAlert";
import { SuccessAlert } from "../shared/components/SuccessAlert";
import axiosInstance from "../shared/AxiosConfig";
import LoadingNonProvider from "../shared/components/LoadingNonProvider";

export default function Inventory() {
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
    const MAX_CHAR_COUNT = 1000;
    const [charCount, setCharCount] = useState(0);
    const [isCharCountMaxed, setCharCountMaxed] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const updateCharCounter = (event) => {
        setCharCount(event.target.value.length);
        setCharCountMaxed(event.target.value.length === MAX_CHAR_COUNT);
        handleChange(event);
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
        <div className="px-3 pt-6">
            {isLoading ? <LoadingNonProvider /> : null}
            <h1 className="text-center text-xl font-semibold">Proudly serving the entire United States</h1>
            <p className="text-center text-lg">Feel free to Contact Us for all Inquiries Surrounding your Mini Truck Needs!</p>
            
            <h2 className="text-center text-lg py-4 font-semibold">Contact Form:</h2>
            <form className="grid grid-cols-2 gap-2 text-center col-span-2 pb-4" onSubmit={handleSubmit}>
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
        </div>
    );
}