import { Link } from "react-router-dom";
import InventoryCard from "./InventoryCard.jsx";

export default function InventoryScroller({ inventory }) {

    return (
        <div className="bg-grey-footer p-2 rounded-lg grid auto-cols grid-flow-col overflow-x-auto gap-2">
            {inventory.map((item) => (
                <Link key={item.vin} to={"/inventory/" + item.vin}>
                    <InventoryCard year={item.year} make={item.make} model={item.model} price={item.price} mileage={item.mileage} status={item.status} imgLink={item.imageLinks} />
                </Link>
            ))}
        </div>
    );
};