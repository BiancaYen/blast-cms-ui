import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { getIndex } from '../../redux/actions/images/indexActions';
import { postCreate } from '../../redux/actions/images/createActions';

// Components
import {
    FilePicker,
    Loader
} from '../../components';

// Feature Components
import ImagesEditModal from './ImagesEditModal';

// Utils
import useModal from '../../utils/useModal';

const ImagesTab = () => {
    // Application State
    const { index } = useSelector(state => state.images);

    // State
    const [data, setData] = useState(index.data);
    const [editModalIsActive, editModalData, editModalOnOpen, editModalOnClose] = useModal({
        alternativeName: '',
        file: {},
        name: ''
    });

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

    // Effects
    useEffect(() => {
        dispatch(getIndex());
    }, []);

    return (
        <Loader isLoading={index.loading} type={Loader.types.spinner}>
            <FilePicker
                id="images"
                isMultiple
                spacing="0 40px"
                values={index.data}
                onChange={handleChange}
                onEdit={value => editModalOnOpen(value)}
            />
            <ImagesEditModal
                isActive={editModalIsActive}
                isSubmitting={false}
                data={editModalData}
                onClose={editModalOnClose}
            />
        </Loader>
    );
};

export default ImagesTab;
