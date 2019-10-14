import React from 'react';
import PropTypes from 'prop-types';

// Utils
import useForm from './useForm';

const withForm = (ComposedComponent, joiOptions) => {
    const WithForm = (props) => {
        console.log(props);
        const { validationSchema, data = {}, dataTypes } = props;

        let formattedData = {};
        if (dataTypes.length) {
            dataTypes.map(({ columnName }) => {
                formattedData[columnName] = '';
                return null;
            });
        } else {
            formattedData = data;
        }

        const {
            touched,
            isValid,
            validation,
            values,
            onBlur,
            onChange,
            onInputReset,
            onFormReset,
            onSubmit
        } = useForm(formattedData, validationSchema, joiOptions);

        return (
            <ComposedComponent
                {...props}
                touched={touched}
                isValid={isValid}
                validation={validation}
                values={values}
                onBlur={onBlur}
                onChange={onChange}
                onInputReset={onInputReset}
                onFormReset={onFormReset}
                onSubmit={onSubmit}
            />
        );
    };

    WithForm.propTypes = {
        data: PropTypes.instanceOf(Object).isRequired,
        validationSchema: PropTypes.instanceOf(Object).isRequired
    };

    return WithForm;
};

export default withForm;
