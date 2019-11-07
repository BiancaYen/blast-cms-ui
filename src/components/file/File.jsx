import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Image from '../image/Image';
import ImagePlaceholder from '../image-placeholder/ImagePlaceholder';

// Styles
import FileWrapper from './styles';

// Utils
import objectDeepMatches from '../../utils/objectDeepMatches';
import usePrevious from '../../utils/usePrevious';

// Prop Types
const propTypes = {
    value: PropTypes.instanceOf(Object).isRequired
};

const File = ({ value }) => {
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
        <FileWrapper>
            {/* Image */}
            {
                file && !isBroken
                && (
                    <Image
                        source={file}
                        alternativeText=""
                        onError={handleImageError}
                    />
                )
            }
            {/* Broken Placeholder */}
            { isBroken && <ImagePlaceholder />}
        </FileWrapper>
    );
};

File.propTypes = propTypes;

export default File;
