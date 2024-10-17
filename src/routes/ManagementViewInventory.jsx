import { useMemo } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Table from "../shared/components/datatable/Table";


export default function ManagementViewInventory() {

    const data = useMemo(
        () => [
            { vin: "JHMSZ742XDC128218", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821a", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821d", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821f", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821g", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821w", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821b", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821v", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821x", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821z", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821i", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821o", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821l", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742XDC12821m", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ742Xkj12821m", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ74213DC12821m", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ74asXDC12821m", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ2kaDC12821m", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ741XDC12821m", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ242XDC12821m", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZiyuqwe2821m", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "JHMSZ879uo12821m", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
            { vin: "Jbdy1ih42XDC12821m", shipmentNumber: "ABC-123", stockNumber: "AARR-1234", purchaseDate: "08/26/2024", make: "Suzuki", model: "Carry", year: "1991", price: "$6,800", mileage: "31,598 Mi", actions: "action" },
        ],
        []
    );

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
            <div className="container mx-auto px-2 overflow-x-scroll">
                <Table columns={columns} data={data} />
            </div>
        </>
    );
}