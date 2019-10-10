import { useState, useEffect } from 'react';

import objectDeepMatches from './objectDeepMatches';
import getValidationErrors, { getIsValid } from './getValidationErrors';
import usePrevious from './usePrevious';

const useForm = (data = {}, validationSchema = {}, joiOptions) => {
    // State
    const [touched, setTouched] = useState({});
    const [validation, setValidation] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [values, setValues] = useState({ ...data });

    // Prev Data
    const previousData = usePrevious(data) || {};

    // Getters & Setters
    const getErrors = (inputValues) => {
        return getValidationErrors(validationSchema, true, joiOptions)(inputValues);
    };

    const setErrors = (errors) => {
        setValidation({ ...errors });
        setIsValid(!Object.keys(errors).length);
    };

    // Event Handlers
    const handleFormReset = () => {
        setValues(data);
        setTouched({});
        setValidation({});
        setIsValid(false);
    };

    const handleChange = ({ id, value }) => {
        const errors = getErrors({ ...values, [id]: value });

        setValues({ ...values, [id]: value });
        setTouched({ ...touched, [id]: true });
        setValidation(errors);
        setIsValid(getIsValid(errors));
    };

    const handleInputReset = id => ({ target: { id: targetId } = {} } = {}) => {
        const property = id || targetId;

        const errors = getErrors({ ...values, [property]: data[property] });

        setValues({ ...values, [property]: data[property] });
        setValidation(errors);
        setIsValid(getIsValid(errors));
    };

    const handleBlur = id => ({ target: { id: targetId } = {} } = {}) => {
        const property = id || targetId;

        if (!touched[property]) {
            const errors = getErrors(values);
            setTouched({
                ...touched,
                [property]: true
            });

            setValidation(errors);
        }
    };

    const handleSubmit = onSubmit => (event) => {
        event.preventDefault();

        const errors = getErrors(values);
        const isValidForm = getIsValid(errors);

        if (isValidForm) {
            onSubmit(values, setErrors);

            setTouched({});
            setIsValid(false);
        } else {
            const touchedInputs = Object.keys(errors).reduce((acc, input) => ({
                ...acc,
                [input]: true
            }), {});

            setValidation(errors);
            setTouched(touchedInputs);
            setIsValid(!Object.keys(errors).length);
        }
    };

    // Effects
    useEffect(() => {
        if (!objectDeepMatches(data, previousData)) {
            setValues(data);
        }
    }, [data]);

    return {
        touched,
        validation,
        isValid,
        values,
        onFormReset: handleFormReset,
        onChange: handleChange,
        onInputReset: handleInputReset,
        onBlur: handleBlur,
        onSubmit: handleSubmit
    };
};

export default useForm;
