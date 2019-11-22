import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import {
    Button,
    Checkbox,
    Input,
    ModalContent,
    ModalActions,
    Modal,
    Select,
    Toggle
} from '../../components';

// Icons
import CreateIcon from '../../components/icons/CreateIcon';

// HOC
import useForm from '../../utils/useForm';

// Prop types
const propTypes = {
    isActive: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    data: PropTypes.instanceOf(Object).isRequired,
    meta: PropTypes.instanceOf(Object).isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

const CreateEditFieldsModal = ({
    isActive,
    isEdit,
    data,
    meta,
    onClose,
    onCreate,
    onEdit
}) => {
    const [isRelationship, setIsRelationship] = useState(false);

    const {
        isValid,
        touched,
        validation,
        values,
        onBlur,
        onChange,
        onFormReset
    } = useForm(data);

    const handleCreate = () => {
        onCreate(values);
        onFormReset();
        onClose();
    };

    const handleEdit = () => {
        onEdit(values);
        onFormReset();
        onClose();
    };

    const handleToggleForm = () => {
        setIsRelationship(!isRelationship);
        onFormReset();
    };

    return (
        <Modal isActive={isActive} onClose={onClose}>
            <ModalContent title="Create Field" icon={<CreateIcon width="27" height="27" />}>
                <Toggle
                    id="isRelationship"
                    label="Relationship / Foreign Key"
                    onBlur={onBlur}
                    onChange={handleToggleForm}
                    value={isRelationship}
                />
                {
                    isRelationship
                        ? (
                            <Fragment>
                                <Select
                                    id="relationshipEntityId"
                                    key="relationshipEntityId"
                                    data={meta.entitiesIndex.data}
                                    dataDisplayKey="name"
                                    label="Relationship Entity"
                                    placeholder="Select Relationship Entity"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    validation={touched.relationshipEntityId && validation.relationshipEntityId}
                                    value={values.relationshipEntityId}
                                />
                                <Select
                                    id="relationshipTypeId"
                                    key="relationshipTypeId"
                                    data={meta.relationshipTypesIndex.data}
                                    label="Relationship Type"
                                    placeholder="Select Relationship Type"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    validation={touched.relationshipTypeId && validation.relationshipTypeId}
                                    value={values.relationshipTypeId}
                                />
                            </Fragment>
                        )
                        : (
                            <Fragment>
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
                            </Fragment>
                        )
                }

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
                    title={isEdit ? 'Edit' : 'Add'}
                    onClick={isEdit ? handleEdit : handleCreate}
                />
            </ModalActions>
        </Modal>
    );
};

CreateEditFieldsModal.propTypes = propTypes;

export default CreateEditFieldsModal;
