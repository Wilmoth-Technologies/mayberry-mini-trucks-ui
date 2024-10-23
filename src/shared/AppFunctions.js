export const numberFormatter = (formatStyle, maxDecimalPlaces = 0) => {
    return new Intl.NumberFormat('en-US', {
        style: formatStyle,
        currency: 'USD',
        maximumFractionDigits: maxDecimalPlaces,
    });
};

export const milageFormatter = (maxDecimalPlaces = 0) => {
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: maxDecimalPlaces
    });
}