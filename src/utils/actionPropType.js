import React from 'react';

function actionPropType(sequence = []) {
    const checkProps = (isRequired, props, propName, componentName) => {
        let error = null;

        if (isRequired && props[propName] === undefined) {
            return new Error(`Failed prop type: Invalid prop '${propName}' is marked as Required`);
        }

        if (!Array.isArray(props[propName])) {
            return new Error(`Failed prop type: Invalid prop '${propName}' of type '${typeof props[propName]}' supplied to '${componentName}', expected 'array'`);
        }

        props[propName].some((action, actionIndex) => {
            return sequence.some((actionPart, index) => {
                const partError = actionPart(props, propName, componentName, index, action[index], actionIndex);

                if (partError) {
                    error = partError;

                    return true;
                }

                return false;
            });
        });

        return error;
    };

    const chainedCheckType = checkProps.bind(null, false);
    chainedCheckType.isRequired = checkProps.bind(null, true);

    return chainedCheckType;
}

function createPropType(expression, expected = '', name = '') {
    const checkProps = (isRequired, props, propName, componentName, index, value, actionIndex) => {
        if (isRequired && value === undefined) {
            return new Error(`
                The property '${name}'
                on index ${actionIndex}
                in '${propName}'
                is marked as Required in ${componentName}'
            `);
        }

        if ((!isRequired && !value)) {
            return null;
        }

        if (expression(value)) {
            return new Error(`
                Failed prop type: Invalid action property '${name}'
                on index ${actionIndex}
                in ${propName}
                of type '${typeof value}' supplied to '${componentName}', expected '${expected}'
            `);
        }

        return null;
    };

    const chainedCheckType = checkProps.bind(null, false);
    chainedCheckType.isRequired = checkProps.bind(null, true);

    return chainedCheckType;
}

const title = createPropType(property => typeof property !== 'string', 'string', 'title');
const subtitle = createPropType(property => typeof property !== 'string', 'string', 'title');
const action = createPropType(property => typeof property !== 'function', 'function', 'action');
const bool = createPropType(property => typeof property !== 'boolean', 'boolean', 'bool');
const icon = createPropType(property => !React.isValidElement(property), 'React node', 'icon');

export {
    actionPropType,
    subtitle,
    title,
    bool,
    action,
    icon
};
