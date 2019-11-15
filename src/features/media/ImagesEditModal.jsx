import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Action Creators
import { postEdit } from '../../redux/actions/images/editActions';

// Components
import {
    Button,
    Modal,
    ModalActions,
    ModalContent
} from '../../components';

// Feature Components
import ImagesEditForm from './ImagesEditForm';

// Icons
import EditIcon from '../../components/icons/EditIcon';

// Utils
import useForm from '../../utils/useForm';

// Prop Types
const propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

const ImagesEditModal = ({
    data,
    isActive,
    onClose
}) => {
    // Application State
    const { edit: { submit } } = useSelector(state => state.images);

    // Dispatch
    const dispatch = useDispatch();

    const {
        touched,
        isValid,
        validation,
        values,
        onBlur,
        onChange,
        onSubmit
    } = useForm(data, {});

    const handleSubmit = (formValues, setFormErrors) => {
        dispatch(postEdit({
            data: formValues,
            id: data.id,
            setFormErrors
        }));
        onClose();
    };

    return (
        <Modal isActive={isActive} size={Modal.sizes.large} onClose={onClose}>
            <ModalContent title="Edit" icon={<EditIcon width="27" height="27" />}>
                <ImagesEditForm
                    touched={touched}
                    validation={validation}
                    values={values}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            </ModalContent>
            <ModalActions>
                <Button
                    isOutlined
                    size={Button.sizes.small}
                    spacing="0"
                    title="Cancel"
                    onClick={onClose}
                />
                <Button
                    isDisabled={!isValid}
                    isLoading={submit}
                    size={Button.sizes.small}
                    spacing="0"
                    title="Save"
                    onClick={onSubmit(handleSubmit)}
                />
            </ModalActions>
        </Modal>
    );
};

ImagesEditModal.propTypes = propTypes;

export default ImagesEditModal;
