import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Image from '../image/Image';

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
    const [source, setSource] = useState('');
    const [imageDimensions, setImageDimensions] = useState({});
    const [isBroken, setIsBroken] = useState(false);

    // Previous Props
    const previousValue = usePrevious(value) || {};

    // Event Handlers
    const handleImageError = () => {
        setIsBroken(true);
    };

    const handleImageLoading = ({ target }) => {
        const { naturalHeight: height, naturalWidth: width } = target;
        setImageDimensions({
            height,
            width
        });
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
                source={source}
                onError={handleImageError}
                onLoad={handleImageLoading}
            />
            <FileWrapperContent>
                {`Image Height: ${height}px | Image Width: ${width}px`}
            </FileWrapperContent>
        </FileWrapper>
    );
};

File.defaultProps = defaultProps;
File.propTypes = propTypes;

export default File;
