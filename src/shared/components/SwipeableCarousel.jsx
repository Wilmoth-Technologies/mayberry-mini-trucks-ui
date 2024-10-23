import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";


export default function SwipeableCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + images.length) % images.length
        );
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => next(),
        onSwipedRight: () => prev(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    return (
        <div className="relative" {...handlers}>
            <div className="overflow-hidden w-full h-72 sm:h-64 md:h-[400px] relative">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className={`absolute w-full h-full object-scale-down transition-transform duration-500 ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'
                            }`}
                        style={{
                            display: index === currentIndex ? 'block' : 'none',
                        }}
                    />
                ))}
                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded p-2 z-10"
                >
                    <IoChevronBackOutline className='text-4xl' />
                </button>
                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded p-2 z-10"
                >
                    <IoChevronForwardOutline className='text-4xl' />
                </button>
            </div>
        </div>
    );
};
