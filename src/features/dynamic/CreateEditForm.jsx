import React from 'react';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// Actions
import { getIndex } from '../../redux/actions/dynamic/indexActions';

// Components
import {
    Form,
    FormRow,
    FormSection,
    Input,
    Select,
    TextArea
} from '../../components';

// Constants
const INPUT = 'Input';
const RICH_TEXT_EDITOR = 'RichTextArea';
const SELECT = 'Select';

// Default Props
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
    const dispatch = useDispatch();

    const getInput = (datatype) => {
        switch (datatype) {
            case INPUT:
                return Input;
            case SELECT:
                return Select;
            case RICH_TEXT_EDITOR:
                return TextArea;
            default: return Input;
        }
    };

    const getSelectData = (columnName) => {
        const url = pluralize.plural(columnName.replace('_id', ''));
        console.log(url);
        return [
            { id: 1, name: 'test' }
        ];
    };

    return (
        <Form>
            <FormRow>
                <FormSection title="General" withoutBorder>
                    {
                        dataTypes.map(({ columnName, component, label }) => {
                            const DynamicInput = getInput(component);
                            return (
                                <DynamicInput
                                    id={columnName}
                                    data={getSelectData(columnName)}
                                    key={columnName}
                                    label={label}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    touched={touched[columnName] && validation[columnName]}
                                    value={values[columnName]}
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
