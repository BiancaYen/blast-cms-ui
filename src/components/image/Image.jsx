import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import ImagePlaceholder from '../image-placeholder/ImagePlaceholder';

// Styles
import ImageWrapper from './styles';

// Utils
import objectDeepMatches from '../../utils/objectDeepMatches';
import usePrevious from '../../utils/usePrevious';

// Default Props
const defaultProps = {
    onClick: () => {}
};

// Prop Types
const propTypes = {
    value: PropTypes.instanceOf(Object).isRequired,
    onClick: PropTypes.func
};

const Image = ({ value, onClick }) => {
    // State
    const [file, setFile] = useState('');
    const [isBroken, setIsBroken] = useState(false);

    // Previous Props
    const previousValue = usePrevious(value) || {};

    // Event Handlers
    const handleImageError = () => {
        setIsBroken(true);
    };

    // Getters
    const getImage = () => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setFile(reader.result);
        };
        reader.readAsDataURL(value);
    };

    // Effects
    useEffect(() => {
        if (!objectDeepMatches(value.name, previousValue.name)) {
            getImage();
        }
    }, [value]);

    return (
        <ImageWrapper onClick={onClick}>
            {/* Image */}
            {
                file && !isBroken
                && (
                    <img
                        src={file}
                        alt=""
                        onError={handleImageError}
                    />
                )
            }
            {/* Broken Placeholder */}
            { isBroken && <ImagePlaceholder />}
        </ImageWrapper>
    );
};

Image.defaultProps = defaultProps;
Image.propTypes = propTypes;

export default Image;
