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
    isActive: PropTypes.bool.isRequired,
    isSingle: PropTypes.bool,
    data: PropTypes.instanceOf(Object).isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

const DynamicDeleteModal = ({
    isActive,
    isSingle,
    data,
    onClose,
    onDelete
}) => {
    const handleDelete = () => {
        if (isSingle) {
            onDelete(data);
            onClose();
        } else {
            onDelete(data.bannersId);
            onClose();
        }
    };

    return (
        <Modal isActive={isActive} onCloseClick={onClose}>
            <ModalContent title="Delete" icon={<DeleteIcon width="27" height="27" />}>
                <p>
                    {
                        isSingle
                            ? `Are you sure you want to delete "${data.name}" banner?`
                            : `Are you sure you want to delete ${data.count} items permanently?`
                    }
                </p>
            </ModalContent>
            <ModalActions>
                <Button size={Button.sizes.small} isOutlined spacing="0" onClick={onClose} title="Cancel" />
                <Button size={Button.sizes.small} spacing="0" onClick={handleDelete} title="Delete" />
            </ModalActions>
        </Modal>
    );
};

DynamicDeleteModal.defaultProps = defaultProps;
DynamicDeleteModal.propTypes = propTypes;

export default DynamicDeleteModal;
