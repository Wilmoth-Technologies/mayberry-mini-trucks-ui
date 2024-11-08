export default function Lenders() {

    return (
        <div className="grid grid-cols-2 pt-4 px-3 gap-3 pb-4">
            <div className="col-span-2">
                <h1 className="text-center text-3xl font-semibold pb-2">Lending Services</h1>
                <p className="text-lg">We provide several options for auto loans.  Please select the lender that is best suited for your needs to find out more information.</p>
                <hr />
            </div>
            <a className="justify-center text-center content-center" href="https://woodsidecredit.com/" >
                <div className="flex flex-col md:px-5">
                    <img src="/Woodside-Credit.webp" />
                </div>
                <p className="text-2xl font-medium pt-1">Woodside Credit</p>
                <p>Minimum Loan of $10,000</p>
            </a>
            <a className="justify-center text-center content-center" href="https://www.lightstream.com/used-car-loans?cid=AA-14122&cid=AA|DSK|P|used_car_loan|E|AFF|fact=14122&irad=88389&fact=14122&irmp=2259009&isredirect=True">
                <div className="flex flex-col md:px-5">
                    <img src="/LightStream-Credit.webp" />
                </div>
                <p className="text-2xl font-medium pt-1">LightStream</p>
                <p>Good to excellent credit only or a Co-applicant</p>
            </a>
            <a className="justify-center text-center content-center" href="https://reliantcapitalgrp.com/mayberry-mini-trucks/">
                <div className="flex flex-col md:px-5">
                    <img src="/ReliantCapitalLogo.png" />
                </div>
                <p className="text-2xl font-medium pt-1">Reliant Capital</p>
            </a>
            <a className="justify-center text-center content-center" href="https://jjbest.com/?source=12155">
                <div className="flex flex-col md:px-5">
                    <img src="/BestBanc.webp" />
                </div>
                <p className="text-2xl font-medium pt-1">J.J. Best Banc & Co.</p>
                <p>Loan Min. of $6,000, 650 Min. Credit Score</p>
            </a>
        </div>
    );
};