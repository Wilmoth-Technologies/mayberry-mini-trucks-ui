//TODO: Build out a component that will allow them to select a date and time for a banner to go live + the content of the banner.
//Additionally, on this page they should be able to see the banners they have scheduled and make edits to said banners.
//This can all be done via a form and when they click on edit for a specific banner, then populate the form inputs with the details of said banner.
//Upon saving, update the table via a re-call of the API and clear the form upon success....

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ErrorAlert } from "../shared/components/ErrorAlert";
import { IoArrowBackOutline } from "react-icons/io5";
import LoadingNonProvider from "../shared/components/LoadingNonProvider";

export default function ManagementScheduleBanners() {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState({ isError: false, errorMessage: "" });

    return(
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
            {isError.isError ?
                <div className="px-8 pb-2">
                    <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError} />
                </div> : null
            }
            {/* {!isLoading ?
                <div className="container mx-auto px-2 overflow-x-scroll">
                    <Table columns={columns} data={includeSoldInventory ? fullInventory : notSoldInventory} deleteFunction={handleDeleteClick} handleSoldCheckBoxChange={handleSoldCheckBoxChange} includeSoldInventory={includeSoldInventory} />
                </div> : null
            } */}
        </>
    );
}