import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
    Checkbox,
    Form,
    FormRow,
    FormSection,
    Input,
    Label
} from '../../components';

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
        <FormRow>
            <FormSection title="General" withoutBorder>
                <Input
                    id="name"
                    label="Name"
                    placeholder="Type Name"
                    onBlur={onBlur}
                    onChange={onChange}
                    validation={touched.name && validation.name}
                    value={values.name}
                />
                <Label spacing="30px 0 0">Show in Menu</Label>
                <Checkbox
                    id="showInMenu"
                    onChange={onChange}
                    value={values.showInMenu}
                    spacing="16px 0 0"
                />
            </FormSection>
            <FormSection title="Database" withoutBorder>
                ...
            </FormSection>
        </FormRow>
    </Form>
);

CreateEditForm.propTypes = propTypes;

export default CreateEditForm;
