import PropTypes from 'prop-types';
import { numberFormatter } from '../../AppFunctions';
import { CURRENCY_FORMAT_STYLE } from '../../AppConstants';

export default function InventoryCard({ make, model, year, price, mileage, status, imgLink }) {

    return (
        <div className="justify-center text-center bg-white w-[180px] largerMobile:w-[190px] text-black rounded-lg drop-shadow-lg">
            
            <img className="h-[188px] bg-contain bg-no-repeat bg-center rounded-t-lg" src={imgLink} />
            {status === 'Pending Sale' ? <h3 className='bg-red-400 -mt-6 relative'>Pending Sale</h3> : null}
            <h3 className="text-lg md:text-xl">{year} {make} {model}</h3>
            <h3 className="text-lg md:text-xl text-action-yellow">{numberFormatter(CURRENCY_FORMAT_STYLE, 2).format(price)}</h3>
            <h4 className="md: text-lg">Mileage</h4>
            <p className="font-light">{numberFormatter().format(mileage)} mi</p>
        </div>
    );
};

InventoryCard.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    mileage: PropTypes.number,
}