import { IoCloudDownloadOutline, IoAddCircleOutline, IoCaretDown, IoCaretUp } from "react-icons/io5";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { GlobalFilter } from "./GlobalFilter";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

export default function Table({ columns, data, deleteFunction, handleSoldCheckBoxChange, includeSoldInventory, includeActions = true, includeSoldButton = true, includeFilters = true, includeCopyToClipboard = false, copyToClipboard, tableName }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 20 }
        },
        useGlobalFilter,  // For Search
        useSortBy,        // For Sorting
        usePagination     // For Pagination
    );

    // Function to handle Excel export
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);  // Convert table data to worksheet
        const workbook = XLSX.utils.book_new();            // Create a new workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, tableName);  // Append worksheet to workbook
        XLSX.writeFile(workbook, `${tableName}.xlsx`);        // Export the workbook as an Excel file
    };

    return (
        <>
            <div className="flex gap-2 items-center pb-2 justify-between">
                <div className="flex gap-2 items-center">
                    <button onClick={exportToExcel} className="flex items-center gap-1 bg-black rounded-full text-white px-4 h-8 text-xl">
                        <IoCloudDownloadOutline />
                        Export
                    </button>
                    {/* Search input */}
                    {includeCopyToClipboard ?
                        <div>
                            <button onClick={copyToClipboard} className="flex items-center gap-1 bg-black rounded-full text-white px-4 h-8 text-xl">
                                <IoCopyOutline />
                                Copy Emails
                            </button>
                        </div>
                        : null}
                    {includeFilters ? <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> : null}
                    {includeSoldButton ? <div className="hidden col-span-2 md:flex flex-col justify-center">
                        <label>
                            <input
                                className="accent-black rounded-sm mr-1"
                                type="checkbox"
                                name="includeSoldInventory"
                                checked={includeSoldInventory}
                                onChange={handleSoldCheckBoxChange}
                            />
                            Include Sold Inventory
                        </label>
                    </div>
                        : null}

                </div>
                {includeFilters ?
                    <Link to="/management/add" className="hidden md:flex items-center gap-1 bg-black rounded-full text-white px-4 h-8 text-xl">
                        <IoAddCircleOutline />
                        Add
                    </Link>
                    : null}
            </div>
            <div className="flex gap-2 items-center pb-2">
                {includeFilters ?
                    <Link to="/management/add" className="flex md:hidden items-center gap-1 bg-black rounded-full text-white px-4 h-8 text-xl">
                        <IoAddCircleOutline />
                        Add
                    </Link>
                    : null}
                {includeSoldButton ? <div className="flex col-span-2 md:hidden flex-col justify-center">
                    <label>
                        <input
                            className="accent-black rounded-sm mr-1"
                            type="checkbox"
                            name="includeSoldInventory"
                            checked={includeSoldInventory}
                            onChange={handleSoldCheckBoxChange}
                        />
                        Include Sold Inventory
                    </label>
                </div> : null}

            </div>


            {/* Table */}
            <table {...getTableProps()} className="min-w-full bg-white border-x-2 border-gray-200">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className="px-4 py-3 border-b-2 border-t-2 border-gray-200 text-left font-semibold uppercase tracking-wider"
                                >
                                    <span className="flex items-center">
                                        {column.render("Header")}
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? <IoCaretDown />
                                                : <IoCaretUp />
                                            : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="hover:bg-gray-50">
                                {row.cells.map(cell => {
                                    if (cell.value === "action" && includeActions) {
                                        return (
                                            <td {...cell.getCellProps()}
                                                className="px-4 border-b-2 border-gray-200 text-sm">
                                                <div className="flex">
                                                    <Link to={"/management/edit/" + row.original.vin} className="px-2 text-2xl">
                                                        <MdOutlineEdit />
                                                    </Link>
                                                    <button className="px-2 text-2xl" onClick={() => deleteFunction(row.original.vin)}>
                                                        <IoTrashOutline />
                                                    </button>
                                                </div>

                                                {cell.render("Cell")}
                                            </td>
                                        )
                                    } else {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                className="px-4 border-b-2 border-gray-200 text-sm"
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center py-3">
                <div className="flex items-center">
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="px-4 py-2 disabled:text-gray-300"
                    >
                        <BsChevronLeft />
                    </button>
                    <span>
                        Page{" "}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{" "}
                    </span>
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="px-4 py-2 disabled:text-gray-300"
                    >
                        <BsChevronRight />
                    </button>
                </div>

                <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                    className="ml-2 border border-gray-300 rounded p-1"
                >
                    {[20, 40, 80, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};