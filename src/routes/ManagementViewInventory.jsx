import { useMemo, useState, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Table from "../shared/components/datatable/Table";
import axiosInstance from "../shared/AxiosConfig";
import { ErrorAlert } from "../shared/components/ErrorAlert";
import { CURRENCY_FORMAT_STYLE } from "../shared/AppConstants";
import { numberFormatter, milageFormatter } from "../shared/AppFunctions";
import LoadingNonProvider from "../shared/components/LoadingNonProvider";

export default function ManagementViewInventory() {
    const [fullInventory, setFullInventory] = useState([]);
    const [notSoldInventory, setNotSoldInventory] = useState([]);
    const [isError, setError] = useState({ isError: false, errorMessage: "" });
    const [isDeleteApiTriggered, setDeleteApiTrigger] = useState("");
    const [includeSoldInventory, setIncludeSoldInventory] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleSoldCheckBoxChange = (event) => {
        setIncludeSoldInventory(event.target.checked);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/management/getAllInventory');
                setFullInventory(response.data.map(inventoryItem => {
                    return {
                        ...inventoryItem,
                        price: numberFormatter(CURRENCY_FORMAT_STYLE, 2).format(inventoryItem.price),
                        mileage: (milageFormatter().format(inventoryItem.mileage).toString() + ' mi'),
                    }
                }));
                setNotSoldInventory(response.data.filter((inventory) => inventory.status != 'Sold').map(inventoryItem => {
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
                setLoading(false);
            }
        };

        fetchData();
    }, [isDeleteApiTriggered]);

    const handleDeleteClick = async (vin) => {
        try {
            setLoading(true);
            await axiosInstance.delete('/management/deleteInventory', { params: { vin: vin } });
            setError({ isError: false })
        } catch (error) {
            setError({ isError: true, errorMessage: "Failed to Delete Inventory, Please Try Again." })
            console.error(error.response
                ? error.response.data.message
                : error.message)
        } finally {
            setDeleteApiTrigger(vin);
            setLoading(false);
        }
    }

    const columns = useMemo(
        () => [
            {
                Header: "VIN",
                accessor: "vin",
            },
            {
                Header: "Stock Number",
                accessor: "stockNumber",
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
                Header: "Model Code",
                accessor: "modelCode",
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
                Header: "Purchase Date",
                accessor: "purchaseDate",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Title In Hand",
                accessor: "titleInHand",
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
            {isLoading ? <LoadingNonProvider /> : null}
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
                    <Table columns={columns} data={includeSoldInventory ? fullInventory : notSoldInventory} deleteFunction={handleDeleteClick} handleSoldCheckBoxChange={handleSoldCheckBoxChange} includeSoldInventory={includeSoldInventory} tableName={"Inventory"} />
                </div> : null
            }
        </>
    );

}