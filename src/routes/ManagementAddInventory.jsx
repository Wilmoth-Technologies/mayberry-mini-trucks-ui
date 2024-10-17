import { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { FileInput, Label } from "flowbite-react";

export default function ManagementAddInventory() {
    const [selectedMakeModel, setSelectedMakeModel] = useState("");
    const vin = "JHMSZ742XDC128218";

    return (
        <>
            {/* Header */}
            <div className="p-3">
                <Link to={'/management'} className="hidden md:flex items-center md:col-span-2 -mb-9">
                    <IoArrowBackOutline />
                    <p>Back to Admin Options</p>
                </Link>
                <h1 className="text-center text-2xl border-b-2 font-semibold pt-2 mx-6">
                    Add Inventory
                </h1>
            </div>
            {/* Make & Model */}
            <div className="grid grid-cols-2 gap-4 md:gap-2 lg:gap-4 p-4 items-center text-center md:grid-cols-6">
                <h2 className="col-span-2 font-medium text-xl md:col-span-6 md:text-left">Make & Model</h2>
                <img id="subaru" className={"h-[130px] w-[160px] " + (selectedMakeModel == "Subaru" ? 'border-action-yellow border-2 rounded-md' : '')} src="/Subaru.png" onClick={() => setSelectedMakeModel("Subaru")} />
                <img className={"h-[130px] w-[160px] " + (selectedMakeModel == "Suzuki" ? 'border-action-yellow border-2 rounded-md' : '')} src="/Suzuki.png" onClick={() => setSelectedMakeModel("Suzuki")} />
                <img className={"h-[130px] w-[160px] " + (selectedMakeModel == "Honda" ? 'border-action-yellow border-2 rounded-md' : '')} src="/Honda.png" onClick={() => setSelectedMakeModel("Honda")} />
                <img className={"h-[130px] w-[160px] " + (selectedMakeModel == "Mitsubishi" ? 'border-action-yellow border-2 rounded-md' : '')} src="/Mitsubishi.png" onClick={() => setSelectedMakeModel("Mitsubishi")} />
                <img className={"h-[130px] w-[160px] " + (selectedMakeModel == "Daihatsu" ? 'border-action-yellow border-2 rounded-md' : '')} src="/Daihatsu.png" onClick={() => setSelectedMakeModel("Daihatsu")} />
                <div className={"flex flex-col items-center gap-y-2 " + (selectedMakeModel == "Other" ? 'border-action-yellow border-2 rounded-md' : '')} onClick={() => setSelectedMakeModel("Other")}>
                    <h2 className="text-lg font-medium">Other:</h2>
                    <label className="grid grid-cols-1 gap-2 px-2 pb-2">
                        <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Make" type="text" name="make" />
                        <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Model" type="text" name="model" />
                    </label>
                </div>
            </div>
            {/* Details */}
            <div className="grid grid-cols-2 gap-2 items-center p-4">
                <h2 className="col-span-2 font-medium text-xl text-center md:text-left">Details</h2>
                <div className="flex flex-col">
                    <p className="text-lg">Year</p>
                    <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Year*" type="text" name="year" />
                </div>
                <div className="flex flex-col">
                    <p className="text-lg">Exterior Color</p>
                    <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Exterior Color*" type="text" name="exteriorColor" />
                </div>
                <div className="flex flex-col">
                    <p className="text-lg">Interior Color</p>
                    <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Interior Color*" type="text" name="interiorColor" />
                </div>
                <div className="flex flex-col">
                    <p className="text-lg">VIN</p>
                    <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="VIN*" type="text" name="vin" />
                </div>
                <div className="flex flex-col">
                    <p className="text-lg">Shipment Number</p>
                    <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Shipment Number*" type="text" name="shipmentNumber" />
                </div>
                <div className="flex flex-col">
                    <p className="text-lg">Stock Number</p>
                    <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Stock Number*" type="text" name="stockNumber" />
                </div>
                <div className="flex flex-col">
                    <p className="text-lg">Mileage</p>
                    <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Mileage*" type="text" name="mileage" />
                </div>
                <div className="flex flex-col">
                    <p className="text-lg">Transmission</p>
                    <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Transmission*" type="text" name="transmission" />
                </div>
                <div className="flex flex-col">
                    <p className="text-lg">Engine</p>
                    <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Engine*" type="text" name="engine" />
                </div>
                <div className="flex flex-col">
                    <p className="text-lg">Price</p>
                    <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Price*" type="text" name="price" />
                </div>
                <div className="col-span-2 flex flex-col">
                    <p className="text-lg">Description</p>
                    <textarea className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 col-span-2 resize-y h-72" placeholder="Description*" type="text" required name="description" />
                </div>
            </div>
            {/* Options */}
            <div className="grid grid-cols-2 gap-2 items-center p-4 text-center md:grid-cols-6">
                <h2 className="col-span-2 font-medium text-xl md:col-span-6 md:text-left">Options</h2>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="2wd" />
                    <label className="px-1" htmlFor="2wd">2WD</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="4x4" />
                    <label className="px-1" htmlFor="4x4">4x4</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="awd" />
                    <label className="px-1" htmlFor="awd">AWD</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="airbags" />
                    <label className="px-1" htmlFor="airbags">Airbags</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="ac" />
                    <label className="px-1" htmlFor="ac">A/C</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="crane" />
                    <label className="px-1" htmlFor="crane">Crane</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="diesel" />
                    <label className="px-1" htmlFor="diesel">Diesel</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="diffLock" />
                    <label className="px-1" htmlFor="diffLock">Diff Lock</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="dump" />
                    <label className="px-1" htmlFor="dump">Dump</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="exLow1" />
                    <label className="px-1" htmlFor="exLow1">Ex Low 1</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="fireTruck" />
                    <label className="px-1" htmlFor="fireTruck">Fire Truck</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="fuelInjected" />
                    <label className="px-1" htmlFor="fuelInjected">Fuel injected</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="hiLow" />
                    <label className="px-1" htmlFor="hiLow">Hi/Low</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="powerLocks" />
                    <label className="px-1" htmlFor="powerLocks">Power Locks</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="powerMirrors" />
                    <label className="px-1" htmlFor="powerMirrors">Power Mirrors</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="powerSteering" />
                    <label className="px-1" htmlFor="powerSteering">Power Steering</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="powerWindows" />
                    <label className="px-1" htmlFor="powerWindows">Power Windows</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="scissorLift" />
                    <label className="px-1" htmlFor="scissorLift">Scissor Lift</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="supercharged" />
                    <label className="px-1" htmlFor="supercharged">Supercharged</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="turbo" />
                    <label className="px-1" htmlFor="turbo">Turbo</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="uttraLow1" />
                    <label className="px-1" htmlFor="uttraLow1">Ultra Low 1</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="ultraLowReverse" />
                    <label className="px-1" htmlFor="ultraLowReverse">Ultra Low Reverse</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="van" />
                    <label className="px-1" htmlFor="van">Van</label>
                </div>
                <div className="flex items-center">
                    <input className="accent-black rounded-sm" type="checkbox" id="vanWDeck" />
                    <label className="px-1" htmlFor="vanWDeck">Van w Deck</label>
                </div>
            </div>
            {/* Photos */}
            <div className="grid grid-cols-1 gap-2 items-center p-4 text-center">
                <h2 className="font-medium text-xl md:text-left">Photos</h2>
                {/* <div>
                    Drag and Drop IMG... Create Custom Component...
                </div> */}
                <div className="flex w-full items-center justify-center">
                    <Label
                        htmlFor="dropzone-file"
                        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <svg
                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG</p>
                        </div>
                        <FileInput id="dropzone-file" className="hidden" />
                    </Label>
                </div>
            </div>
            {/* Preview */}
            <div className="flex items-center justify-center pb-3">
                <Link to={"/management/add/" + vin} className="bg-black rounded-full text-white text-center items-center font-medium text-nowrap px-8 py-1">
                    Preview
                </Link>
            </div>
        </>
    );
}