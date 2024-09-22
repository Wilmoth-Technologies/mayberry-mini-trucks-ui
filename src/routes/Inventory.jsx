import { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import InventoryCard from "../shared/components/inventory/InventoryCard";
import { TbTrash } from "react-icons/tb";

export default function Inventory() {

    let props = {
        "results": 599,
        "inventoryItems": [{
            "title": "1994 Honda Attack",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65848Z4114392",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65848Z4114393",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65848Z4114394",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65848Z4114395",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65848Z4114396",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65848Z4114397",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65848Z4114398",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65848Z4114399",
        },
        {
            "title": "1994 Honda Attack",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65148Z4114392",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL6584824114393",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65348Z4114394",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65845Z4114395",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65648Z4114396",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65847Z4114397",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65888Z4114398",
        },
        {
            "title": "1990 Suzuki Carry",
            "price": 6800,
            "mileage": 56000,
            "link": "/4Y1SL65849Z4114399",
        }
        ],
    };

    const [isKeiComparisonOpen, setKeiComparisonOpen] = useState(false);

    const keiComparisonClick = () => {
        setKeiComparisonOpen(prevKeiComparisonState => !prevKeiComparisonState);
    };

    //TODO: Implement Filtering Logic after API Setup...
    // const [showFilterModal, setShowFilterModal] = useState(false);

    return (
        <>
            {/* Header Background */}
            <div className="p-3">
                <div className="bg-inventory-kei-banner md:h-[700px] h-[400px] bg-cover bg-no-repeat -mt-14 bg-right md:bg-top drop-shadow-lg"></div>
            </div>

            {/* Kei Truck Comparison DropDown */}
            <div className="pb-1">
                <button className="flex px-3 gap-2 largerMobile:gap-4 items-center md:w-full md:justify-center" onClick={() => keiComparisonClick()}>
                    <h2 className="font-medium text-2xl">Kei Truck Comparison</h2>
                    <div className="bg-gray-300 h-0.5 w-16 largerMobile:w-28 md:w-96 rounded-full" />
                    <div className={"w-4 h-4 border-black border-r-2 border-b-2 transform -mt-2 " + (isKeiComparisonOpen ? '-rotate-135 mt-2' : 'rotate-45')} />
                </button>
                <div className={"flex-col border-border-gray border-2 border-t-0 mx-3 px-3 pb-3 overflow-auto " + (isKeiComparisonOpen ? '' : 'hidden')}>
                    <table className="table-auto md:w-full md:justify-center">
                        <thead>
                            <tr className="flex items-center justify-center place-items-center">
                                <th className="h-[150px] w-[190px]"><img className="h-[150px] w-[190px]" src="/Subaru.png" /></th>
                                <th className="h-[150px] w-[190px]"><img className="h-[150px] w-[190px]" src="/Suzuki.png" /></th>
                                <th className="h-[150px] w-[190px]"><img className="h-[150px] w-[190px]" src="/Honda.png" /></th>
                                <th className="h-[150px] w-[190px]"><img className="h-[150px] w-[190px]" src="/Mitsubishi.png" /></th>
                                <th className="h-[150px] w-[190px]"><img className="h-[150px] w-[190px]" src="/Daihatsu.png" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="flex text-center md:w-full md:justify-center">
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Est. Range</h3>
                                        <p>200 mi</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray ">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Est. Range</h3>
                                        <p>200 mi</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Est. Range</h3>
                                        <p>200 mi</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Est. Range</h3>
                                        <p>200 mi</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Est. Range</h3>
                                        <p>200 mi</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className="flex text-center md:w-full md:justify-center">
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Gross Weight</h3>
                                        <p>1,450 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Gross Weight</h3>
                                        <p>1,450 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Gross Weight</h3>
                                        <p>1,450 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Gross Weight</h3>
                                        <p>1,450 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Gross Weight</h3>
                                        <p>1,450 lbs</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className="flex text-center md:w-full md:justify-center">
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Drive Train</h3>
                                        <p>AWD</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Drive Train</h3>
                                        <p>AWD</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Drive Train</h3>
                                        <p>AWD</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Drive Train</h3>
                                        <p>AWD</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Drive Train</h3>
                                        <p>AWD</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className="flex text-center md:w-full md:justify-center">
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Load Capacity</h3>
                                        <p>770 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Load Capacity</h3>
                                        <p>770 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Load Capacity</h3>
                                        <p>770 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Load Capacity</h3>
                                        <p>770 lbs</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Load Capacity</h3>
                                        <p>770 lbs</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className="flex text-center md:w-full md:justify-center">
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Dump Offerings?</h3>
                                        <p>Yes</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Dump Offerings?</h3>
                                        <p>Yes</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Dump Offerings?</h3>
                                        <p>Yes</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Dump Offerings?</h3>
                                        <p>Yes</p>
                                    </div>
                                </td>
                                <td className="w-[190px] border border-border-gray">
                                    <div>
                                        <h3 className="text-gray-text text-center text-sm">Dump Offerings?</h3>
                                        <p>Yes</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Filtering Menu Mobile */}
            <div className="flex flex-col px-3 gap-y-1 md:hidden">
                <p className="text-xs font-semibold">{props.results} Results</p>
                <div className="flex gap-x-2">
                    <label className="relative block">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <svg className="h-5 w-5 fill-gray-600" viewBox="0 0 20 20"><path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            /></svg>
                        </span>
                        <input className="placeholder:italic placeholder:text-gray-text block bg-white w-auto largerMobile:w-72 border border-border-gray rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search Make, Model, or Keyword" type="text" name="search" />
                    </label>
                    <button className="flex items-center text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                        </svg>
                        <p className="pl-2">Filter</p>
                    </button>
                </div>
                <div className="flex gap-2 pt-2 items-center">
                    <button className="border border-border-gray rounded-full text-gray-text py-1 px-3 largerMobile:px-6">Make</button>
                    <button className="border border-border-gray rounded-full text-gray-text py-1 px-3 largerMobile:px-6">Model</button>
                    <button className="border border-border-gray rounded-full text-gray-text py-1 px-3 largerMobile:px-6">Price</button>
                    <button className="flex items-center gap-1">
                        <div className="w-2 h-2 border-black border-r-2 border-b-2 transform rotate-45 -mt-2" />
                        <p>Sort by price</p>
                    </button>
                </div>
            </div>

            {/* Filtering Menu Medium Screens and Above */}
            <div className="hidden md:grid md:grid-cols-[320px_auto] md:px-3 gap-3">
                {/* Filtering */}
                <div className="flex flex-col border border-x-border-gray">
                    <div className="flex w-full p-1 justify-between">
                        <p className="">Filters</p>
                        <button className="flex items-center">
                            <p className="pr-1">Clear All</p>
                            <TbTrash />
                        </button>
                    </div>
                    <div className="flex items-center border-y border-y-border-gray p-1 justify-between">
                        <p>Make</p>
                        <div className={"w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isKeiComparisonOpen ? '-rotate-135 mt-2' : 'rotate-45')} />
                        <div className="flex flex-row">
                            <div className="flex">
                                <input type="checkbox" id="some_id" />
                                <label htmlFor="some_id">This is the checkbox label</label>
                            </div>
                            {/* TODO: Figure out how to display the checkboxes on a new line from the Make Label.... */}
                        </div>
                    </div>
                    <div className="flex items-center border-y border-y-border-gray p-1">
                        <p>Model</p>
                        <div className="flex w-full justify-end">
                            <div className={"w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isKeiComparisonOpen ? '-rotate-135 mt-2' : 'rotate-45')} />
                        </div>
                    </div>
                    <div className="flex items-center border-y border-y-border-gray p-1">
                        <p>Price</p>
                        <div className="flex w-full justify-end">
                            <div className={"w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isKeiComparisonOpen ? '-rotate-135 mt-2' : 'rotate-45')} />
                        </div>
                    </div>
                    <div className="flex items-center border-y border-y-border-gray p-1">
                        <p>Year</p>
                        <div className="flex w-full justify-end">
                            <div className={"w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isKeiComparisonOpen ? '-rotate-135 mt-2' : 'rotate-45')} />
                        </div>
                    </div>
                    <div className="flex items-center border-y border-y-border-gray p-1">
                        <p>Mileage</p>
                        <div className="flex w-full justify-end">
                            <div className={"w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isKeiComparisonOpen ? '-rotate-135 mt-2' : 'rotate-45')} />
                        </div>
                    </div>
                    <div className="flex items-center border-y border-y-border-gray p-1">
                        <p>Engine</p>
                        <div className="flex w-full justify-end">
                            <div className={"w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isKeiComparisonOpen ? '-rotate-135 mt-2' : 'rotate-45')} />
                        </div>
                    </div>
                    <div className="flex items-center border-y border-y-border-gray p-1">
                        <p className="w-full">Drive Train</p>
                        <div className="flex w-full justify-end">
                            <div className={"w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isKeiComparisonOpen ? '-rotate-135 mt-2' : 'rotate-45')} />
                        </div>
                    </div>
                    <div className="flex items-center border-y border-y-border-gray p-1">
                        <p>Transmission</p>
                        <div className="flex w-full justify-end">
                            <div className={"w-3 h-3 border-black border-r-2 border-b-2 transform mr-1 " + (isKeiComparisonOpen ? '-rotate-135 mt-2' : 'rotate-45')} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="relative block">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <svg className="h-5 w-5 fill-gray-600" viewBox="0 0 20 20"><path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            /></svg>
                        </span>
                        <input className="placeholder:italic placeholder:text-gray-text block bg-search-background w-full border border-border-gray rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Search Make, Model, or Keyword" type="text" name="search" />
                    </label>
                    <p className="text-xs font-semibold">{props.results} Results</p>
                    {/* TODO: Fix where we are able to scale down and run into issues with card overlapping... Might need to add in a new viewport to cut the cols to 3... */}
                    <div className="p-3 rounded-lg grid grid-cols-4 gap-4 place-items-center">
                        {props.inventoryItems.map((inventoryItem) => (
                            <a key={inventoryItem.link} href={inventoryItem.link}>
                                <InventoryCard title={inventoryItem.title} price={inventoryItem.price} mileage={inventoryItem.mileage} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="md:hidden p-3 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
                {props.inventoryItems.map((inventoryItem) => (
                    <a key={inventoryItem.link} href={inventoryItem.link}>
                        <InventoryCard title={inventoryItem.title} price={inventoryItem.price} mileage={inventoryItem.mileage} />
                    </a>
                ))}
            </div>

            <ReactPaginate className="flex gap-6 items-center justify-center pt-4"
                previousLabel={<span>
                    <BsChevronLeft />
                </span>}
                nextLabel={<span>
                    <BsChevronRight />
                </span>}
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={38}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                // onPageChange={this.handlePageClick}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="border-black rounded-full border-2 p-0.5 h-8 w-8 text-center"
                // eslint-disable-next-line no-unused-vars
                hrefBuilder={(page, pageCount, selected) =>
                    page >= 1 && page <= pageCount ? `/page/${page}` : '#'
                }
                hrefAllControls
                // forcePage={currentPage}
                onClick={(clickEvent) => {
                    // console.log('onClick', clickEvent);
                    // Return false to prevent standard page change,
                    // return false; // --> Will do nothing.
                    // return a number to choose the next page,
                    // return 4; --> Will go to page 5 (index 4)
                    // return nothing (undefined) to let standard behavior take place.
                }}
            />

            {/* Newsletter Sub & Button */}
            {/* TODO: Move to Main and then render based on what route we are currently on... */}
            <div className="grid place-content-center p-3">
                <div className="flex text-center gap-3 items-center">
                    <p className="font-medium">Subscribe to learn about new arrivals and our latest news</p>
                    <Link className="bg-black rounded-full text-white text-center items-center font-medium text-nowrap px-4 h-8 pt-1">
                        STAY IN TOUCH
                    </Link>
                </div>
            </div>
        </>
    );
};