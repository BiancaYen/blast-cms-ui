import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
    ModalContent,
    ModalActions,
    Button,
    Modal
} from '../../components';
import ActivateIcon from '../../components/icons/ActivateIcon';
import DeactivateIcon from '../../components/icons/DeactivateIcon';

// Icons

// Default props
const defaultProps = {
    type: 'activate'
};

// Prop types
const propTypes = {
    isActive: PropTypes.bool.isRequired,
    data: PropTypes.instanceOf(Array).isRequired,
    type: PropTypes.oneOf([
        'activate',
        'deactivate'
    ]),
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

const BannerActiveChangeModal = ({
    isActive,
    data,
    type,
    onClose,
    onDelete
}) => {
    const handleDelete = () => {
        onDelete(data);
        onClose();
    };

    const iconSize = {
        width: '27',
        height: '27'
    };

    const icon = type === 'activate'
        ? <ActivateIcon {...iconSize} />
        : <DeactivateIcon {...iconSize} />;

    return (
        <Modal active={isActive} onCloseClick={onClose}>
            <ModalContent title={type} icon={icon}>
                <p>
                    {`Are you sure you want to ${type} ${data.length} items?`}
                </p>
            </ModalContent>
            <ModalActions>
                <Button small outlined spacing="0" onClick={onClose} title="Cancel" />
                <Button small spacing="0" onClick={handleDelete} title="Yes" />
            </ModalActions>
        </Modal>
    );
};

BannerActiveChangeModal.defaultProps = defaultProps;
BannerActiveChangeModal.propTypes = propTypes;

export default BannerActiveChangeModal;
