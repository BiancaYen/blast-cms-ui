import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Image from '../image/Image';
import Loader from '../loader/Loader';

// Styles
import { FileWrapper, FileWrapperContent } from './styles';

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

const File = ({ value, onClick }) => {
    // State
    const [imageDimensions, setImageDimensions] = useState({});
    const [isBroken, setIsBroken] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [source, setSource] = useState('');

    // Previous Props
    const previousValue = usePrevious(value) || {};

    // Event Handlers
    const handleImageError = () => {
        setIsBroken(true);
    };

    const handleImageLoaded = ({ target }) => {
        const { naturalHeight: height, naturalWidth: width } = target;
        setImageDimensions({
            height,
            width
        });
        setIsLoading(false);
    };

    // Getters
    const getImage = () => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setSource(reader.result);
        };
        reader.readAsDataURL(value);
    };

    // Effects
    useEffect(() => {
        if (!objectDeepMatches(value.name, previousValue.name)) {
            getImage();
        }
    }, [value]);

    const { height, width } = imageDimensions;

    return (
        <FileWrapper onClick={onClick}>
            <Image
                alternativeText=""
                isBroken={isBroken}
                isLoading={isLoading}
                source={source}
                onError={handleImageError}
                onLoaded={handleImageLoaded}
            />
            {
                !isLoading
                && (
                    <FileWrapperContent>
                        {`Image Height: ${height}px | Image Width: ${width}px`}
                    </FileWrapperContent>
                )
            }
        </FileWrapper>
    );
};

File.defaultProps = defaultProps;
File.propTypes = propTypes;

export default File;
