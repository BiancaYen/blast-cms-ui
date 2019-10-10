import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
    Checkbox,
    Form,
    FormRow,
    FormSection,
    ImagePicker,
    Input,
    Label,
    TextArea
} from '../../components';

// Icons
import HeroBannerPlaceholder from '../../components/icons/HeroBannerPlaceholder';

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
            <FormSection title="General information" withoutBorder>
                <Input
                    id="name"
                    label="Name"
                    placeholder="Type Name"
                    onBlur={onBlur}
                    onChange={onChange}
                    validation={touched.name && validation.name}
                    value={values.name}
                />
                <TextArea
                    id="description"
                    label="Description"
                    placeholder="Type Description"
                    validation={touched.description && validation.description}
                    value={values.description}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            </FormSection>
            <FormSection title="System" withoutBorder>
                <ImagePicker
                    id="imagePicker"
                    label="Image picker"
                    requirements={{
                        maxHeight: 1000,
                        maxWidth: 1000,
                        fileSize: 500
                    }}
                    value={values.image}
                    validation={touched.image && validation.image}
                />
                <Label spacing="30px 0 0">Show in Menu</Label>
                <Checkbox
                    id="showInMenu"
                    onChange={onChange}
                    value={values.showInMenu}
                    spacing="16px 0 0"
                />
            </FormSection>
        </FormRow>
    </Form>
);

CreateEditForm.propTypes = propTypes;

export default CreateEditForm;
