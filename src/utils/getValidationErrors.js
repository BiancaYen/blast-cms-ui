import Joi from 'joi';

const options = {
    convert: false,
    allowUnknown: true,
    abortEarly: false
};

export const getErrorStatusObject = (status = '', errors = '') => ({ status, errors });

const parseErrors = (joi) => {
    if (joi.error) {
        const { details: errors } = joi.error || {};

        const result = {};

        errors.forEach(({ path, message }) => {
            const [errPath] = path;

            result[errPath] = getErrorStatusObject('invalid', message);
        });

        return result;
    }

    return {};
};

const getValidationErrors = (schema, withValidState = false, runtimeOptions = {}) => (values) => {
    const result = Joi.validate(values, schema, { ...options, ...runtimeOptions });

    const valid = {};

    if (withValidState) {
        Object.keys(values).forEach((input) => {
            valid[input] = getErrorStatusObject('valid');
        });
    }

    return { ...valid, ...parseErrors(result) };
};

export const getIsValid = (validation = {}) => {
    if (!Object.keys(validation).length) {
        return true;
    }

    return Object.keys(validation).every(
        (property) => {
            const { status = '' } = validation[property];

            return status !== 'invalid';
        }
    );
};

export default getValidationErrors;
