import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
    ModalContent,
    ModalActions,
    Button,
    Modal
} from '../../components';

// Icons
import DeleteIcon from '../../components/icons/DeleteIcon';

// Default props
const defaultProps = {
    isSingle: false
};

// Prop types
const propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    isActive: PropTypes.bool.isRequired,
    isSingle: PropTypes.bool,
    isSubmitting: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

const EntitiesDeleteModal = ({
    data,
    isActive,
    isSingle,
    isSubmitting,
    onClose,
    onDelete
}) => {
    const handleDelete = () => {
        if (isSingle) {
            onDelete(data);
            onClose();
        } else {
            onDelete(data.id);
            onClose();
        }
    };

    return (
        <Modal isActive={isActive} onCloseClick={onClose}>
            <ModalContent title="Delete" icon={<DeleteIcon width="27" height="27" />}>
                <p>
                    {
                        isSingle
                            ? `Are you sure you want to delete the "${data.displayName}" entity?`
                            : `Are you sure you want to delete ${data.count} entities permanently?`
                    }
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
                    title="Delete"
                    onClick={handleDelete}
                />
            </ModalActions>
        </Modal>
    );
};

EntitiesDeleteModal.defaultProps = defaultProps;
EntitiesDeleteModal.propTypes = propTypes;

export default EntitiesDeleteModal;
