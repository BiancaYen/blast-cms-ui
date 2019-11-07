import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
    Button,
    Modal,
    ModalActions,
    ModalContent
} from '../../components';

// Icons
import EditIcon from '../../components/icons/EditIcon';

// Default props
const defaultProps = {
};

// Prop types
const propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    isActive: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

const ImagesEditModal = ({
    data,
    isActive,
    isSubmitting,
    onClose,
    onEdit
}) => {
    const handleEdit = () => {
        onEdit(data.id);
        onClose();
    };

    return (
        <Modal isActive={isActive} size={Modal.sizes.large} onClose={onClose}>
            <ModalContent title="Edit" icon={<EditIcon width="27" height="27" />}>
                <p>
                    edit here
                </p>
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
                    isLoading={isSubmitting}
                    size={Button.sizes.small}
                    spacing="0"
                    title="Edit"
                    onClick={handleEdit}
                />
            </ModalActions>
        </Modal>
    );
};

ImagesEditModal.defaultProps = defaultProps;
ImagesEditModal.propTypes = propTypes;

export default ImagesEditModal;
