import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ErrorAlert } from "../shared/components/ErrorAlert";
import { IoArrowBackOutline } from "react-icons/io5";
import LoadingNonProvider from "../shared/components/LoadingNonProvider";
import axiosInstance from "../shared/AxiosConfig";
import Table from "../shared/components/datatable/Table";
import { useAccessToken } from "../shared/hooks/UseAccessToken";

export default function ManagementEmailList() {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState({ isError: false, errorMessage: "" });
    const [subscriberList, setSubscriberList] = useState([]);

    const getAccessToken = useAccessToken();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = await getAccessToken();
                const response = await axiosInstance.get('/management/getSubscriberList', { headers: { Authorization: `Bearer ${token}` }, });
                const formatedData = response.data.map(subscriber => {
                    const date = new Date(subscriber.subscribeDate);
                    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

                    return { ...subscriber, subscribeDate: formattedDate };
                })
                setSubscriberList(formatedData);

                setError({ isError: false });
            } catch (error) {
                setError({ isError: true, errorMessage: "Failed to Load Email Subscribers, Please Try Again." });
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: "First Name",
                accessor: "firstName",
            },
            {
                Header: "Last Name",
                accessor: "lastName",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Phone Number",
                accessor: "phoneNumber",
            },
            {
                Header: "Subscribe Date",
                accessor: "subscribeDate",
            }
        ],
        []
    );

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(JSON.stringify(subscriberList.map(subscriber => subscriber.email)).replaceAll("[", "").replaceAll("]", "").replaceAll("\"", ""));
            alert('Emails copied to clipboard');
        } catch (error) {
            console.error('Failed to copy: ', error);
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
                    Subscribed Users
                </h1>
            </div>
            {isError.isError ?
                <div className="px-8 pb-2">
                    <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError} />
                </div> : null
            }
            {!isLoading ?
                <div className="container mx-auto px-2 overflow-x-scroll">
                    <Table columns={columns} data={subscriberList} includeActions={false} includeSoldButton={false} includeFilters={false} includeCopyToClipboard={true} copyToClipboard={copyToClipboard} tableName={"EmailSubscribers"} />
                </div> : null
            }
        </>
    );
}