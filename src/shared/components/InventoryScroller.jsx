import InventoryCard from "./inventory/InventoryCard.jsx";

export default function InventoryScroller() {

    let props = [{
        "title": "1994 Honda Attack",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z411439",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z411439",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z411439",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z411439",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z411439",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z411439",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z411439",
    },
    {
        "title": "1990 Suzuki Carry",
        "price": 6800,
        "mileage": 56000,
        "link": "/4Y1SL65848Z411439",
    }];

    return (
        <div className="bg-grey-footer p-2 rounded-lg grid auto-cols grid-flow-col overflow-x-auto gap-2">
            {props.map((inventoryItem) => (
                <a href={inventoryItem.link}>
                    <InventoryCard title={inventoryItem.title} price={inventoryItem.price} mileage={inventoryItem.mileage} />
                </a>
            ))}
        </div>
    );
};