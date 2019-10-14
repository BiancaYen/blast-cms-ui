import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import {
    Form,
    FormRow,
    FormSection,
    Input,
    TextArea
} from '../../components';

const defaultProps = {
    dataTypes: []
};

// Prop types
const propTypes = {
    dataTypes: PropTypes.instanceOf(Array),
    touched: PropTypes.instanceOf(Object).isRequired,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.instanceOf(Object).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};
const CreateEditForm = ({
    dataTypes,
    touched,
    validation,
    values,
    onBlur,
    onChange
}) => {
    const getInput = (datatype) => {
        switch (datatype) {
            case 'Input':
                return Input;
            case 'RichTextArea':
                return TextArea;
            default: return Input;
        }
    };

    return (
        <Form>
            <FormRow>
                <FormSection title="General" withoutBorder>
                    {
                        dataTypes.map(({ columnName, component }) => {
                            const DynamicInput = getInput(component);
                            return (
                                <DynamicInput
                                    id={columnName}
                                    key={columnName}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    touched={touched[columnName] && validation[columnName]}
                                    value={values[columnName]}
                                    label={columnName}
                                />
                            );
                        })
                    }
                </FormSection>
            </FormRow>
        </Form>
    );
};

CreateEditForm.defaultProps = defaultProps;
CreateEditForm.propTypes = propTypes;

export default CreateEditForm;
