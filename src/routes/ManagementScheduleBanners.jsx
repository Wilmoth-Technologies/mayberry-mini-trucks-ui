import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ErrorAlert } from "../shared/components/ErrorAlert";
import { IoArrowBackOutline } from "react-icons/io5";
import LoadingNonProvider from "../shared/components/LoadingNonProvider";
import axiosInstance from "../shared/AxiosConfig";
import Table from "../shared/components/datatable/Table";
import DatePicker from "react-datepicker";
import { Label, Textarea } from "flowbite-react";
import 'react-datepicker/dist/react-datepicker.css';
import { SuccessAlert } from "../shared/components/SuccessAlert";
import { useAccessToken } from "../shared/hooks/UseAccessToken";


export default function ManagementScheduleBanners() {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState({ isError: false, errorMessage: "" });
    const [isAddError, setAddError] = useState({ isError: false, errorMessage: "" });
    const [isDeleteError, setDeleteError] = useState({ isError: false, errorMessage: "" });
    const [notificationList, setNotificationList] = useState([]);
    const [isDeleteApiTriggered, setDeleteApiTrigger] = useState("");
    const [isAddApiTriggered, setAddApiTrigger] = useState("");
    const [formData, setFormData] = useState({
        startDate: null,
        endDate: null,
        description: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [isSuccess, setSuccess] = useState({ isAlertOpen: false, message: "" });
    const getAccessToken = useAccessToken();

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newValidationErrors = {};

        if (!formData.startDate) newValidationErrors.startDate = 'Start date is required';
        if (!formData.endDate) newValidationErrors.endDate = 'End date is required';
        if (formData.startDate && formData.endDate && formData.startDate > formData.endDate)
            newValidationErrors.endDate = 'End date cannot be before start date';
        if (!formData.description.trim()) newValidationErrors.description = 'Description is required';

        setValidationErrors(newValidationErrors);
        return Object.keys(newValidationErrors).length === 0;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = await getAccessToken();
                const response = await axiosInstance.get('/management/getNotificationList', { headers: { Authorization: `Bearer ${token}` }, });
                setNotificationList(response.data);

                setError({ isError: false });
            } catch (error) {
                setError({ isError: true, errorMessage: "Failed to Load Existing Notifications, Please Try Again." });
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isDeleteApiTriggered, isAddApiTriggered]);

    const columns = useMemo(
        () => [
            {
                Header: "Start Date",
                accessor: "startDate",
            },
            {
                Header: "End Date",
                accessor: "endDate",
            },
            {
                Header: "Description",
                accessor: "description",
            },
            {
                accessor: "actions",
                Cell: ({ value }) => (
                    <>
                    </>
                ),
            },
        ],
        []
    );

    const handleDeleteClick = async (id) => {
        try {
            setLoading(true);
            setNotificationList([]);
            const token = await getAccessToken();
            await axiosInstance.delete('/management/deleteNotification', { params: { id: id }, headers: { Authorization: `Bearer ${token}` }, });
            setDeleteError({ isError: false })
        } catch (error) {
            setDeleteError({ isError: true, errorMessage: "Failed to Delete Notification, Please Try Again." })
            console.error(error.response
                ? error.response.data.message
                : error.message)
        } finally {
            setDeleteApiTrigger(id);
            setLoading(false);
        }
    }

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setLoading(true);
                const token = await getAccessToken();
                const response = await axiosInstance.post('/management/addNotification', {
                    ...formData,
                    startDate: formData.startDate.toISOString().split('T')[0],
                    endDate: formData.endDate.toISOString().split('T')[0],
                }, { headers: { Authorization: `Bearer ${token}` }});
                setSuccess({ isAlertOpen: true, message: `Successfully added Notification for Dates: ${formatDate(formData.startDate)} - ${formatDate(formData.endDate)}.` });
                setAddError({ isError: false })
            } catch (error) {
                setAddError({ isError: true, errorMessage: "Failed to Add Notification, Please Try Again." })
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {
                setAddApiTrigger(JSON.stringify(formData));
                setLoading(false);
            }
        }
    };

    return (
        <>
            {isLoading ? <LoadingNonProvider /> : null}
            {/* Header */}
            <div className="p-3">
                <Link to={'/management'} className="hidden md:flex items-center md:col-span-2 -mb-9">
                    <IoArrowBackOutline />
                    <p>Back to Admin Options</p>
                </Link>
                <h1 className="text-center text-2xl border-b-2 font-semibold pt-2 mx-6">
                    Schedule Banner Alerts
                </h1>
            </div>
            {isSuccess.isAlertOpen ?
                <div className="px-3 pb-2">
                    <SuccessAlert message={isSuccess.message} dismissFunction={setSuccess} />
                </div> : null}
            {isError.isError ?
                <div className="px-3 pb-2">
                    <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError} />
                </div> : null
            }
            {isDeleteError.isError ?
                <div className="px-3 pb-2">
                    <ErrorAlert errorMessage={isDeleteError.errorMessage} dismissFunction={setDeleteError} />
                </div> : null
            }
            {isAddError.isError ?
                <div className="px-3 pb-2">
                    <ErrorAlert errorMessage={isAddError.errorMessage} dismissFunction={setAddError} />
                </div> : null
            }
            {!isLoading ?
                <div className="container mx-auto px-2 overflow-x-scroll">
                    <Table columns={columns} data={notificationList} deleteFunction={handleDeleteClick} includeSoldButton={false} includeFilters={false} tableName={"Notifications"} />
                </div> : null
            }
            <h2 className="text-center text-2xl border-b-2 font-semibold pt-2 mx-6">Add Scheduled Banner</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-4 bg-white rounded-md shadow-md">
                <div className="flex flex-col">
                    <Label htmlFor="startDate" value="Start Date" />
                    <DatePicker
                        selected={formData.startDate}
                        onChange={(date) => handleChange('startDate', date)}
                        minDate={new Date()}
                        placeholderText="Select start date"
                        className="mt-1 p-2 border rounded-md w-full text-gray-700"
                    />
                    {validationErrors.startDate && <p className="text-red-500 text-sm">{validationErrors.startDate}</p>}
                </div>

                <div className="flex flex-col">
                    <Label htmlFor="endDate" value="End Date" />
                    <DatePicker
                        selected={formData.endDate}
                        onChange={(date) => handleChange('endDate', date)}
                        minDate={formData.startDate || new Date()}
                        placeholderText="Select end date"
                        className="mt-1 p-2 border rounded-md w-full text-gray-700"
                    />
                    {validationErrors.endDate && <p className="text-red-500 text-sm">{validationErrors.endDate}</p>}
                </div>

                <div>
                    <Label htmlFor="description" value="Description" />
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter description here"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        required
                        className="mt-1"
                    />
                    {validationErrors.description && <p className="text-red-500 text-sm">{validationErrors.description}</p>}
                </div>

                <button type="submit" className="mt-4 bg-black disabled:bg-gray-400 disabled:line-through rounded-full text-white text-center items-center font-medium text-nowrap px-8 py-1">
                    Submit
                </button>
            </form>
        </>
    );
}