import { MapLink } from "./MapLink";

export default function Footer() {
    return (
        <footer className="grid grid-cols-3 bg-grey-footer justify-center text-center text-white gap-y-3">
            <h1 className="col-span-3 text-xl md:text-3xl font-semibold">
                Proudly Serving the United States!
            </h1>
            <div className="col-span-3 flex md:text-2xl">
                <a href='/inventory' className="text-action-yellow hover:opacity-80 w-1/3">
                    Inventory
                </a>
                <br />
                <a href='/contact' className="text-action-yellow hover:opacity-80 w-1/3">
                    Contact Us
                </a>
                <a href='/faq' className="text-action-yellow hover:opacity-80 w-1/3">
                    FAQ
                </a>
            </div>
            <div className="col-span-3 text-xs md:text-xl pl-6 md:col-span-2 text-left md:pt-9 md:pl-36">
                <div className="w-full flex">
                    <p className="font-bold w-5/12">
                        Address
                    </p>
                    <MapLink className="w-7/12" />
                </div>
                <div className="w-full flex">
                    <p className="font-bold w-5/12">
                        Phone Number
                    </p>
                    <p className="w-7/12">
                        (336) 970-3885
                    </p>
                </div>
                <div className="w-full flex">
                    <p className="font-bold w-5/12">
                        Email
                    </p>
                    <p className="w-7/12">
                        sales@mayberryminitrucks.com
                    </p>
                </div>
                <div className="w-full flex">
                    <p className="font-bold w-5/12">
                        Hours of Opperation
                    </p>
                    <p className="w-7/12">
                        Wednesday-Saturday | 9am-5pm
                    </p>
                </div>
            </div>
            <div className='col-span-3 md:col-span-1 bg-kei-footer h-[210px] bg-contain bg-no-repeat bg-center' />
            <div className="col-span-3 text-xs md:text-base md:flex">
                <p className="md:text-left md:pl-4 md:flex-1">
                    © 2024 Mayberry Mini Trucks
                </p>
                <a
                    href="https://wilmothtechnologyservices.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pb-1 md:pr-4 no-underline hover:underline"
                >
                    Website Built & Maintained - © Wilmoth Technology Services LLC
                </a>
            </div>
        </footer>
    );
};