import React from 'react';
import PropTypes from 'prop-types';

// Components
import ImagePlaceholder from '../image-placeholder/ImagePlaceholder';

// Styles
import ImageWrapper from './styles';

// Prop Types
const propTypes = {
    alternativeName: PropTypes.string.isRequired,
    isBroken: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    source: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired,
    onLoaded: PropTypes.func.isRequired
};

const Image = ({
    alternativeName,
    isBroken,
    isLoading,
    source,
    onError,
    onLoaded
}) => (
    <ImageWrapper isLoading={isLoading}>
        {/* Image */}
        {
            source && !isBroken
            && (
                <img
                    src={source}
                    alt={alternativeName}
                    onError={onError}
                    onLoad={onLoaded}
                />
            )
        }
        {/* Broken Placeholder */}
        { isBroken && <ImagePlaceholder />}
    </ImageWrapper>
);

Image.propTypes = propTypes;

export default Image;
