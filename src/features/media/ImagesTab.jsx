import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { postCreate } from '../../redux/actions/images/createActions';

// Components
import {
    FilePicker
} from '../../components';

const ImagesTab = () => {
    // State
    const [images, setImages] = useState('');

    // Dispatch
    const dispatch = useDispatch();

    // Event Handlers
    const handleChange = ({ values }) => {
        setImages([...images, ...values]);

        values.map(value => dispatch(postCreate({
            data: { file: value },
            setFormErrors: false
        })));
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
