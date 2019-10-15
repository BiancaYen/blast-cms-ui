import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
    Checkbox,
    Form,
    FormSection,
    Grid,
    Input,
    Label,
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

    return (
        <Form>
            <FormSection title="General" withoutBorder>
                <Grid alignItems="start" grid={Grid.grid.twoColumns}>
                    <Input
                        id="name"
                        label="Name"
                        labelNote="(Model Name)"
                        placeholder="Type Name"
                        onBlur={onBlur}
                        onChange={onChange}
                        validation={touched.name && validation.name}
                        value={values.name}
                    />
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
                <Grid>
                    <div>
                        <Label spacing="30px 0 0">Show in Menu</Label>
                        <Checkbox
                            id="isActive"
                            onChange={onChange}
                            value={values.isActive}
                            spacing="16px 0 0"
                        />
                    </div>
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
                        <TableHeadCell isActionCell>Actions</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {
                            rowData => rowData.map(({ name, dataTypeId }, index) => (
                                <TableRow key={name}>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{dataTypeId}</TableCell>
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
