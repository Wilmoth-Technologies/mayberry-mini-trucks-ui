import { IoCloseOutline } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";

export default function YouTubePopover({ onClose, youtubeUrl }) {
    const handleClose = (event) => {
        if (event.target.id === 'wrapper') onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 flex justify-center items-center p-4" id="wrapper" onClick={handleClose}>
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
                <button 
                    className="absolute top-4 right-4 z-40 p-1 hover:bg-white rounded-full transition-colors"
                    onClick={() => onClose()}
                    aria-label="Close"
                >
                    <IoCloseOutline className="text-white text-2xl hover:text-black" />
                </button>
                
                <div className="bg-gradient-to-br from-red-600 to-red-700 px-6 py-8 text-center">
                    <FaYoutube className="text-white text-6xl mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Check out our YouTube</h2>
                </div>
                
                <div className="px-6 py-6 space-y-3">
                    <p className="text-lg md:text-xl text-black font-semibold leading-relaxed">
                        Track new arrivals before they're listed on the website and get the latest from Mayberry Mini Trucks.
                    </p>
                    <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-6 py-3 transition-colors duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        onClick={() => onClose()}
                    >
                        <FaYoutube className="text-xl" />
                        <span>Visit Our YouTube Channel</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
