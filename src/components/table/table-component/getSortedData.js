import moment from 'moment';

const retrieveNumber = (value) => {
    if (isNaN(value) && typeof value === 'string') {
        return +value.replace(/[\s]/g, '');
    }

    return +value;
};

const getSortedData = ({ data, field, direction }) => {
    const result = data.slice().sort((a, b) => {
        const numberValueA = retrieveNumber(a[field]);
        const numberValueB = retrieveNumber(b[field]);

        if (
            !isNaN(retrieveNumber(a[field]))
            && !isNaN(retrieveNumber(a[field]))
        ) {
            return numberValueA - numberValueB;
        }

        let aValue = a[field];
        if (aValue === null) {
            aValue = '';
        }

        // If the value is an object (for dynamic tables) the actual value will be nested
        if (typeof aValue === 'object' && Object.keys(aValue).length !== 0 && aValue.constructor === Object) {
            aValue = typeof aValue.value !== 'undefined' ? aValue.value : '';
        }

        let bValue = b[field];
        if (bValue === null) {
            bValue = '';
        }

        if (typeof bValue === 'object' && Object.keys(bValue).length !== 0 && bValue.constructor === Object) {
            bValue = typeof bValue.value !== 'undefined' ? bValue.value : '';
        }

        if (moment(aValue).isValid()) {
            return moment(aValue).diff(moment(bValue));
        }

        return aValue.toString().toLowerCase().localeCompare(bValue.toString().toLowerCase());
    });

    if (direction === 'asc') {
        return result;
    }

    if (direction === 'desc') {
        return result.reverse();
    }

    return data;
};

export default getSortedData;
