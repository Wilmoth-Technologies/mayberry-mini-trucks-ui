import { IoCloseOutline } from "react-icons/io5";

export default function EmailSubscriptionModal({ onClose }) {

    const handleClose = (event) => {
        if (event.target.id === 'wrapper') onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex justify-center items-center" id="wrapper" onClick={handleClose}>
            <div className="grid grid-cols-2 bg-modal-background rounded-lg h-[600px] w-[1200px]">
                <div className="bg-modal-kei-standoff object-cover rounded-s-md">
                </div>
                <div>
                    <span className="col-span-2 flex justify-end">
                        <IoCloseOutline className="text-4xl" onClick={() => onClose()} />
                    </span>
                    <div className="grid grid-cols-2 gap-16 px-8 pt-8">
                        <h1 className="col-span-2 text-2xl font-medium">We'll update you on the latest from Mayberry from new arrivals to our latest news</h1>
                        <div className="grid grid-cols-2 gap-2 text-center col-span-2">
                            <label className="grid grid-cols-2 col-span-2 gap-2">
                                <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="First Name*" type="text" required name="firstName" />
                                <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Last Name*" type="text" required name="lastName" />
                                <input className="placeholder:italic placeholder:text-gray-text bg-search-background border border-border-gray rounded-md py-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 col-span-2" placeholder="Email*" type="email" required name="email" />
                            </label>
                            <div className="col-span-2 justify-center pt-8">
                                <button className="bg-black text-white rounded-full px-8 py-1 shadow-md">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                    <span className="flex place-items-end">
                        <p className="px-8 text-sm flex-1">By submitting, I agree to receive future communications from Mayberry Mini Trucks and I have read and agree to, Mayberry Mini Trucks Terms and Data Privacy Notice.</p>
                    </span>
                </div>
            </div>
        </div>
    );
};