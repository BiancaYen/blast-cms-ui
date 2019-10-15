import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

// Prop types
const propTypes = {
    isActive: PropTypes.bool.isRequired,
    meta: PropTypes.instanceOf(Object).isRequired,
    touched: PropTypes.instanceOf(Object).isRequired,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.instanceOf(Object).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreateFields: PropTypes.func.isRequired
};

const DynamicDeleteModal = ({
    isActive,
    meta,
    touched,
    validation,
    values,
    onBlur,
    onChange,
    onClose,
    onCreateFields
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
                    data={meta.dataTypesIndex.data}
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

DynamicDeleteModal.propTypes = propTypes;

export default connect(mapStateToProps, null)(withForm(DynamicDeleteModal));
