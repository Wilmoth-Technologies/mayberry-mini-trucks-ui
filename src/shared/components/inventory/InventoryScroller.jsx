import { Link } from "react-router-dom";
import InventoryCard from "./InventoryCard.jsx";

export default function InventoryScroller() {

    let props = [{
        "title": "1994 Honda Attack",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z4114392",
        "status": "Pending Sale",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z4114393",
        "status": "Pending Sale",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z4114394",
        "status": "inStock",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z4114395",
        "status": "inStock",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z4114396",
        "status": "inStock",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z4114397",
        "status": "inStock",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z4114398",
        "status": "inStock",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z4114399",
        "status": "inStock",
    }];

    return (
        <div className="bg-grey-footer p-2 rounded-lg grid auto-cols grid-flow-col overflow-x-auto gap-2">
            {props.map((inventoryItem) => (
                <Link key={inventoryItem.link} to={"/inventory" + inventoryItem.link}>
                    <InventoryCard title={inventoryItem.title} price={inventoryItem.price} mileage={inventoryItem.mileage} status={inventoryItem.status} />
                </Link>
            ))}
        </div>
    );
};