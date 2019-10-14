import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
    Checkbox,
    Form,
    FormRow,
    FormSection,
    Grid,
    Input,
    Label,
    TableAction,
    TableStatic,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow
} from '../../components';

// Icons
import CreateIcon from '../../components/icons/CreateIcon';

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
}) => (
    <Form>
        <FormSection title="General" withoutBorder>
            <Grid alignItems="start" grid={Grid.grid.twoColumns}>
                <Input
                    id="name"
                    label="Name"
                    placeholder="Type Name"
                    onBlur={onBlur}
                    onChange={onChange}
                    validation={touched.name && validation.name}
                    value={values.name}
                />
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
                ['Create Field', () => {}, <CreateIcon />]
            ]}
        >
            <TableStatic>
                <TableHead>
                    <TableHeadCell isIdCell>Column Name</TableHeadCell>
                    <TableHeadCell isActionCell>Actions</TableHeadCell>
                </TableHead>
                <TableBody>
                    {
                        values.fields.map(({ id, subId, service }, index) => (
                            <TableRow key={id}>
                                <TableCell>{id}</TableCell>
                                <TableCell>{subId}</TableCell>
                                <TableCell>{service}</TableCell>
                                <TableAction actions={[]} rowIndex={index} />
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TableStatic>
        </FormSection>
    </Form>
);

CreateEditForm.propTypes = propTypes;

export default CreateEditForm;
