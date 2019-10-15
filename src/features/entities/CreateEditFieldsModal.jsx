import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import {
    Button,
    Checkbox,
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
    isValid: PropTypes.bool.isRequired,
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
    isValid,
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
                <Checkbox
                    id="isNullable"
                    label="Is Nullable"
                    onChange={onChange}
                    value={values.isNullable}
                    spacing="16px 0 0"
                />
            </ModalContent>
            <ModalActions>
                <Button
                    isOutlined
                    size={Button.sizes.small}
                    spacing="0"
                    onClick={onClose}
                    title="Cancel"
                />
                <Button
                    isDisabled={!isValid}
                    size={Button.sizes.small}
                    spacing="0"
                    title="Add"
                    onClick={handleCreate}
                />
            </ModalActions>
        </Modal>
    );
};

DynamicDeleteModal.propTypes = propTypes;

export default connect(mapStateToProps, null)(withForm(DynamicDeleteModal));
