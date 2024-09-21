import { Link } from "react-router-dom";
import InventoryCard from "../shared/components/inventory/InventoryCard";

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
        }],
    };

    return (
        <>
            <div className="p-3">
                <div className="bg-inventory-kei-banner md:h-[700px] h-[400px] bg-cover bg-no-repeat -mt-14 bg-right md:bg-top drop-shadow-lg"></div>
            </div>

            <div className="flex px-3 gap-2 largerMobile:gap-4 items-center">
                <h2 className="font-medium text-2xl">Kei Truck Comparison</h2>
                <div className="bg-gray-500 h-0.5 w-16 largerMobile:w-28 rounded-full" />
                <div className="w-4 h-4 border-black border-r-2 border-b-2 transform rotate-45 -mt-2" />
            </div>

            <div className="flex flex-col px-3 gap-y-1">
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

            <div className="p-3 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
                {props.inventoryItems.map((inventoryItem) => (
                    <a key={inventoryItem.link} href={inventoryItem.link}>
                        <InventoryCard title={inventoryItem.title} price={inventoryItem.price} mileage={inventoryItem.mileage} />
                    </a>
                ))}
            </div>

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