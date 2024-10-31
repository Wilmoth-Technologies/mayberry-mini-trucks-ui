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

export const isStringEmpty = (str) => {
    return str.trim().length === 0;
};

export const getCurrentDate = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  }