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
    alternativeName: PropTypes.string.isRequired,
    file: PropTypes.instanceOf(Object).isRequired,
    onClick: PropTypes.func
};

const File = ({
    alternativeName,
    file,
    name,
    onClick
}) => {
    // Data & State
    const [imageDimensions, setImageDimensions] = useState({});
    const { height, width } = imageDimensions;
    const [isBroken, setIsBroken] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [source, setSource] = useState('');

    // Previous Props
    const previousFile = usePrevious(file) || {};

    // Event Handlers
    const handleImageError = () => {
        setIsBroken(true);
    };

    const handleImageLoaded = ({ target }) => {
        const { naturalHeight, naturalWidth } = target;
        setImageDimensions({
            height: naturalHeight,
            width: naturalWidth
        });
        setIsLoading(false);
    };

    // Getters
    const getImage = () => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setSource(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Effects
    useEffect(() => {
        if (!objectDeepMatches(file.name, previousFile.name)) {
            getImage();
        }
    }, [file]);

    return (
        <FileWrapper onClick={onClick}>
            <Image
                alternativeName={alternativeName}
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
