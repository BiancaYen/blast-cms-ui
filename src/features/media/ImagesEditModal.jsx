import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import {
    Button,
    ImageCropper,
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
    onSave: PropTypes.func.isRequired
};

const ImagesEditModal = ({
    data, // File Object
    isActive,
    isSubmitting,
    onClose,
    onSave
}) => {
    const [editedFile, setEditedFile] = useState('');

    const handleSave = () => {
        onSave(editedFile);
        onClose();
    };

    return (
        <Modal isActive={isActive} size={Modal.sizes.large} onClose={onClose}>
            <ModalContent title="Edit" icon={<EditIcon width="27" height="27" />}>
                <ImageCropper
                    value={data}
                    onChange={updatedFile => setEditedFile(updatedFile)}
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
                    isLoading={isSubmitting}
                    size={Button.sizes.small}
                    spacing="0"
                    title="Save"
                    onClick={handleSave}
                />
            </ModalActions>
        </Modal>
    );
};

ImagesEditModal.defaultProps = defaultProps;
ImagesEditModal.propTypes = propTypes;

export default ImagesEditModal;
