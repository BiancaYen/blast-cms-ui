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
    const [data, setData] = useState('');
    const [editModalIsActive, editModalData, editModalOnOpen, editModalOnClose] = useModal({});

    // Dispatch
    const dispatch = useDispatch();

    // Event Handlers
    const handleChange = ({ values }) => {
        setData([...data, ...values]);

        values.map(value => dispatch(postCreate({
            data: { file: value },
            setFormErrors: false
        })));
    };

    const handleEdit = (value) => {
        dispatch(postCreate({
            data: { file: value },
            setFormErrors: false
        }));
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
                values={data}
                onChange={handleChange}
                onEdit={value => editModalOnOpen(value)}
            />
            <ImagesEditModal
                isActive={editModalIsActive}
                isSubmitting={false}
                data={editModalData}
                onClose={editModalOnClose}
                onSave={handleEdit}
            />
        </React.Fragment>
    );
};

export default ImagesTab;
