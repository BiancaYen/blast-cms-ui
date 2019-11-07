import React from 'react';
import PropTypes from 'prop-types';

// Styles
import ImageWrapper from './styles';

const propTypes = {
    alternativeText: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired
};

const Image = ({ alternativeText, source, onError }) => (
    <ImageWrapper>
        <img src={source} alt={alternativeText} onError={onError} />
    </ImageWrapper>
);

Image.propTypes = propTypes;

export default Image;
