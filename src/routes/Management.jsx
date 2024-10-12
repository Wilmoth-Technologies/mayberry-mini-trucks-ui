import { RiFileAddLine } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Management() {
    return (
        <>
            <div className="">
                <div className="bg-kei-hauler md:h-[700px] h-[400px] bg-cover bg-no-repeat -mt-14 bg-right md:bg-top drop-shadow-lg">
                    <div className="grid grid-cols-2 justify-center items-center h-full gap-4 px-8 text-center text-white text-3xl md:gap-16 md:px-36 lg:px-72">
                        <Link to="/management/add" className="bg-black bg-opacity-55 backdrop-blur-sm rounded-md p-3">
                            <p>Add</p>
                            <div className="flex justify-center py-2">
                                <RiFileAddLine className="text-5xl" />
                            </div>
                            <p>Inventory</p>
                        </Link>
                        <Link to="" className="bg-black bg-opacity-55 backdrop-blur-sm rounded-md p-3">
                            <p>Modify</p>
                            <div className="flex justify-center py-2">
                                <IoSettingsSharp className="text-5xl" />
                            </div>
                            <p>Inventory</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}