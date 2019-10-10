import React from 'react';
import PropTypes from 'prop-types';

// Default props
const defaultProps = {
    height: '18',
    width: '18'
};

// Prop types
const propTypes = {
    height: PropTypes.string,
    width: PropTypes.string
};

/* eslint-disable max-len */
const SearchIcon = ({ width, height }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18">
            <path fill="#FFC30F" fillRule="nonzero" d="M7.004 14.009a6.877 6.877 0 0 0 4.473-1.631l5.436 5.436c.124.124.28.186.45.186a.637.637 0 0 0 .45-1.087l-5.435-5.436a6.993 6.993 0 0 0 1.63-4.473A7.006 7.006 0 0 0 7.005 0C3.153 0 0 3.153 0 7.004c0 3.867 3.153 7.005 7.004 7.005zM6.985 1.39a5.63 5.63 0 0 1 5.625 5.625 5.621 5.621 0 0 1-5.625 5.625A5.63 5.63 0 0 1 1.36 7.016c0-3.094 2.53-5.625 5.625-5.625z" />
        </svg>

    );
};
/* eslint-enable max-len */

SearchIcon.defaultProps = defaultProps;
SearchIcon.propTypes = propTypes;

export default SearchIcon;
