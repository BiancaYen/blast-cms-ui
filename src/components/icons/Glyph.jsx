import React from 'react';
import PropTypes from 'prop-types';

// Default props
const defaultProps = {
    width: '91',
    height: '91'
};

// Prop types
const propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
};

const Glyph = ({ width, height }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166.5 100" width={width} height={height}>
        <title>kjd</title>
        <path d="M59.9,100c3-1.8,17-6.4,17-31.8V8.2c-.1-3.4-1-7-4.1-8.2H90.1c-3.3,1.5-3.8,4.5-3.9,8.2V68.1c0,5.1-2.8,28.3-26.4,31.9M5.3,60.3c0,4.1.7,11.2-5.3,12.9H20.8c-6-2-5.3-8.7-5.3-13V25.7c0-4.1-.9-11.1,5.1-12.8H0c6,2,5.3,8.7,5.3,12.9ZM18.6,41.1,45.5,68.9c2.1,2.2,6.9,4.4,12.7,4.4H69.3c-6-2.6-11-4.1-15.4-8.2L29.7,41,57.8,12.8H37.2c7.9,3,1.6,7.9-2.3,12.2Zm140-19.4c4.1,4.2,7.9,11,7.9,20.7a32.4,32.4,0,0,1-8.9,22.8c-3.8,3.8-12.3,9.6-27.4,9.6-2.9,0-6.3-.2-9.4-.5L116,74H102.5a6.8,6.8,0,0,0,2.7-1.4c3.2-2.8,2.7-8.2,2.7-11.6V25.7c0-4.2.7-11-5.4-13h11.2l12.2-.2c10.2,0,23.8,0,32.8,9.3m-9.9,43.5c5.2-4.5,6.9-11.9,6.9-20.3,0-10.4-4.3-17.1-7.8-20.4-7.5-7.2-16.8-8.2-23.2-8.2a21.8,21.8,0,0,0-5.3.6,1.5,1.5,0,0,0-1,1.6c-.1,2.8-.1,9.9-.1,16.3V45c0,8.7.1,14.9.2,16.5s.2,5.3.9,6.2,4.2,3.3,10.7,3.3c8.3,0,13.9-1.6,18.8-5.9" fill="#fff"/>
    </svg>
);

Glyph.defaultProps = defaultProps;
Glyph.propTypes = propTypes;

export default Glyph;
