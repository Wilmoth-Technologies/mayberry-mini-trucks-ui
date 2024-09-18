import PropTypes from 'prop-types';
import { numberFormatter } from '../../AppFunctions';
import { CURRENCY_FORMAT_STYLE } from '../../AppConstants';

export default function InventoryCard({ title, price, mileage }) {

    return (
        <div className="justify-center text-center bg-white w-[190px] text-black rounded-lg">
            <img className="h-[188px] bg-contain bg-no-repeat bg-center rounded-t-lg" src="/HondaAttackInvLogo.png" />
            <h3 className="text-lg md:text-xl">{title}</h3>
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