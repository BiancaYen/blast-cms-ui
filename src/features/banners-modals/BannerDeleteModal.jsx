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

const BannerDeleteModal = ({
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
        <Modal active={isActive} onCloseClick={onClose}>
            <ModalContent title="Delete" icon={<DeleteIcon width="27" height="27" />}>
                <p>
                    {
                        isSingle
                            ? `Are you sure you want to remove "${data.name}" banner?`
                            : `Are you sure you want to remove ${data.count} items permanently?`
                    }
                </p>
            </ModalContent>
            <ModalActions>
                <Button small outlined spacing="0" onClick={onClose} title="Cancel" />
                <Button small spacing="0" onClick={handleDelete} title="Delete" />
            </ModalActions>
        </Modal>
    );
};

BannerDeleteModal.defaultProps = defaultProps;
BannerDeleteModal.propTypes = propTypes;

export default BannerDeleteModal;
