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
    TableStatic
} from '../../components';

// Feature Components
import CreateEditFieldsModal from './CreateEditFieldsModal';

// Icons
import CreateIcon from '../../components/icons/CreateIcon';

// Utils
import useModal from '../../utils/useModal';

// Prop types
const propTypes = {
    touched: PropTypes.instanceOf(Object).isRequired,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.instanceOf(Object).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};
const CreateEditForm = ({
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
                            id="showInMenu"
                            onChange={onChange}
                            value={values.showInMenu}
                            spacing="16px 0 0"
                        />
                    </div>
                </Grid>
            </FormSection>
            <FormSection
                title="Database"
                actions={[
                    ['Create Field', () => openModalCreateField(), <CreateIcon />]
                ]}
            >
                <TableStatic spacing="0">
                    <TableHead>
                        <TableHeadCell isIdCell>ID</TableHeadCell>
                        <TableHeadCell>Column Name</TableHeadCell>
                        <TableHeadCell>Data Type</TableHeadCell>
                        <TableHeadCell isActionCell>Actions</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {
                            values.fields.map(({ id, name, dataType }, index) => (
                                <TableRow key={id}>
                                    <TableCell>{id}</TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{dataType}</TableCell>
                                    <TableAction actions={[]} rowIndex={index} />
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TableStatic>
            </FormSection>

            <CreateEditFieldsModal
                data={modalDataCreateField}
                isActive={modalIsActiveCreateField}
                onChange={onChange}
                onClose={closeModalCreateField}
                onCreateFields={handleFieldsCreate}
            />
        </Form>
    );
};

CreateEditForm.propTypes = propTypes;

export default CreateEditForm;
