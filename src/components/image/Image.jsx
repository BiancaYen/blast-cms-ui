import React from 'react';
import PropTypes from 'prop-types';

// Components
import ImagePlaceholder from '../image-placeholder/ImagePlaceholder';

// Styles
import ImageWrapper from './styles';

// Prop Types
const propTypes = {
    alternativeText: PropTypes.string.isRequired,
    isBroken: PropTypes.bool.isRequired,
    source: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired
};

const Image = ({
    alternativeText,
    isBroken,
    source,
    onError,
    onLoad
}) => (
    <ImageWrapper>
        {/* Image */}
        {
            source && !isBroken
            && (
                <img
                    src={source}
                    alt={alternativeText}
                    onError={onError}
                    onLoad={onLoad}
                />
            )
        }
        {/* Broken Placeholder */}
        { isBroken && <ImagePlaceholder />}
    </ImageWrapper>
);

Image.propTypes = propTypes;

export default Image;
