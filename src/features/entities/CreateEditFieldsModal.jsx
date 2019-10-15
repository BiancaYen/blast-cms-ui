import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';

// Components
import {
    Button,
    Input,
    ModalContent,
    ModalActions,
    Modal,
    Select
} from '../../components';

// Icons
import CreateIcon from '../../components/icons/CreateIcon';

// HOC
import withForm from '../../utils/withForm';

// Aplication State
const mapStateToProps = ({ entities: { createEditFields } }) => {
    const { data, submit, validationSchema } = createEditFields;

    return {
        data,
        submit,
        validationSchema
    };
};

// Default props
const defaultProps = {
    data: {}
};

// Prop types
const propTypes = {
    isActive: PropTypes.bool.isRequired,
    data: PropTypes.instanceOf(Object),
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const DynamicDeleteModal = ({
    isActive,
    data,
    touched,
    validation,
    values,
    onBlur,
    onChange,
    onClose,
    onCreateFields,
    onSubmit
}) => {
    const handleCreate = () => {
        onCreateFields(values);
        onClose();
    };

    return (
        <Modal isActive={isActive} onCloseClick={onClose}>
            <ModalContent title="Create Field" icon={<CreateIcon width="27" height="27" />}>
                <Input
                    id="name"
                    label="Name"
                    placeholder="Type Name"
                    onBlur={onBlur}
                    onChange={onChange}
                    validation={touched.name && validation.name}
                    value={values.name}
                />
                <Select
                    id="dataTypeId"
                    data={[
                        { id: 1, name: 'String' },
                        { id: 3, name: 'Long Text' }
                    ]}
                    label="Data Type"
                    placeholder="Select Data Type"
                    onBlur={onBlur}
                    onChange={onChange}
                    validation={touched.dataTypeId && validation.dataTypeId}
                    value={values.dataTypeId}
                />
            </ModalContent>
            <ModalActions>
                <Button size={Button.sizes.small} isOutlined spacing="0" onClick={onClose} title="Cancel" />
                <Button size={Button.sizes.small} spacing="0" onClick={handleCreate} title="Add" />
            </ModalActions>
        </Modal>
    );
};

DynamicDeleteModal.defaultProps = defaultProps;
DynamicDeleteModal.propTypes = propTypes;

export default connect(mapStateToProps, null)(withForm(DynamicDeleteModal));
