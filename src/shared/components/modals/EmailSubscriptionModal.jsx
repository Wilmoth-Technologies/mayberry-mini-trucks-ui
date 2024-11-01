import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import axiosInstance from "../../AxiosConfig";
import LoadingNonProvider from "../LoadingNonProvider";
import { ErrorAlert } from "../ErrorAlert";

export default function EmailSubscriptionModal({ onClose, setSuccess }) {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState({ isError: false, errorMessage: "" });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        // Validation rules
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleClose = (event) => {
        if (event.target.id === 'wrapper') onClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setLoading(true);
                const response = await axiosInstance.post('/add/subscriber', { ...formData });
                setError({ isError: false })
                setSuccess({ isSuccess: true, successMessage: `Successfully subscribed via email: ${formData.email}. Please be on the Lookout for Emails from sales@mayberryminitrucks.com`});
                onClose();
            } catch (error) {
                if (error.status === 409) {
                    setError({ isError: true, errorMessage: "Email already Subscribed, Please Enter a New Email." })
                } else {
                    setError({ isError: true, errorMessage: "Failed to Subscribe, Please Try Again." })
                }
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {                
                setLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {isLoading ? <LoadingNonProvider /> : null}
            <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-30 flex justify-center items-center" id="wrapper" onClick={handleClose}>
                <div className="grid md:grid-cols-2 bg-modal-background rounded-lg h-[500px] md:h-[600px] w-[1200px]">
                    <div className="hidden md:block bg-modal-kei-standoff object-cover rounded-s-md" />
                    <div>
                        <span className="col-span-2 flex justify-end">
                            <IoCloseOutline className="text-4xl" onClick={() => onClose()} />
                        </span>
                        <div className="grid grid-cols-2 gap-8 md:gap-16 px-4 md:px-8 md:pt-8">
                            <h1 className="col-span-2 text-2xl font-medium">We'll update you on the latest from Mayberry from new arrivals to our latest news</h1>
                            {isError.isError ?
                                <div className="col-span-2 -my-8">
                                    <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError} />
                                </div> : null
                            }
                            <div className="grid grid-cols-2 gap-2 text-center col-span-2">
                                <div className="text-left">
                                    <label>First Name:</label>
                                    <input
                                        placeholder="First Name*"
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                    />
                                    {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                                </div>

                                <div className="text-left">
                                    <label>Last Name:</label>
                                    <input
                                        placeholder="Last Name*"
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                    />
                                    {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                                </div>

                                <div className="text-left col-span-2">
                                    <label>Email:</label>
                                    <input
                                        placeholder="Email*"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                    />
                                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                                </div>
                                <div className="col-span-2 justify-center pt-4 md:pt-8">
                                    <button type="submit" className="bg-black text-white rounded-full px-8 py-1 shadow-md">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                        <span className="flex place-items-end pt-2">
                            <p className="px-4 md:px-8 text-sm flex-1">By submitting, I agree to receive future communications from Mayberry Mini Trucks and I have read and agree to, Mayberry Mini Trucks Terms and Data Privacy Notice.</p>
                        </span>
                    </div>
                </div>
            </div>
        </form>
    );
};