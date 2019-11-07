import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { postCreate } from '../../redux/actions/images/createActions';

// Components
import {
    FilePicker
} from '../../components';

// Feature Components
import ImagesEditModal from './ImagesEditModal';

// Utils
import useModal from '../../utils/useModal';

const ImagesTab = () => {
    // State
    const [images, setImages] = useState('');
    const [editModalIsActive, editModalData, editModalOnOpen, editModalOnClose] = useModal({});

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

    const handleEdit = (value) => {
        console.log(value);
        editModalOnOpen(value);
    };

    return (
        <React.Fragment>
            <FilePicker
                id="images"
                isMultiple
                requirements={{
                    fileSize: 5000
                }}
                spacing="0 40px"
                values={images}
                onChange={handleChange}
                onEdit={handleEdit}
            />
            <ImagesEditModal
                // isActive={editModalIsActive}
                isActive
                data={editModalData}
                onClose={editModalOnClose}
            />
        </React.Fragment>
    );
};

export default ImagesTab;
