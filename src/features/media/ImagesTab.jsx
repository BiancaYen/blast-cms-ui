import React, { useState } from 'react';

// Components
import {
    FilePicker
} from '../../components';

const ImagesTab = () => {
    const [images, setImages] = useState('');
    const handleChange = ({ values }) => {
        setImages([...images, ...values]);
    };

    return (
        <React.Fragment>
            <FilePicker
                id="images"
                isMultiple
                requirements={{
                    fileSize: 5000
                }}
                onChange={handleChange}
                spacing="0 40px"
                values={images}
            />
        </React.Fragment>
    );
};

export default ImagesTab;
