import React from 'react';
import PropTypes from 'prop-types';

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
    isSubmitting: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

const ImagesEditModal = ({
    data,
    isActive,
    isSubmitting,
    onClose,
    onSave
}) => {
    const {
        touched,
        isValid,
        validation,
        values,
        onBlur,
        onChange,
        onSubmit
    } = useForm(data, {});

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
                    isLoading={isSubmitting}
                    size={Button.sizes.small}
                    spacing="0"
                    title="Save"
                    onClick={onSubmit(onSave)}
                />
            </ModalActions>
        </Modal>
    );
};

ImagesEditModal.propTypes = propTypes;

export default ImagesEditModal;
