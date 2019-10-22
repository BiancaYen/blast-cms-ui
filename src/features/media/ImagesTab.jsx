import React, { useState } from 'react';

// Components
import {
    ImagePicker
} from '../../components';

const ImagesTab = () => {
    const [images, setImages] = useState('');
    const handleChange = ({ value }) => {
        setImages([...images, value]);
    };

    return (
        <React.Fragment>
            <ImagePicker
                id="images"
                isMultiple
                requirements={{}}
                onChange={handleChange}
                spacing="0 40px"
                value={images}
            />
        </React.Fragment>
    );
};

export default ImagesTab;
