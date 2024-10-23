import { useMemo, useState, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Table from "../shared/components/datatable/Table";
import axiosInstance from "../shared/AxiosConfig";
import { useLoading } from "../shared/providers/Loading";
import { ErrorAlert } from "../shared/components/ErrorAlert";
import { CURRENCY_FORMAT_STYLE } from "../shared/AppConstants";
import { numberFormatter, milageFormatter } from "../shared/AppFunctions";

export default function ManagementViewInventory() {
    const { showLoading, hideLoading, isLoading } = useLoading();
    const [inventory, setInventory] = useState([]);
    const [isError, setError] = useState({ isError: false, errorMessage: "" });
    const [isDeleteApiTriggered, setDeleteApiTrigger] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Show Loading in View Inv");
                showLoading();
                const response = await axiosInstance.get('/management/getAllInventory');

                setInventory(response.data.map(inventoryItem => {
                    return {
                        ...inventoryItem,
                        price: numberFormatter(CURRENCY_FORMAT_STYLE, 2).format(inventoryItem.price),
                        mileage: (milageFormatter().format(inventoryItem.mileage).toString() + ' mi'),
                    }
                }));
                setError({ isError: false });
            } catch (error) {
                setError({ isError: true, errorMessage: "Failed to Load Inventory, Please Try Again." });
                console.error(error.response
                    ? error.response.data.message
                    : error.message)
            } finally {
                console.log("Hide Loading in View Inv");
                hideLoading();
            }
        };

        fetchData();
    }, [isDeleteApiTriggered]);

    const handleDeleteClick = async (vin) => {
        try {
            showLoading();
            await axiosInstance.delete('/management/deleteInventory', { params: { vin: vin } });
            setError({ isError: false })
        } catch (error) {
            setError({ isError: true, errorMessage: "Failed to Delete Inventory, Please Try Again." })
            console.error(error.response
                ? error.response.data.message
                : error.message)
        } finally {
            setDeleteApiTrigger(vin);
            hideLoading();
        }
    }

    const columns = useMemo(
        () => [
            {
                Header: "VIN",
                accessor: "vin",
            },
            {
                Header: "Shipment Number",
                accessor: "shipmentNumber",
            },
            {
                Header: "Stock number",
                accessor: "stockNumber",
            },
            {
                Header: "Purchase Date",
                accessor: "purchaseDate",
            },
            {
                Header: "Make",
                accessor: "make",
            },
            {
                Header: "Model",
                accessor: "model",
            },
            {
                Header: "Year",
                accessor: "year",
            },
            {
                Header: "Price",
                accessor: "price",
            },
            {
                Header: "Mileage",
                accessor: "mileage",
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

    return (
        <>
            {/* Header */}
            <div className="p-3">
                <Link to={'/management'} className="hidden md:flex items-center md:col-span-2 -mb-9">
                    <IoArrowBackOutline />
                    <p>Back to Admin Options</p>
                </Link>
                <h1 className="text-center text-2xl border-b-2 font-semibold pt-2 mx-6">
                    View Inventory
                </h1>
            </div>
            {isError.isError ?
                <div className="px-8 pb-2">
                    <ErrorAlert errorMessage={isError.errorMessage} dismissFunction={setError} />
                </div> : null
            }
            {!isLoading ?
                <div className="container mx-auto px-2 overflow-x-scroll">
                    <Table columns={columns} data={inventory} deleteFunction={handleDeleteClick} />
                </div> : null
            }
        </>
    );

}