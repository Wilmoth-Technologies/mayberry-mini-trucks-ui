export default function Footer() {
    return (
        <footer className="grid grid-cols-3 bg-grey-footer justify-center text-center text-white gap-y-3">
            <h1 className="col-span-3 text-xl md:text-3xl font-semibold">
                Proudly Serving the United States!
            </h1>
            <div className="col-span-3 flex md:text-2xl">
                <a href='/inventory' className="text-action-yello hover:opacity-80 w-1/3">
                    Inventory
                </a>
                <br />
                <a href='/contact' className="text-action-yello hover:opacity-80 w-1/3">
                    Contact Us
                </a>
                <a href='/faq' className="text-action-yello hover:opacity-80 w-1/3">
                    FAQ
                </a>
            </div>
            <div className="col-span-3 text-xs md:text-xl pl-6 md:col-span-2 text-left md:pt-9 md:pl-36">
                <div className="w-full flex">
                    <p className="font-bold w-5/12">
                        Address
                    </p>
                    <p className="w-7/12">
                        407 Snow Lane Mt Airy, NC 27030
                    </p>
                </div>
                <div className="w-full flex">
                    <p className="font-bold w-5/12">
                        Phone Number
                    </p>
                    <p className="w-7/12">
                        (336) 777-9957
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
                <p className="pb-1 md:pr-4">
                    Website Built & Maintained - © Wilmoth Technologies
                </p>
            </div>
        </footer>
    );
};