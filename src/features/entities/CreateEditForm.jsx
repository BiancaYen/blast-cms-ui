import React, { useState } from 'react';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

// Components
import {
    Form,
    FormSection,
    Grid,
    Input,
    TableAction,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Table
} from '../../components';

// Feature Components
import CreateEditFieldsModal from './CreateEditFieldsModal';

// Icons
import CreateIcon from '../../components/icons/CreateIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import EditIcon from '../../components/icons/EditIcon';

// Utils
import uniqueKey from '../../utils/uniqueKey';
import useModal from '../../utils/useModal';

// Prop types
const propTypes = {
    meta: PropTypes.instanceOf(Object).isRequired,
    touched: PropTypes.instanceOf(Object).isRequired,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.instanceOf(Object).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};
const CreateEditForm = ({
    meta,
    touched,
    validation,
    values,
    onBlur,
    onChange
}) => {
    // State
    const valuesFields = {
        dataTypeId: '',
        id: uniqueKey({}),
        isNullable: false,
        name: '',
        relationshipEntityId: '',
        relationshipTypeId: ''
    };

    const [modalIsActive, modalData, openModal, closeModal] = useModal(valuesFields);
    const [fieldsIsEdit, setFieldsIsEdit] = useState(false);

    // Event handlers
    const handleFieldsCreate = (field) => {
        onChange({
            id: 'fields',
            value: [...values.fields, field]
        });
    };

    const handleFieldsDelete = (field) => {
        onChange({
            id: 'fields',
            value: values.fields.filter(valuesField => (valuesField.id !== field.id))
        });
    };

    const handleFieldsEdit = (field) => {
        onChange({
            id: 'fields',
            value: values.fields.map(valuesField => (valuesField.id === field.id ? field : valuesField))
        });
    };

    const handleOpenCreateModal = (data) => {
        openModal({ ...data, id: uniqueKey({}) });
    };

    const handleOpenEditModal = (data) => {
        openModal(data);
        setFieldsIsEdit(true);
    };

    // Getters
    const getTableActions = data => ([
        ['Edit', () => handleOpenEditModal(data), <EditIcon />],
        ['Delete', () => handleFieldsDelete(data), <DeleteIcon />]
    ]);

    const getTableColumnName = (name, relationshipEntityId) => {
        if (name) {
            return name;
        }
        const { name: entityName = '' } = meta.entitiesIndex.data.find(entity => entity.id === relationshipEntityId);
        return `${pluralize.singular(entityName)}_id`;
    };

    const getTableDataTypeName = (dataTypeId, relationshipTypeId) => {
        if (dataTypeId) {
            const { name = '' } = meta.dataTypesIndex.data.find(dataType => dataType.id === dataTypeId);
            return name;
        }

        const { name = '' } = meta.relationshipTypesIndex.data.find(relationshipType => relationshipType.id === relationshipTypeId);
        return `Foreign Key (${name})`;
    };

    return (
        <Form>
            <FormSection title="General" withoutBorder>
                <Grid alignItems="start" grid={Grid.grid.twoColumns}>
                    <Input
                        id="name"
                        label="Table / Collection"
                        labelNote="(Best practice recommends plural)"
                        placeholder="Type Table / Collection Name"
                        onBlur={onBlur}
                        onChange={onChange}
                        validation={touched.name && validation.name}
                        value={values.name}
                    />
                </Grid>
            </FormSection>
            <FormSection
                title="Database"
                actions={[
                    ['Add Field', () => handleOpenCreateModal(valuesFields), <CreateIcon />]
                ]}
            >
                <Table
                    data={values.fields}
                    id="fields"
                    limit={5}
                    messageNoData="No fields added yet"
                    withSearch={false}
                    withPagination={false}
                >
                    <TableHead>
                        <TableHeadCell>Column Name</TableHeadCell>
                        <TableHeadCell>Data Type</TableHeadCell>
                        <TableHeadCell>Nullable</TableHeadCell>
                        <TableHeadCell isActionCell>Actions</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {
                            rowData => rowData.map(({
                                dataTypeId,
                                id,
                                isNullable,
                                name,
                                relationshipEntityId,
                                relationshipTypeId
                            }, index) => (
                                <TableRow key={id}>
                                    <TableCell>{getTableColumnName(name, relationshipEntityId)}</TableCell>
                                    <TableCell>{getTableDataTypeName(dataTypeId, relationshipTypeId)}</TableCell>
                                    <TableCell>{isNullable ? 'Yes' : 'No'}</TableCell>
                                    <TableAction
                                        actions={getTableActions({
                                            dataTypeId,
                                            id,
                                            isNullable,
                                            name,
                                            relationshipEntityId,
                                            relationshipTypeId
                                        })}
                                        rowIndex={index}
                                    />
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </FormSection>

            <CreateEditFieldsModal
                data={modalData}
                isActive={modalIsActive}
                isEdit={fieldsIsEdit}
                meta={meta}
                onChange={onChange}
                onClose={closeModal}
                onCreate={handleFieldsCreate}
                onEdit={handleFieldsEdit}
            />
        </Form>
    );
};

CreateEditForm.propTypes = propTypes;

export default CreateEditForm;
