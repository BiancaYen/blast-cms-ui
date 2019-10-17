import React, { useEffect } from 'react';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { getIndex } from '../../redux/actions/dynamic/metaActions';

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
    // Application State
    const { data } = useSelector(state => state.dynamic.meta);

    // Dispatch
    const dispatch = useDispatch();

    // Helpers
    const getInput = (component) => {
        switch (component) {
            case INPUT:
                return Input;
            case SELECT:
                return Select;
            case RICH_TEXT_EDITOR:
                return TextArea;
            default: return Input;
        }
    };

    const getPlaceholder = (component, label) => {
        switch (component) {
            case SELECT:
                return `Select ${label}`;
            default: return `Type ${label} here`;
        }
    };

    const getMetaRequestUrl = (columnName) => {
        return pluralize.plural(columnName.replace('_id', ''));
    };

    const getMetaData = (columnName) => {
        const url = getMetaRequestUrl(columnName);

        return data[url] || [];
    };

    useEffect(() => {
        dataTypes.map(({ columnName, component }) => {
            const url = pluralize.plural(columnName.replace('_id', ''));

            if (component === SELECT && !data[url]) {
                dispatch(getIndex(url));
            }
            return null;
        });
    }, []);

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
                                    data={getMetaData(columnName)}
                                    key={columnName}
                                    label={label}
                                    placeholder={getPlaceholder(component, label)}
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
