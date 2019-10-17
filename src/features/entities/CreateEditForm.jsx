import React from 'react';
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

// Utils
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
    const [modalIsActiveCreateField, modalDataCreateField, openModalCreateField, closeModalCreateField] = useModal({});

    const handleFieldsCreate = (field) => {
        onChange({
            id: 'fields',
            value: [...values.fields, field]
        });
    };

    const getDataTypeName = (dataTypeId, relationshipTypeId) => {
        if (dataTypeId) {
            const { name = '' } = meta.dataTypesIndex.data.find(dataType => dataType.id === dataTypeId);
            return name;
        }

        const { name = '' } = meta.relationshipTypesIndex.data.find(relationshipType => relationshipType.id === relationshipTypeId);
        return `Foreign Key (${name})`;
    };

    const getColumnName = (name, relationshipEntityId) => {
        if (name) {
            return name;
        }
        const { tableName = '' } = meta.entitiesIndex.data.find(entity => entity.id === relationshipEntityId);
        return `${pluralize.singular(tableName)}_id`;
    };

    return (
        <Form>
            <FormSection title="General" withoutBorder>
                <Grid alignItems="start" grid={Grid.grid.twoColumns}>
                    <Input
                        id="tableName"
                        label="Table"
                        labelNote="(Best practice recommends plural)"
                        placeholder="Type Table Name"
                        onBlur={onBlur}
                        onChange={onChange}
                        validation={touched.tableName && validation.tableName}
                        value={values.tableName}
                    />
                </Grid>
            </FormSection>
            <FormSection
                title="Database"
                actions={[
                    ['Add Field', () => openModalCreateField(), <CreateIcon />]
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
                                isNullable,
                                name,
                                relationshipEntityId,
                                relationshipTypeId
                            }, index) => (
                                <TableRow key={name}>
                                    <TableCell>{getColumnName(name, relationshipEntityId)}</TableCell>
                                    <TableCell>{getDataTypeName(dataTypeId, relationshipTypeId)}</TableCell>
                                    <TableCell>{isNullable ? 'Yes' : 'No'}</TableCell>
                                    <TableAction actions={[]} rowIndex={index} />
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </FormSection>

            <CreateEditFieldsModal
                data={modalDataCreateField}
                isActive={modalIsActiveCreateField}
                meta={meta}
                onChange={onChange}
                onClose={closeModalCreateField}
                onCreateFields={handleFieldsCreate}
            />
        </Form>
    );
};

CreateEditForm.propTypes = propTypes;

export default CreateEditForm;
