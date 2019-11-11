import React, { useEffect } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
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
    MultiSelect,
    RichTextEditor,
    Select
} from '../../components';

// Utils
import isJson from '../../utils/isJson';

// Constants
const INPUT = 'Input';
const RICH_TEXT_INPUT = 'RichTextEditor';
const SELECT = 'Select';
const MULTI_SELECT = 'MultiSelect';

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
    const formatValue = (columnName, component) => {
        const value = values[columnName];
        if (component === RICH_TEXT_INPUT) {
            if (!value) {
                return EditorState.createEmpty();
            }
            if (isJson(value) && JSON.parse(value).blocks) {
                return EditorState.createWithContent(convertFromRaw(JSON.parse(value)));
            }
            return value;
        }

        return values[columnName];
    };

    const getInput = (component) => {
        switch (component) {
            case INPUT:
                return Input;
            case MULTI_SELECT:
                return MultiSelect;
            case SELECT:
                return Select;
            case RICH_TEXT_INPUT:
                return RichTextEditor;
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
            const url = getMetaRequestUrl(columnName);

            if ((component === SELECT || component === MULTI_SELECT) && !data[url]) {
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
                                    touched={touched[columnName] && validation[columnName]}
                                    validation={validation}
                                    value={formatValue(columnName, component)}
                                    onBlur={onBlur}
                                    onChange={onChange}
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
